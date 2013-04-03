var passport = require('../helpers/passport')
  , cryptPass = passport.cryptPass
  , requireAuth = passport.requireAuth;

var Users = function () {
  this.before(requireAuth, {
    except: ['add', 'create', 'unitTests']
  });

  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.User.all(function(err, users) {
      self.respond({params: params, users: users});
    });
  };

  this.add = function (req, resp, params) {
    // console.log("PARAMS.ERRCODE = " + params.errCode);
    if (!params.errCode){
      params.errCode = 0;
    }
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , user = geddy.model.User.create(params)
      , sha;

    var callback = function(responseDict){
      // if (responseDict.errCode == 2){
      //    params.errors = {
      //      username: 'This username is already in use.'
      //    };
      // }
      if (responseDict.errCode === 1){
        // console.log("redirecting to login?errCode=" + responseDict.errCode);
        self.redirect('/login?errCode='+responseDict.errCode);
      } else if (responseDict.errCode === 7) {
        self.redirect('/users/add?errCode=' + responseDict.errCode + '&message=' + responseDict.message);

      } else {
        // console.log("redirecting to users/add?errCode=" + responseDict.errCode);
        self.redirect('/users/add?errCode=' + responseDict.errCode);
      }
      // self.respond(responseDict, {format: 'json'});
    };

    geddy.model.User.add(user, callback);
  };

  this.profile = function (req, resp, params) {
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
      , template: 'app/views/users/profile'
      });
    });
  };

  //Unit Tests for Users
  this.unitTests = function (req, resp, params) {
    var self = this;
    geddy.model.User.TESTAPI_unitTests(function (answerDict) {
      // console.log("responding from unitTests");
      self.respond(answerDict, {format: 'json'});
    });
  };


  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.User.first(params.id, function(err, user) {
      if (!user) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        user.password = '';
        self.respond({params: params, user: user.toObj()});
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.User.first(params.id, function(err, user) {
      if (!user) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, user: user.toObj()});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.User.first(params.id, function(err, user) {
      // Only update password if it's changed
      var skip = params.password ? [] : ['password'];

      user.updateAttributes(params, {skip: skip});

      if (params.password && user.isValid()) {
        user.password = cryptPass(user.password);
      }

      user.save(function(err, data) {
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

    geddy.model.User.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Users = Users;
