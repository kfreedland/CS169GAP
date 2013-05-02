var passport = require('passport')
  , passportHelper = require('../helpers/passport/index')
  , cryptPass = passportHelper.cryptPass
  , check = require("validator").check;
var User = function () {

	this.property('username', 'string', {required: true});
    this.property('password', 'string', {required: true});
    this.property('familyName', 'string');
    this.property('givenName', 'string');
    this.property('email', 'string');
    this.property('myevents', 'string');
    this.property('mynotifications', 'number');
    this.validatesLength('username', {min: 3, max:128});
    this.validatesLength('password', {min: 8, max:128});
    this.validatesConfirmed('password', 'confirmPassword');    
    this.hasMany('Passports');
};

User.add = function(user, callback){
    // Non-blocking uniqueness checks are hard
    User.first({username: user.username}, function(err, data) {
      var responseDict = {};
    if (data) {
      // console.log("USER EXISTS");
      //Username Exists errCode=2
      responseDict.errCode = 2;
      callback(responseDict);
      //self.transfer('add');
    }
    else {
      // console.log("USER DOESNT EXIST");
      if (!user.username || user.username.length === 0 || user.username.length > 128) {
        // console.log("bad username block");
        responseDict.errCode = 3; //"ERR_BAD_USERNAME"
        callback(responseDict);
      } else if (!user.password || user.password.length === 0 || user.password.length > 128 ) {
        //|| user.confirmPassword != user.password){
        // console.log("bad password block with confirmPassword: " + user.confirmPassword);
        //Check if password is not empty and <128 chars
        responseDict.errCode = 4; //"ERR_BAD_PASSWORD"
        callback(responseDict);
      } else {
        if (user.isValid()) {
          user.password = cryptPass(user.password);
        }
        //if the user does not give us an email we don't care but if they do it should be valid
        if(!user.email || isValidEmail(user.email))
        {
          // console.log("user is : username: " + user.username + " and password: " + user.password);
          user.save(function(err, data) {
            // console.log("Got Data: " + data);
            if (err) {
              // params.errors = err;
              //Database Error errCode=7
              console.log("Error saving User: ");
              responseDict.message = "";
              for (var item in err){
                responseDict.message += err[item];
              }
              console.log(responseDict.message);
              responseDict.errCode = 7;
              callback(responseDict);
              // self.transfer('add');
            }
            else {
              //Success errCode=1
              responseDict.errCode = 1;
              callback(responseDict);
                // self.redirect({controller: self.name});
            }
          });
        }
        else
        {
          responseDict.errCode = 14;
          callback(responseDict);
        }
      }
    }
    });
};

function isValidEmail(email) { 
  try
  {
    check(email).isEmail();
    return true;
  } 
  catch (error)
  {
    return false;
  }
}

User.getUsernames = function(callback)
{
  usernames = [];
  geddy.model.User.all(function(err, result)
  {
    for(var key in result)
    {
      usernames.push(result[key].username);
    }
    usernames.sort();
    callback(usernames);
  });
};

User.TESTAPI_resetFixture = function (callback) {
  geddy.model.User.all(function (err, result) {
     // console.log("got all users models with error: " + err + " and result: " + result);
    for (var userModel in result){
       // console.log("trying to remove userModel: " + result[userModel]);
      geddy.model.User.remove(result[userModel].id);
    }
    var responseDict = {};
  responseDict.errCode = 1;
    callback(responseDict); //"SUCCESS"
  });
};

User = geddy.model.register('User', User);