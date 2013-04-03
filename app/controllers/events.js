var passport = require('../helpers/passport')
  , requireAuth = passport.requireAuth;

var Events = function () {
  this.before(requireAuth, {
    except: ['']
  });

  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Event.all(function(err, events) {
      self.respond({params: params, events: events});
    });
  };

  this.add = function (req, resp, params) 
  {
    var self = this;
    geddy.model.Event.add(params, function createCallback(respDict)
    {
      console.log('respDict is');
      console.log(respDict);
      self.respond(respDict, {format: 'json'});
    });
  };

  this.create = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);

    var self = this
      , event = geddy.model.Event.create(params);

    if (!event.isValid()) {
      params.errors = event.errors;
      self.transfer('add');
    }

    event.save(function(err, data) {
      if (err) {
        params.errors = err;
        self.transfer('add');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Event.first(params.id, function(err, event) {
      if (!event) {
        var error = new Error();
        error.statusCode = 400;
        self.error(error);
      } else {
        self.respond({params: params, event: event.toObj()});
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Event.first(params.id, function(err, event) {
      if (!event) {
        var error = new Error();
        error.statusCode = 400;
        self.error(error);
      } else {
        self.respond({params: params, event: event});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Event.first(params.id, function(err, event) {
      event.updateProperties(params);
      if (!event.isValid()) {
        params.errors = event.errors;
        self.transfer('edit');
      }

      event.save(function(err, data) {
        if (err) {
          params.errors = err;
          self.transfer('edit');
        } else {
          self.redirect({controller: self.name});
        }
      });
    });
  };

  this.destroy = function (req, resp, params) {
    var self = this;

    geddy.model.Event.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };


  this.invite = function (req, resp, params) {

    var self = this;


    geddy.model.Event.invite(params, function(responseDict) {
      
        self.respond(responseDict, {format: 'json'});
    });

  };

  this.changeDateTime = function (req, resp, params) {

    var self = this;


    geddy.model.Event.invite(params, function(responseDict) 
    {

      self.respond(responseDict, {format: 'json'});
      
    });

  };

  //Get My Events
  this.getMyEvents = function (req, resp, params) {
    var self = this;

    geddy.model.Event.getMyEvents({userId: self.session.get('userId')}, function(responseDict) {
      params.errCode = responseDict.errCode;
      params.events = responseDict.events;
      console.log('RESPONSE FROM MY EVENTS');
      console.log(responseDict);
      self.respond(responseDict, {format: 'json'});
    });
  };

  // Create New Event
  this.createNewEvent = function (req, resp, params) {
    var self = this
      , User = geddy.model.User;

    var localParams = params;
    if (!localParams.errCode){
      localParams.errCode = 0;
    }
    if (!localParams.methodType){
      localParams.methodType = 0;
    }
    User.first({id: this.session.get('userId')}, function (err, data) {
      var params = localParams;
      params.user = null;
      params.authType = null;
      if (data) {
        params.user = data;
      }
      self.respond(params, {
        format: 'html'
      , template: 'app/views/events/createEvent'
      });
    });
  };

  // My Events
  this.myEvents = function (req, resp, params) {
    var self = this
      , User = geddy.model.User;

    var localParams = params;
    if (!localParams.errCode){
      localParams.errCode = 0;
    }
    if (!localParams.methodType){
      localParams.methodType = 0;
    }
    User.first({id: this.session.get('userId')}, function (err, data) {
      var params = localParams;
      params.user = null;
      params.authType = null;
      if (data) {
        params.user = data;
      }
      self.respond(params, {
        format: 'html'
      , template: 'app/views/events/myEvents'
      });
    });
  };

  this.addUsersToEvent = function(req, resp, params) {
    if(params.usernames && typeof params.usernames == 'string' && params.eventid && typeof params.eventid == 'string')
    {
      geddy.model.Event.addUsersToEvent(params.eventid, params.usernames, function(resp)
      {
        self.respond(resp);
      });
    }
    else
    {
      self.resp({errCode: 1});
    }
  }
  // Event Detail
  this.detail = function (req, resp, params) {
    var self = this
      , User = geddy.model.User;

    var localParams = params;
    if (!localParams.errCode){
      localParams.errCode = 0;
    }
    if (!localParams.methodType){
      localParams.methodType = 0;
    }
    User.first({id: this.session.get('userId')}, function (err, data) {
      var params = localParams;
      params.user = null;
      params.authType = null;
      if (data) {
        params.user = data;
      }
      self.respond(params, {
        format: 'html'
      , template: 'app/views/events/eventDetail'
      });
    });
  };

};

exports.Events = Events;
