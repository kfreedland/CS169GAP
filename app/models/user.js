var passport = require('passport')
  , passportHelper = require('../helpers/passport/index')
  , cryptPass = passportHelper.cryptPass;

var User = function () {
	this.property('username', 'string', {required: true});
    this.property('password', 'string', {required: true});
    this.property('familyName', 'string');
    this.property('givenName', 'string');
    this.property('email', 'string');

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
      //Username Exists errCode=2
          responseDict.errCode = 2;
      callback(responseDict);
      //self.transfer('add');
    }
    else {
      if (!user.username || user.username.length === 0 || user.username.length > 128) {
        console.log("bad username block");
        responseDict.errCode = 3; //"ERR_BAD_USERNAME"
        callback(responseDict);
      } else if (!user.password || user.password.length === 0 || user.password.length > 128 ) {
        //|| user.confirmPassword != user.password){
        console.log("bad password block with confirmPassword: " + user.confirmPassword);
        //Check if password is not empty and <128 chars
        responseDict.errCode = 4; //"ERR_BAD_PASSWORD"
        callback(responseDict);
      } else {
        if (user.isValid()) {
          user.password = cryptPass(user.password);
        }
        console.log("user is : username: " + user.username + " and password: " + user.password);
        user.save(function(err, data) {
          console.log("Got Data: " + data);
          if (err) {
            // params.errors = err;
            //Database Error errCode=7
            console.log("Error saving User: ");
            for (var item in err){
              console.log(item + ":" + err[item] + "\n");
            }
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
    }
    });
};


User.login = function(params, callback){
  var handler = function (badCredsError, user, noCredsError) {
      var responseDict = {};
      if (badCredsError || noCredsError) {
        //Error errCode = 5
        responseDict.errCode = 5;
        callback(responseDict);
      }
      else {
        //Success errCode = 1
        responseDict.errCode = 1;
        callback(responseDict);
      }
    };
    // FIXME: Passport wants a request body or query
    req = {};
    req.body = {
      username: params.username
    , password: params.password
    };
    passport.authenticate('local', function () {
      handler.apply(null, arguments);
    })(req, null, handler);
};

User.TESTAPI_resetFixture = function (callback) {
  geddy.model.User.all(function (err, result) {
    console.log("got all users models with error: " + err + " and result: " + result);
    for (var userModel in result){
      console.log("trying to remove userModel: " + result[userModel]);
      geddy.model.User.remove(result[userModel].id);
    }
    var responseDict = {};
  responseDict.errCode = 1;
    callback(responseDict); //"SUCCESS"
  });
};

User.TESTAPI_unitTests = function (callback) {
  //Remove all database entries
  console.log("Resetting fixture");
  User.TESTAPI_resetFixture(function (nothingImportant){
    console.log("Reset fixture completed");
    var successCount = 0;
    var failCount = 0;
    var tests = require('../../test/user.js');
    var testResults = "";

    var numberOfTests = 0;
    for (var key in tests){
      numberOfTests += 1;
    }
    console.log("There are " + numberOfTests + " tests to run.");
    var currentTestNumber = -1;
    // var numberOfTestsCompleted = 0;

    var done = function done(){
      var responseDict = {};
      responseDict.totalTests = successCount + failCount;
      responseDict.nrFailed = failCount;
      if (failCount === 0){
        responseDict.output = "All tests passed";
      } else {
        responseDict.output = testResults;
      }
      callback(responseDict);
    };
    var runTests = function (didTestPass){
      //Don't do anything for the first run
      if (currentTestNumber !== -1){
        //Save info from previous test
        if (!didTestPass){
          failCount += 1;
          testResults += "Test " + currentTestNumber + ": FAILED.                         ";
          console.log("Test " + currentTestNumber + ": FAILED.");
        } else{
          successCount += 1;
          //testResults += "Test " + currentTestNumber + ": PASSED.                         ";
          console.log("Test " + currentTestNumber + ": PASSED.");
        }
      }
      //Now we run the next test
      currentTestNumber += 1;
      console.log("running test: " + currentTestNumber + " and there are :" + numberOfTests + " total tests");
      if (currentTestNumber >= numberOfTests){
        //Done running all tests
        console.log("running done now");
        done();
      } else{
        console.log("Running next test");
        //Run next test and pass this function as callback for next function
        tests[currentTestNumber](runTests);
      }
    };
    //Start running tests
    console.log("Running tests");
    runTests();
  });
};

User = geddy.model.register('User', User);