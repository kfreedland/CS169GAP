/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['controllers/users.js']) {
  _$jscoverage['controllers/users.js'] = [];
  _$jscoverage['controllers/users.js'][1] = 0;
  _$jscoverage['controllers/users.js'][5] = 0;
  _$jscoverage['controllers/users.js'][6] = 0;
  _$jscoverage['controllers/users.js'][10] = 0;
  _$jscoverage['controllers/users.js'][12] = 0;
  _$jscoverage['controllers/users.js'][13] = 0;
  _$jscoverage['controllers/users.js'][15] = 0;
  _$jscoverage['controllers/users.js'][16] = 0;
  _$jscoverage['controllers/users.js'][20] = 0;
  _$jscoverage['controllers/users.js'][22] = 0;
  _$jscoverage['controllers/users.js'][23] = 0;
  _$jscoverage['controllers/users.js'][25] = 0;
  _$jscoverage['controllers/users.js'][28] = 0;
  _$jscoverage['controllers/users.js'][29] = 0;
  _$jscoverage['controllers/users.js'][33] = 0;
  _$jscoverage['controllers/users.js'][39] = 0;
  _$jscoverage['controllers/users.js'][41] = 0;
  _$jscoverage['controllers/users.js'][42] = 0;
  _$jscoverage['controllers/users.js'][43] = 0;
  _$jscoverage['controllers/users.js'][47] = 0;
  _$jscoverage['controllers/users.js'][52] = 0;
  _$jscoverage['controllers/users.js'][55] = 0;
  _$jscoverage['controllers/users.js'][56] = 0;
  _$jscoverage['controllers/users.js'][59] = 0;
  _$jscoverage['controllers/users.js'][60] = 0;
  _$jscoverage['controllers/users.js'][61] = 0;
  _$jscoverage['controllers/users.js'][63] = 0;
  _$jscoverage['controllers/users.js'][64] = 0;
  _$jscoverage['controllers/users.js'][66] = 0;
  _$jscoverage['controllers/users.js'][67] = 0;
  _$jscoverage['controllers/users.js'][68] = 0;
  _$jscoverage['controllers/users.js'][69] = 0;
  _$jscoverage['controllers/users.js'][70] = 0;
  _$jscoverage['controllers/users.js'][71] = 0;
  _$jscoverage['controllers/users.js'][73] = 0;
  _$jscoverage['controllers/users.js'][81] = 0;
  _$jscoverage['controllers/users.js'][82] = 0;
  _$jscoverage['controllers/users.js'][83] = 0;
  _$jscoverage['controllers/users.js'][85] = 0;
  _$jscoverage['controllers/users.js'][90] = 0;
  _$jscoverage['controllers/users.js'][91] = 0;
  _$jscoverage['controllers/users.js'][93] = 0;
  _$jscoverage['controllers/users.js'][94] = 0;
  _$jscoverage['controllers/users.js'][95] = 0;
  _$jscoverage['controllers/users.js'][96] = 0;
  _$jscoverage['controllers/users.js'][97] = 0;
  _$jscoverage['controllers/users.js'][99] = 0;
  _$jscoverage['controllers/users.js'][100] = 0;
  _$jscoverage['controllers/users.js'][105] = 0;
  _$jscoverage['controllers/users.js'][106] = 0;
  _$jscoverage['controllers/users.js'][108] = 0;
  _$jscoverage['controllers/users.js'][109] = 0;
  _$jscoverage['controllers/users.js'][110] = 0;
  _$jscoverage['controllers/users.js'][111] = 0;
  _$jscoverage['controllers/users.js'][112] = 0;
  _$jscoverage['controllers/users.js'][114] = 0;
  _$jscoverage['controllers/users.js'][119] = 0;
  _$jscoverage['controllers/users.js'][120] = 0;
  _$jscoverage['controllers/users.js'][122] = 0;
  _$jscoverage['controllers/users.js'][124] = 0;
  _$jscoverage['controllers/users.js'][126] = 0;
  _$jscoverage['controllers/users.js'][128] = 0;
  _$jscoverage['controllers/users.js'][129] = 0;
  _$jscoverage['controllers/users.js'][132] = 0;
  _$jscoverage['controllers/users.js'][133] = 0;
  _$jscoverage['controllers/users.js'][134] = 0;
  _$jscoverage['controllers/users.js'][135] = 0;
  _$jscoverage['controllers/users.js'][137] = 0;
  _$jscoverage['controllers/users.js'][143] = 0;
  _$jscoverage['controllers/users.js'][144] = 0;
  _$jscoverage['controllers/users.js'][146] = 0;
  _$jscoverage['controllers/users.js'][147] = 0;
  _$jscoverage['controllers/users.js'][148] = 0;
  _$jscoverage['controllers/users.js'][149] = 0;
  _$jscoverage['controllers/users.js'][151] = 0;
  _$jscoverage['controllers/users.js'][156] = 0;
  _$jscoverage['controllers/users.js'][158] = 0;
  _$jscoverage['controllers/users.js'][160] = 0;
  _$jscoverage['controllers/users.js'][166] = 0;
}
_$jscoverage['controllers/users.js'][1]++;
var passport = require("../helpers/passport"), cryptPass = passport.cryptPass, requireAuth = passport.requireAuth;
_$jscoverage['controllers/users.js'][5]++;
var Users = (function () {
  _$jscoverage['controllers/users.js'][6]++;
  this.before(requireAuth, {except: ["add", "create", "unitTests"]});
  _$jscoverage['controllers/users.js'][10]++;
  this.respondsWith = ["html", "json", "xml", "js", "txt"];
  _$jscoverage['controllers/users.js'][12]++;
  this.index = (function (req, resp, params) {
  _$jscoverage['controllers/users.js'][13]++;
  var self = this;
  _$jscoverage['controllers/users.js'][15]++;
  geddy.model.User.all((function (err, users) {
  _$jscoverage['controllers/users.js'][16]++;
  self.respond({params: params, users: users});
}));
});
  _$jscoverage['controllers/users.js'][20]++;
  this.add = (function (req, resp, params) {
  _$jscoverage['controllers/users.js'][22]++;
  if (! params.errCode) {
    _$jscoverage['controllers/users.js'][23]++;
    params.errCode = 0;
  }
  _$jscoverage['controllers/users.js'][25]++;
  this.respond({params: params});
});
  _$jscoverage['controllers/users.js'][28]++;
  this.create = (function (req, resp, params) {
  _$jscoverage['controllers/users.js'][29]++;
  var self = this, user = geddy.model.User.create(params), sha;
  _$jscoverage['controllers/users.js'][33]++;
  var callback = (function (responseDict) {
  _$jscoverage['controllers/users.js'][39]++;
  if (responseDict.errCode === 1) {
    _$jscoverage['controllers/users.js'][41]++;
    self.redirect("/login?errCode=" + responseDict.errCode);
  }
  else {
    _$jscoverage['controllers/users.js'][42]++;
    if (responseDict.errCode === 7) {
      _$jscoverage['controllers/users.js'][43]++;
      self.redirect("/users/add?errCode=" + responseDict.errCode + "&message=" + responseDict.message);
    }
    else {
      _$jscoverage['controllers/users.js'][47]++;
      self.redirect("/users/add?errCode=" + responseDict.errCode);
    }
  }
});
  _$jscoverage['controllers/users.js'][52]++;
  geddy.model.User.add(user, callback);
});
  _$jscoverage['controllers/users.js'][55]++;
  this.profile = (function (req, resp, params) {
  _$jscoverage['controllers/users.js'][56]++;
  var self = this, User = geddy.model.User;
  _$jscoverage['controllers/users.js'][59]++;
  var localParams = params;
  _$jscoverage['controllers/users.js'][60]++;
  if (! localParams.errCode) {
    _$jscoverage['controllers/users.js'][61]++;
    localParams.errCode = 0;
  }
  _$jscoverage['controllers/users.js'][63]++;
  if (! localParams.methodType) {
    _$jscoverage['controllers/users.js'][64]++;
    localParams.methodType = 0;
  }
  _$jscoverage['controllers/users.js'][66]++;
  User.first({id: this.session.get("userId")}, (function (err, data) {
  _$jscoverage['controllers/users.js'][67]++;
  var params = localParams;
  _$jscoverage['controllers/users.js'][68]++;
  params.user = null;
  _$jscoverage['controllers/users.js'][69]++;
  params.authType = null;
  _$jscoverage['controllers/users.js'][70]++;
  if (data) {
    _$jscoverage['controllers/users.js'][71]++;
    params.user = data;
  }
  _$jscoverage['controllers/users.js'][73]++;
  self.respond(params, {format: "html", template: "app/views/users/profile"});
}));
});
  _$jscoverage['controllers/users.js'][81]++;
  this.unitTests = (function (req, resp, params) {
  _$jscoverage['controllers/users.js'][82]++;
  var self = this;
  _$jscoverage['controllers/users.js'][83]++;
  geddy.model.User.TESTAPI_unitTests((function (answerDict) {
  _$jscoverage['controllers/users.js'][85]++;
  self.respond(answerDict, {format: "json"});
}));
});
  _$jscoverage['controllers/users.js'][90]++;
  this.show = (function (req, resp, params) {
  _$jscoverage['controllers/users.js'][91]++;
  var self = this;
  _$jscoverage['controllers/users.js'][93]++;
  geddy.model.User.first(params.id, (function (err, user) {
  _$jscoverage['controllers/users.js'][94]++;
  if (! user) {
    _$jscoverage['controllers/users.js'][95]++;
    var error = new Error();
    _$jscoverage['controllers/users.js'][96]++;
    error.statusCode = 400;
    _$jscoverage['controllers/users.js'][97]++;
    self.error(error);
  }
  else {
    _$jscoverage['controllers/users.js'][99]++;
    user.password = "";
    _$jscoverage['controllers/users.js'][100]++;
    self.respond({params: params, user: user.toObj()});
  }
}));
});
  _$jscoverage['controllers/users.js'][105]++;
  this.edit = (function (req, resp, params) {
  _$jscoverage['controllers/users.js'][106]++;
  var self = this;
  _$jscoverage['controllers/users.js'][108]++;
  geddy.model.User.first(params.id, (function (err, user) {
  _$jscoverage['controllers/users.js'][109]++;
  if (! user) {
    _$jscoverage['controllers/users.js'][110]++;
    var error = new Error();
    _$jscoverage['controllers/users.js'][111]++;
    error.statusCode = 400;
    _$jscoverage['controllers/users.js'][112]++;
    self.error(error);
  }
  else {
    _$jscoverage['controllers/users.js'][114]++;
    self.respond({params: params, user: user.toObj()});
  }
}));
});
  _$jscoverage['controllers/users.js'][119]++;
  this.update = (function (req, resp, params) {
  _$jscoverage['controllers/users.js'][120]++;
  var self = this;
  _$jscoverage['controllers/users.js'][122]++;
  geddy.model.User.first(params.id, (function (err, user) {
  _$jscoverage['controllers/users.js'][124]++;
  var skip = params.password? []: ["password"];
  _$jscoverage['controllers/users.js'][126]++;
  user.updateAttributes(params, {skip: skip});
  _$jscoverage['controllers/users.js'][128]++;
  if (params.password && user.isValid()) {
    _$jscoverage['controllers/users.js'][129]++;
    user.password = cryptPass(user.password);
  }
  _$jscoverage['controllers/users.js'][132]++;
  user.save((function (err, data) {
  _$jscoverage['controllers/users.js'][133]++;
  if (err) {
    _$jscoverage['controllers/users.js'][134]++;
    params.errors = err;
    _$jscoverage['controllers/users.js'][135]++;
    self.transfer("edit");
  }
  else {
    _$jscoverage['controllers/users.js'][137]++;
    self.redirect({controller: self.name});
  }
}));
}));
});
  _$jscoverage['controllers/users.js'][143]++;
  this.destroy = (function (req, resp, params) {
  _$jscoverage['controllers/users.js'][144]++;
  var self = this;
  _$jscoverage['controllers/users.js'][146]++;
  geddy.model.User.remove(params.id, (function (err) {
  _$jscoverage['controllers/users.js'][147]++;
  if (err) {
    _$jscoverage['controllers/users.js'][148]++;
    params.errors = err;
    _$jscoverage['controllers/users.js'][149]++;
    self.transfer("edit");
  }
  else {
    _$jscoverage['controllers/users.js'][151]++;
    self.redirect({controller: self.name});
  }
}));
});
  _$jscoverage['controllers/users.js'][156]++;
  this.getUsernames = (function (req, resp, params) {
  _$jscoverage['controllers/users.js'][158]++;
  User.getUsernames((function (response) {
  _$jscoverage['controllers/users.js'][160]++;
  self.respond(response);
}));
});
});
_$jscoverage['controllers/users.js'][166]++;
exports.Users = Users;
_$jscoverage['controllers/users.js'].source = ["var passport = require('../helpers/passport')","  , cryptPass = passport.cryptPass","  , requireAuth = passport.requireAuth;","","var Users = function () {","  this.before(requireAuth, {","    except: ['add', 'create', 'unitTests']","  });","","  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];","","  this.index = function (req, resp, params) {","    var self = this;","","    geddy.model.User.all(function(err, users) {","      self.respond({params: params, users: users});","    });","  };","","  this.add = function (req, resp, params) {","    // console.log(\"PARAMS.ERRCODE = \" + params.errCode);","    if (!params.errCode){","      params.errCode = 0;","    }","    this.respond({params: params});","  };","","  this.create = function (req, resp, params) {","    var self = this","      , user = geddy.model.User.create(params)","      , sha;","","    var callback = function(responseDict){","      // if (responseDict.errCode == 2){","      //    params.errors = {","      //      username: 'This username is already in use.'","      //    };","      // }","      if (responseDict.errCode === 1){","        // console.log(\"redirecting to login?errCode=\" + responseDict.errCode);","        self.redirect('/login?errCode='+responseDict.errCode);","      } else if (responseDict.errCode === 7) {","        self.redirect('/users/add?errCode=' + responseDict.errCode + '&amp;message=' + responseDict.message);","","      } else {","        // console.log(\"redirecting to users/add?errCode=\" + responseDict.errCode);","        self.redirect('/users/add?errCode=' + responseDict.errCode);","      }","      // self.respond(responseDict, {format: 'json'});","    };","","    geddy.model.User.add(user, callback);","  };","","  this.profile = function (req, resp, params) {","    var self = this","      , User = geddy.model.User;","","    var localParams = params;","    if (!localParams.errCode){","      localParams.errCode = 0;","    }","    if (!localParams.methodType){","      localParams.methodType = 0;","    }","    User.first({id: this.session.get('userId')}, function (err, data) {","      var params = localParams;","      params.user = null;","      params.authType = null;","      if (data) {","        params.user = data;","      }","      self.respond(params, {","        format: 'html'","      , template: 'app/views/users/profile'","      });","    });","  };","","  //Unit Tests for Users","  this.unitTests = function (req, resp, params) {","    var self = this;","    geddy.model.User.TESTAPI_unitTests(function (answerDict) {","      // console.log(\"responding from unitTests\");","      self.respond(answerDict, {format: 'json'});","    });","  };","","","  this.show = function (req, resp, params) {","    var self = this;","","    geddy.model.User.first(params.id, function(err, user) {","      if (!user) {","        var error = new Error();","        error.statusCode = 400;","        self.error(error);","      } else {","        user.password = '';","        self.respond({params: params, user: user.toObj()});","      }","    });","  };","","  this.edit = function (req, resp, params) {","    var self = this;","","    geddy.model.User.first(params.id, function(err, user) {","      if (!user) {","        var error = new Error();","        error.statusCode = 400;","        self.error(error);","      } else {","        self.respond({params: params, user: user.toObj()});","      }","    });","  };","","  this.update = function (req, resp, params) {","    var self = this;","","    geddy.model.User.first(params.id, function(err, user) {","      // Only update password if it's changed","      var skip = params.password ? [] : ['password'];","","      user.updateAttributes(params, {skip: skip});","","      if (params.password &amp;&amp; user.isValid()) {","        user.password = cryptPass(user.password);","      }","","      user.save(function(err, data) {","        if (err) {","          params.errors = err;","          self.transfer('edit');","        } else {","          self.redirect({controller: self.name});","        }","      });","    });","  };","","  this.destroy = function (req, resp, params) {","    var self = this;","","    geddy.model.User.remove(params.id, function(err) {","      if (err) {","        params.errors = err;","        self.transfer('edit');","      } else {","        self.redirect({controller: self.name});","      }","    });","  };","","  this.getUsernames = function(req, resp, params)","  {","    User.getUsernames(function(response)","    {","      self.respond(response);","    });","  }","","};","","exports.Users = Users;"];
