var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , user = require('./user')
  , successRedirect = geddy.config.passport.successRedirect
  , failureRedirect = geddy.config.passport.failureRedirect
  , cryptPass;

var SUPPORTED_SERVICES = [
    'facebook'
    ];

passport.use(new LocalStrategy(function(username, password, done) {
    geddy.model.User.first({username: username}, function (err, user) {
      var crypted;
      if (err) {
        done(err, null);
      }
      if (user) {
        if (!cryptPass) {
          cryptPass = require('./index').cryptPass;
        }

        crypted = cryptPass(password);
        if (user.password == crypted) {
          done(null, user);
        }
        else {
          done({message: 'Not found'}, null);
        }
      }
      else {
        done({message: 'Not found'}, null);
      }
    });
}));

SUPPORTED_SERVICES.forEach(function (item) {
  var config = {
        //callbackURL: geddy.config.fullHostname + '/auth/' +
        callbackURL: '/auth/' +
            item + '/callback'
      }
    , Strategy = require('passport-' + item).Strategy;

  geddy.mixin(config, geddy.config.passport[item]);
  passport.use(new Strategy(config,
      function(token, tokenSecret, profile, done) {
    done(null, profile);
  }));
});

var actions = new (function () {
  var self = this;

  var _createInit = function (authType) {
        return function (req, resp, params) {
          var self = this;
          req.session = this.session.data;
          // FIXME: hack until Passport defers to resp.redirect
          resp.end = function () {};
          resp.setHeader = function (headerName, val) {
            resp.redirect(val);
          };
          passport.authenticate(authType)(req, resp);
        };
      }

    , _createCallback = function (authType) {
        return function (req, resp, params) {
          var self = this;
          req.session = this.session.data;

          var responseDict = {};

          // FIXME: hack until Passport defers to resp.redirect
          console.log("GOT TO CREATE CALLBACK");
          resp.end = function () {};
          resp.setHeader = function (headerName, val) {
            resp.redirect(val);
          };
          passport.authenticate(authType, function (err, profile) {
            console.log("got through passport authenticate");
            if (!profile) {
              console.log("No Profile");
              //Error errCode = 5
              responseDict['errCode'] = 5;
              self.respond(responseDict, {format: 'json'});
              // self.redirect(failureRedirect);
            }
            else {
              try {
                user.lookupByPassport(authType, profile, function (err, user) {
                  console.log("got through lookup by passport");
                  if (err) {
                    console.log("Got error in lookupByPassport: " + err);
                    //Error errCode = 5
                    responseDict['errCode'] = 5;
                    self.respond(responseDict, {format: 'json'});
                    // self.error(err);
                  }
                  else {
                    self.session.set('userId', user.id);
                    // self.session.set('user', user);
                    self.session.set('authType', authType);
                    console.log("No Error so about to redirect to successRedirect: " + successRedirect);
                    //Success errCode = 1 
                    responseDict['errCode'] = 1;
                    self.respond(responseDict, {format: 'json'});
                    // self.redirect(successRedirect);
                  }
                });
              }
              catch (e) {
                console.log("Got an exception inner : " + e);
                self.error(e);
              }
            }
          })(req, resp, function (e) {
            if (e) {
              console.log("Got an exception outer : " + e);
              self.error(e);
            }
          });
        };
      };

  this.local = function (req, resp, params) {
    var self = this
      , handler = function (badCredsError, user, noCredsError) {
          var responseDict = {};
          if (badCredsError || noCredsError) {
            //Error errCode = 5
            responseDict['errCode'] = 5;
            self.respond(responseDict, {format: 'json'});
            // self.redirect(failureRedirect);
          }
          else {
            self.session.set('userId', user.id);
            self.session.set('authType', 'local');

            //Success errCode = 1
            responseDict['errCode'] = 1;
            self.respond(responseDict, {format: 'json'});
            // self.redirect(successRedirect);
          }
        };
    // FIXME: Passport wants a request body or query
    req.body = {
      username: params.username
    , password: params.password
    };
    passport.authenticate('local', function () {
      handler.apply(null, arguments);
    })(req, resp, handler);
  };

  SUPPORTED_SERVICES.forEach(function (item) {
    self[item] = _createInit(item);
    self[item + 'Callback'] = _createCallback(item);
  });

})();

module.exports = actions;
