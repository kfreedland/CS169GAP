var Activities = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];
  /** data is of the following form
  Name: string
  Description: string
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
    //We want to assure ourselves that the model only gets the relevant params and not anything extra
    //I use default values for fields that are left blank to make for easier queries in the model
    queryInfo = {};
    //defualts to no name
    queryInfo.name="";
    if (params.name)
    {
      queryInfo.name = params.name;
    }

    today = new Date();
    currentTime = today.getUTC
    //defaults to right now
    queryInfo.time1 = today.toLocaleTimeString();
    
    tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    //defaults to 24 hours ahead of today;
    queryInfo.time2 = tomorrow.toLocaleTimeString();

    if(params.time1 && params.time2)
    {
      queryInfo.time1 = params.time1;
      queryInfo.time2 = params.time2;
    }

    //required fields that the client checks is valid
    queryInfo.flag = params.flag;
    queryInfo.begin_date = params.begin_date;
    queryInfo.end_date = params.end_date;
    queryInfo.latitude = params.latitude;
    queryInfo.longitude = params.longitude;

    queryInfo.low_price = 0;
    if(params.low_price)
    {
      queryInfo.low_price = params.low_price;
    }

    queryInfo.high_price = Number.MAX_VALUE;
    if(params.high_price)
    {
      queryInfo.high_price = params.high_price;
    }

    queryInfo.low_num_participants = 0;
    if(params.low_num_participants)
    {
      queryInfo.low_num_participants = params.low_num_participants;
    }

    queryInfo.high_num_participants = Number.MAX_VALUE;
    if(params.high_num_participants)
    {
      queryInfo.high_num_participants = params.high_num_participants;
    }

    geddy.model.Activity.search(queryInfo, function(responseDict)
    {
      console.log("ERRCODE IS: "+responseDict);
      self.respond(responsedict, {format: 'json'});
    });
  }
  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.all(function(err, activities) {
      self.respond({params: params, activities: activities});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);

    var self = this
      , activity = geddy.model.Activity.create(params);

    activity.save(function(err, data) {
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

    geddy.model.Activity.first(params.id, function(err, activity) {
      self.respond({params: params, activity: activity.toObj()});
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.first(params.id, function(err, activity) {
      self.respond({params: params, activity: activity});
    });
  };

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
  };

};

exports.Activities = Activities;
