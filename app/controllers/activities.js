/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['controllers/activities.js']) {
  _$jscoverage['controllers/activities.js'] = [];
  _$jscoverage['controllers/activities.js'][1] = 0;
  _$jscoverage['controllers/activities.js'][2] = 0;
  _$jscoverage['controllers/activities.js'][17] = 0;
  _$jscoverage['controllers/activities.js'][20] = 0;
  _$jscoverage['controllers/activities.js'][21] = 0;
  _$jscoverage['controllers/activities.js'][24] = 0;
  _$jscoverage['controllers/activities.js'][25] = 0;
  _$jscoverage['controllers/activities.js'][27] = 0;
  _$jscoverage['controllers/activities.js'][29] = 0;
  _$jscoverage['controllers/activities.js'][31] = 0;
  _$jscoverage['controllers/activities.js'][34] = 0;
  _$jscoverage['controllers/activities.js'][36] = 0;
  _$jscoverage['controllers/activities.js'][39] = 0;
  _$jscoverage['controllers/activities.js'][41] = 0;
  _$jscoverage['controllers/activities.js'][44] = 0;
  _$jscoverage['controllers/activities.js'][46] = 0;
  _$jscoverage['controllers/activities.js'][49] = 0;
  _$jscoverage['controllers/activities.js'][51] = 0;
  _$jscoverage['controllers/activities.js'][54] = 0;
  _$jscoverage['controllers/activities.js'][56] = 0;
  _$jscoverage['controllers/activities.js'][59] = 0;
  _$jscoverage['controllers/activities.js'][61] = 0;
  _$jscoverage['controllers/activities.js'][64] = 0;
  _$jscoverage['controllers/activities.js'][66] = 0;
  _$jscoverage['controllers/activities.js'][69] = 0;
  _$jscoverage['controllers/activities.js'][71] = 0;
  _$jscoverage['controllers/activities.js'][74] = 0;
  _$jscoverage['controllers/activities.js'][76] = 0;
  _$jscoverage['controllers/activities.js'][78] = 0;
  _$jscoverage['controllers/activities.js'][83] = 0;
  _$jscoverage['controllers/activities.js'][86] = 0;
  _$jscoverage['controllers/activities.js'][87] = 0;
  _$jscoverage['controllers/activities.js'][88] = 0;
  _$jscoverage['controllers/activities.js'][89] = 0;
  _$jscoverage['controllers/activities.js'][92] = 0;
  _$jscoverage['controllers/activities.js'][94] = 0;
  _$jscoverage['controllers/activities.js'][97] = 0;
  _$jscoverage['controllers/activities.js'][98] = 0;
  _$jscoverage['controllers/activities.js'][100] = 0;
  _$jscoverage['controllers/activities.js'][102] = 0;
  _$jscoverage['controllers/activities.js'][104] = 0;
  _$jscoverage['controllers/activities.js'][106] = 0;
  _$jscoverage['controllers/activities.js'][107] = 0;
  _$jscoverage['controllers/activities.js'][110] = 0;
  _$jscoverage['controllers/activities.js'][128] = 0;
  _$jscoverage['controllers/activities.js'][130] = 0;
  _$jscoverage['controllers/activities.js'][133] = 0;
  _$jscoverage['controllers/activities.js'][136] = 0;
  _$jscoverage['controllers/activities.js'][137] = 0;
  _$jscoverage['controllers/activities.js'][141] = 0;
  _$jscoverage['controllers/activities.js'][142] = 0;
  _$jscoverage['controllers/activities.js'][145] = 0;
  _$jscoverage['controllers/activities.js'][146] = 0;
  _$jscoverage['controllers/activities.js'][147] = 0;
  _$jscoverage['controllers/activities.js'][149] = 0;
  _$jscoverage['controllers/activities.js'][150] = 0;
  _$jscoverage['controllers/activities.js'][152] = 0;
  _$jscoverage['controllers/activities.js'][153] = 0;
  _$jscoverage['controllers/activities.js'][154] = 0;
  _$jscoverage['controllers/activities.js'][155] = 0;
  _$jscoverage['controllers/activities.js'][156] = 0;
  _$jscoverage['controllers/activities.js'][157] = 0;
  _$jscoverage['controllers/activities.js'][158] = 0;
  _$jscoverage['controllers/activities.js'][160] = 0;
  _$jscoverage['controllers/activities.js'][219] = 0;
}
_$jscoverage['controllers/activities.js'][1]++;
var Activities = (function () {
  _$jscoverage['controllers/activities.js'][2]++;
  this.respondsWith = ["html", "json", "xml", "js", "txt"];
  _$jscoverage['controllers/activities.js'][17]++;
  this.search = (function (req, resp, params) {
  _$jscoverage['controllers/activities.js'][20]++;
  var self = this;
  _$jscoverage['controllers/activities.js'][21]++;
  var hour = 3600000;
  _$jscoverage['controllers/activities.js'][24]++;
  var queryInfo = {};
  _$jscoverage['controllers/activities.js'][25]++;
  if (params.name && (typeof params.name == "string")) {
    _$jscoverage['controllers/activities.js'][27]++;
    queryInfo.name = {"like": params.name};
  }
  _$jscoverage['controllers/activities.js'][29]++;
  if (params.time1) {
    _$jscoverage['controllers/activities.js'][31]++;
    queryInfo.time1 = {gt: Math.max(parseFloat(params.time1) - hour, 0)};
  }
  _$jscoverage['controllers/activities.js'][34]++;
  if (params.time2) {
    _$jscoverage['controllers/activities.js'][36]++;
    queryInfo.time2 = {lt: Math.max(parseFloat(params.time2) + hour, 0)};
  }
  _$jscoverage['controllers/activities.js'][39]++;
  if (params.beginDate) {
    _$jscoverage['controllers/activities.js'][41]++;
    queryInfo.beginDate = {gt: parseFloat(params.beginDate)};
  }
  _$jscoverage['controllers/activities.js'][44]++;
  if (params.endDate) {
    _$jscoverage['controllers/activities.js'][46]++;
    queryInfo.endDate = {lt: parseFloat(params.beginDate)};
  }
  _$jscoverage['controllers/activities.js'][49]++;
  if (params.flag && (typeof params.time1 == "string")) {
    _$jscoverage['controllers/activities.js'][51]++;
    queryInfo.flag = params.flag;
  }
  _$jscoverage['controllers/activities.js'][54]++;
  if (params.lowPrice) {
    _$jscoverage['controllers/activities.js'][56]++;
    queryInfo.lowPrice = {gt: Math.floor(parseFloat(params.lowPrice) * 0.75)};
  }
  _$jscoverage['controllers/activities.js'][59]++;
  if (params.highPrice) {
    _$jscoverage['controllers/activities.js'][61]++;
    queryInfo.highPrice = {lt: Math.ceil(parseFloat(params.highPrice) * 1.25)};
  }
  _$jscoverage['controllers/activities.js'][64]++;
  if (params.lowNumParticipants) {
    _$jscoverage['controllers/activities.js'][66]++;
    queryInfo.lowNumParticipants = {gt: Math.floor(parseFloat(params.lowNumParticipants) * 0.9)};
  }
  _$jscoverage['controllers/activities.js'][69]++;
  if (params.highNumParticipants) {
    _$jscoverage['controllers/activities.js'][71]++;
    queryInfo.highNumParticipants = {lt: Math.ceil(parseFloat(params.highNumParticipants) * 1.1)};
  }
  _$jscoverage['controllers/activities.js'][74]++;
  if (params.category && (typeof params.category == "string")) {
    _$jscoverage['controllers/activities.js'][76]++;
    queryInfo.category = params.category;
  }
  _$jscoverage['controllers/activities.js'][78]++;
  for (var key in queryInfo) {
}
  _$jscoverage['controllers/activities.js'][83]++;
  geddy.model.Activity.search(queryInfo, parseFloat(params.latitude), parseFloat(params.longitude), (function (responseDict) {
  _$jscoverage['controllers/activities.js'][86]++;
  var max_returned = 3;
  _$jscoverage['controllers/activities.js'][87]++;
  var count = 0;
  _$jscoverage['controllers/activities.js'][88]++;
  var toReturn = [];
  _$jscoverage['controllers/activities.js'][89]++;
  for (var key in responseDict) {
    _$jscoverage['controllers/activities.js'][92]++;
    if (count >= max_returned) {
      _$jscoverage['controllers/activities.js'][94]++;
      break;
    }
    _$jscoverage['controllers/activities.js'][97]++;
    var record = responseDict[key];
    _$jscoverage['controllers/activities.js'][98]++;
    if (! record.highprice) {
      _$jscoverage['controllers/activities.js'][100]++;
      record.highprice = "0";
    }
    _$jscoverage['controllers/activities.js'][102]++;
    if (! record.lowprice) {
      _$jscoverage['controllers/activities.js'][104]++;
      record.lowprice = "0";
    }
    _$jscoverage['controllers/activities.js'][106]++;
    toReturn[count] = record;
    _$jscoverage['controllers/activities.js'][107]++;
    count += 1;
}
  _$jscoverage['controllers/activities.js'][110]++;
  self.respond(toReturn, {format: "json"});
}));
});
  _$jscoverage['controllers/activities.js'][128]++;
  this.add = (function (req, resp, params) {
  _$jscoverage['controllers/activities.js'][130]++;
  var self = this;
  _$jscoverage['controllers/activities.js'][133]++;
  geddy.model.Activity.add(params, (function createCallBack(result) {
  _$jscoverage['controllers/activities.js'][136]++;
  console.dir(result);
  _$jscoverage['controllers/activities.js'][137]++;
  self.respond(result, {format: "json"});
}));
});
  _$jscoverage['controllers/activities.js'][141]++;
  this.detail = (function (req, resp, params) {
  _$jscoverage['controllers/activities.js'][142]++;
  var self = this, User = geddy.model.User;
  _$jscoverage['controllers/activities.js'][145]++;
  var localParams = params;
  _$jscoverage['controllers/activities.js'][146]++;
  if (! localParams.errCode) {
    _$jscoverage['controllers/activities.js'][147]++;
    localParams.errCode = 0;
  }
  _$jscoverage['controllers/activities.js'][149]++;
  if (! localParams.methodType) {
    _$jscoverage['controllers/activities.js'][150]++;
    localParams.methodType = 0;
  }
  _$jscoverage['controllers/activities.js'][152]++;
  User.first({id: this.session.get("userId")}, (function (err, data) {
  _$jscoverage['controllers/activities.js'][153]++;
  var params = localParams;
  _$jscoverage['controllers/activities.js'][154]++;
  params.user = null;
  _$jscoverage['controllers/activities.js'][155]++;
  params.authType = null;
  _$jscoverage['controllers/activities.js'][156]++;
  if (data) {
    _$jscoverage['controllers/activities.js'][157]++;
    params.user = data;
    _$jscoverage['controllers/activities.js'][158]++;
    params.authType = authTypes[self.session.get("authType")].name;
  }
  _$jscoverage['controllers/activities.js'][160]++;
  self.respond(params, {format: "html", template: "app/views/activities/activityDetail"});
}));
});
});
_$jscoverage['controllers/activities.js'][219]++;
exports.Activities = Activities;
_$jscoverage['controllers/activities.js'].source = ["var Activities = function () {","  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];","  /** data is of the following form","  Name: string","  time1: time","  time2: time","  flag: string startEnd, openClose, anyTime, dayTime, nightTime","  beginDate: date","  endDate: date","  lowPrice: int","  highPrice: int","  lowNumParticipants: int","  highNumParticipants: int","  latitude: number","  longitude: number","  **/","  this.search = function (req, resp, params)","  {","    // console.log(\"inSearch\");","    var self = this;","    var hour = 3600000;","    //We want to assure ourselves that the model only gets the relevant params and not anything extra","    //I use default values for fields that are left blank to make for easier queries in the model","    var queryInfo = {};","    if(params.name &amp;&amp; (typeof params.name == 'string'))","    {","      queryInfo.name = {'like': params.name};","    }","    if (params.time1)","    {","      queryInfo.time1 = {gt: Math.max(parseFloat(params.time1) - hour,0)};","    }","","    if (params.time2)","    {","      queryInfo.time2 = {lt: Math.max(parseFloat(params.time2) + hour, 0)};","    }","","    if (params.beginDate)","    {","      queryInfo.beginDate = {gt: parseFloat(params.beginDate)};","    }","","    if (params.endDate)","    {","      queryInfo.endDate = {lt: parseFloat(params.beginDate)};","    }","","    if (params.flag &amp;&amp; (typeof params.time1 == 'string'))","    {","      queryInfo.flag = params.flag;","    }","","    if (params.lowPrice)","    {","      queryInfo.lowPrice = {gt: Math.floor(parseFloat(params.lowPrice) * 0.75)};","    }","","    if (params.highPrice)","    {","      queryInfo.highPrice = {lt: Math.ceil(parseFloat(params.highPrice) * 1.25)};","    }","","    if (params.lowNumParticipants)","    {","      queryInfo.lowNumParticipants = {gt: Math.floor(parseFloat(params.lowNumParticipants) * 0.90)};","    }","","    if (params.highNumParticipants)","    {","      queryInfo.highNumParticipants = {lt: Math.ceil(parseFloat(params.highNumParticipants) * 1.1)}","    }","","    if (params.category &amp;&amp; (typeof params.category == 'string'))","    {","      queryInfo.category = params.category;","    }","    for(var key in queryInfo)","    {","      // console.log(\"queryInfo key: \"+key+\" value: \"+queryInfo[key]);","    }","","    geddy.model.Activity.search(queryInfo, parseFloat(params.latitude), parseFloat(params.longitude), function(responseDict)","    {","      //this is because 0 is represented as null in the db and we want to return free items as having cost 0 not cost null!","      var max_returned = 3;","      var count = 0;","      var toReturn = [];","      for(var key in responseDict)","      {","        ","        if(count &gt;= max_returned)","        {","          break;","        }","        // console.log(\"key is: \"+key+\" with value: \"+responseDict[key]);","        var record = responseDict[key];","        if(!record.highprice)","        {","          record.highprice = '0';","        }","        if(!record.lowprice)","        {","          record.lowprice = '0';","        }","        toReturn[count] = record;","        count+=1;","","      }","      self.respond(toReturn, {format: 'json'});","    });","  }","  /*","  this.index = function (req, resp, params) {","    var self = this;","","    geddy.model.Activity.all(function(err, activities) {","      self.respond({params: params, activities: activities});","    });","  };","  */","/*","  this.add = function (req, resp, params) {","    this.respond({params: params});","  };","*/","","  this.add = function (req, resp, params) {","","    var self = this;","    // console.log(\"activites.create reached\")","","    geddy.model.Activity.add(params, ","      function createCallBack(result){","        // console.log(\"EXECUTING CREATE ACTIVITY CALLBACK\");","        console.dir(result);","        self.respond(result, {format: 'json'});","      });","  };","","  this.detail = function (req, resp, params) {","    var self = this","      , User = geddy.model.User;","","    var localParams = params;","    if (!localParams.errCode){","      localParams.errCode = 0;","    }","    if (!localParams.methodType){","      localParams.methodType = 0;","    }","    User.first({id: this.session.get('userId')}, function (err, data) {","      var params = localParams;","      params.user = null;","      params.authType = null;","      if (data) {","        params.user = data;","        params.authType = authTypes[self.session.get('authType')].name;","      }","      self.respond(params, {","        format: 'html'","      , template: 'app/views/activities/activityDetail'","      });","    });","  };","","/*","  this.show = function (req, resp, params) {","    var self = this;","","    geddy.model.Activity.first(params.id, function(err, activity) {","      self.respond({params: params, activity: activity.toObj()});","    });","  };","  */","/*","  this.edit = function (req, resp, params) {","    var self = this;","","    geddy.model.Activity.first(params.id, function(err, activity) {","      self.respond({params: params, activity: activity});","    });","  };","  */","/*","  this.update = function (req, resp, params) {","    var self = this;","","    geddy.model.Activity.first(params.id, function(err, activity) {","      activity.updateProperties(params);","","      activity.save(function(err, data) {","        if (err) {","          params.errors = err;","          self.transfer('edit');","        } else {","          self.redirect({controller: self.name});","        }","      });","    });","  };","*/","/*","  this.destroy = function (req, resp, params) {","    var self = this;","","    geddy.model.Activity.remove(params.id, function(err) {","      if (err) {","        params.errors = err;","        self.transfer('edit');","      } else {","        self.redirect({controller: self.name});","      }","    });","  };*/","","};","","exports.Activities = Activities;"];
