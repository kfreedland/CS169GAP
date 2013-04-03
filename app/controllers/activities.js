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
    // console.log("inSearch");
    var self = this;
    var hour = 3600000;
    //We want to assure ourselves that the model only gets the relevant params and not anything extra
    //I use default values for fields that are left blank to make for easier queries in the model
    var queryInfo = {};
    if(params.name && (typeof params.name == 'string'))
    {
      queryInfo.name = {'like': params.name};
    }
    if (params.time1)
    {
      queryInfo.time1 = {gt: Math.max(parseFloat(params.time1) - hour,0)};
    }

    if (params.time2)
    {
      queryInfo.time2 = {lt: Math.max(parseFloat(params.time2) + hour, 0)};
    }

    if (params.beginDate)
    {
      queryInfo.beginDate = {gt: parseFloat(params.beginDate)};
    }

    if (params.endDate)
    {
      queryInfo.endDate = {lt: parseFloat(params.beginDate)};
    }

    if (params.flag && (typeof params.time1 == 'string'))
    {
      queryInfo.flag = params.flag;
    }

    if (params.lowPrice)
    {
      queryInfo.lowPrice = {gt: Math.floor(parseFloat(params.lowPrice) * 0.75)};
    }

    if (params.highPrice)
    {
      queryInfo.highPrice = {lt: Math.ceil(parseFloat(params.highPrice) * 1.25)};
    }

    if (params.lowNumParticipants)
    {
      queryInfo.lowNumParticipants = {gt: Math.floor(parseFloat(params.lowNumParticipants) * 0.90)};
    }

    if (params.highNumParticipants)
    {
      queryInfo.highNumParticipants = {lt: Math.ceil(parseFloat(params.highNumParticipants) * 1.1)};
    }

    if (params.category && (typeof params.category == 'string'))
    {
      queryInfo.category = params.category;
    }
    for(var key in queryInfo)
    {
      // console.log("queryInfo key: "+key+" value: "+queryInfo[key]);
    }

    geddy.model.Activity.search(queryInfo, parseFloat(params.latitude), parseFloat(params.longitude), function(responseDict)
    {
      //this is because 0 is represented as null in the db and we want to return free items as having cost 0 not cost null!
      var max_returned = 3;
      var count = 0;
      var toReturn = [];
      for(var key in responseDict)
      {
        
        if(count >= max_returned)
        {
          break;
        }
        // console.log("key is: "+key+" with value: "+responseDict[key]);
        var record = responseDict[key];
        if(!record.highprice)
        {
          record.highprice = '0';
        }
        if(!record.lowprice)
        {
          record.lowprice = '0';
        }
        toReturn[count] = record;
        count+=1;

      }
      self.respond(toReturn, {format: 'json'});
    });
  };
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
    // console.log("activites.create reached")

    geddy.model.Activity.add(params, 
      function createCallBack(result){
        // console.log("EXECUTING CREATE ACTIVITY CALLBACK");
        console.dir(result);
        self.respond(result, {format: 'json'});
      });
  };

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
      , template: 'app/views/activities/activityDetail'
      });
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
