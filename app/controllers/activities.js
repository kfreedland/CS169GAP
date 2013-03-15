var Activities = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];
  /** data is of the following form
  Name: string
  time1: time
  time2: time
  flag: string startEnd, openClose, anyTime, dayTime, nightTime
  beginDate: date
  endDate: date
  lowPrice: int
  highPrice: int
  lowNumParticipants: int
  highNumParticipants: int
  latitude: number
  longitude: number
  **/
  this.search = function (req, resp, params)
  {
    var self = this;
    console.log("Activities controller");
    var hour = 3600000;
    //We want to assure ourselves that the model only gets the relevant params and not anything extra
    //I use default values for fields that are left blank to make for easier queries in the model
    var queryInfo = {};
    if(params.name && (typeof params.name == 'string'))
    {
      queryInfo.name = {'like': params.name};
      geddy.model.Activity.search(queryInfo, function(responseDict)
      {
        console.log("RESP IS: " + responseDict);
        self.respond(responseDict, {format: 'json'});
      });
    }
    else
    {
      if (params.time1 && (typeof params.time1 == 'number'))
      {
        queryInfo.time1 = {gt: Math.max(params.time1 - hour,0)};
      }

      if (params.time2 && (typeof params.time2 == 'number'))
      {
        queryInfo.time2 = {lt: Math.max(params.time2 + hour)};
      }

      if (params.beginDate && (typeof params.beginDate == 'number'))
      {
        queryInfo.beginDate = {gt: params.beginDate};
      }

      if (params.endDate && (typeof params.endDate == 'number'))
      {
        queryInfo.endDate = {lt: params.beginDate};
      }

      if (params.flag && (typeof params.time1 == 'string'))
      {
        queryInfo.flag = params.flag;
      }

      if (params.lowPrice && (typeof params.lowPrice == 'number'))
      {
        queryInfo.lowPrice = {gt: Math.floor(params.lowPrice * 0.75)};
      }

      if (params.highPrice && (typeof params.highPrice == 'number'))
      {
        queryInfo.highPrice = {lt: Math.ceil(params.highPrice * 1.25)};
      }

      if (params.lowNumParticipants && (typeof params.lowNumParticipants == 'number'))
      {
        queryInfo.lowNumParticipants = {gt: Math.floor(params.lowNumParticipants * 0.90)};
      }

      if (params.highNumParticipants && (typeof params.highNumParticipants == 'number'))
      {
        queryInfo.highNumParticipants = {lt: Math.ceil(params.highNumParticipants * 1.1)}
      }

      geddy.model.Activity.search(queryInfo, params.latitude, params.longitude, function(responseDict)
      {
        console.log("RESP IS: "+responseDict);
        self.respond(responseDict, {format: 'json'});
      });
    }
  }
  /*
  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.all(function(err, activities) {
      self.respond({params: params, activities: activities});
    });
  };
  */
/*
  this.add = function (req, resp, params) {
    this.respond({params: params});
  };
*/

  this.add = function (req, resp, params) {

    var self = this;
    console.log("activites.create reached")

    geddy.model.Activity.add(params, 
      function createCallBack(result){
        console.log("EXECUTING CREATE ACTIVITY CALLBACK");
        console.dir(result);
        self.respond(result, {format: 'json'});
      });
  };
/*
  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.first(params.id, function(err, activity) {
      self.respond({params: params, activity: activity.toObj()});
    });
  };
  */
/*
  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.first(params.id, function(err, activity) {
      self.respond({params: params, activity: activity});
    });
  };
  */
/*
  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.first(params.id, function(err, activity) {
      activity.updateProperties(params);

      activity.save(function(err, data) {
        if (err) {
          params.errors = err;
          self.transfer('edit');
        } else {
          self.redirect({controller: self.name});
        }
      });
    });
  };
*/
/*
  this.destroy = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };*/

};

exports.Activities = Activities;
