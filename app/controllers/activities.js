var Activities = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];
  /** data is of the following form
  Name: string
  time1: time
  time2: time
  flag: string startEnd, openClose, anyTime, dayTime, nightTime
  begin_date: date
  end_date: date
  low_price: int
  high_price: int
  low_num_participants: int
  high_num_participants: int
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
      if(params.time1 && (typeof params.time1 == 'number'))
      {
        queryInfo.time1 = {gt: Math.max(params.time1 - hour,0)};
      }

      if(params.time2 && (typeof params.time2 == 'number'))
      {
        queryInfo.time2 = {lt: Math.max(params.time2 + hour)};
      }

      if(params.begin_date && (typeof params.begin_date == 'number'))
      {
        queryInfo.begin_date = {gt: params.begin_date};
      }

      if(params.end_date && (typeof params.end_date == 'number'))
      {
        queryInfo.end_date = {lt: params.begin_date};
      }

      if(params.flag && (typeof params.time1 == 'string'))
      {
        queryInfo.flag = params.flag;
      }

      if(params.low_price && (typeof params.low_price == 'number'))
      {
        queryInfo.low_price = {gt: Math.floor(params.low_price * 0.75)};
      }

      if(params.high_price && (typeof params.high_price == 'number'))
      {
        queryInfo.high_price = {lt: Math.ceil(params.high_price * 1.25)};
      }

      if(params.low_num_participants && (typeof params.low_num_participants == 'number'))
      {
        queryInfo.low_num_participants = {gt: Math.floor(params.low_num_participants * 0.90)};
      }

      if(params.high_num_participants && (typeof params.high_num_participants == 'number'))
      {
        queryInfo.high_num_participants = {lt: Math.ceil(params.high_num_participants * 1.1)}
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

  this.create = function (req, resp, params) {

    var self = this;
    console.log("activites.create reached")

    geddy.model.Activity.add(params, 
      function createCallBack(result){
        console.dir(result);
        self.respond(result);
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
