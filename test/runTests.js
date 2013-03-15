var User = geddy.model.User
  , Activity = geddy.model.Activity;

var currentTestNumber = -1;
var tests = [];
var numberOfTests = 0;
var callback = null;
var successCount = 0;
var failCount = 0;
var testResults = "";

var runTests = function (testName, didTestPass){
  //Don't do anything for the first run
  if (currentTestNumber !== -1){
    //Save info from previous test
    if (!didTestPass){
      failCount += 1;
      testResults += testName + ": FAILED.                         ";
      console.log( testName + ": FAILED.");
    } else{
      successCount += 1;
      //testResults += "Test " + currentTestNumber + ": PASSED.                         ";
      console.log(testName + ": PASSED.");
    }
  }
  //Now we run the next test
  currentTestNumber += 1;
  console.log("running test: " + currentTestNumber + " and there are :" + numberOfTests + " total tests");
  if (currentTestNumber >= numberOfTests){
    //Done running all tests
    console.log("running done now");
    done(callback);
  } else{
    console.log("Running next test");
    //Run next test and pass this function as callback for next function
    tests[currentTestNumber](runTests);
  }
};

var done = function done(callback){
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

var unitTests = function (callbackFunc) {
  callback = callbackFunc;
  //Remove all database entries
  console.log("Resetting fixture");
  Activity.TESTAPI_resetFixture(function (nothingImportant){
    User.TESTAPI_resetFixture(function (nothingImportant){
      console.log("Reset fixture completed");
      
      tests = require('../test/user.js');
      activityTests = require('../test/activity.js');
      tests.push.apply(tests, activityTests);

      findActivityTests = require('../test/findActivity.js');
      tests.push.apply(tests, findActivityTests);
      testResults = "";

      numberOfTests = 0;
      for (var key in tests){
        numberOfTests += 1;
      }
      console.log("There are " + numberOfTests + " tests to run.");

      //Start running tests
      console.log("Running tests");
      runTests(false);
    });
  });
};


var executeUnitTests = function (callback) {
    var response = {};
    console.log("calling unit tests");
    unitTests(callback);
      //Call all activity unit tests and append their result
      // activityUnitTests(function (answerDict){
      //   response.activityTests = answerDict.output;
      //   self.respond(response, {format: 'json'});
      // });
};

module.exports = executeUnitTests;