(function () {
const MIN_RETURNED = 1;
const MAX_RETURNED = 2;
var Activity = function () {

  this.defineProperties({
    name: {type: 'string', required: true},
    description: {type: 'string'},
    category:{type: 'string'},
    time1: {type: '1'},
    time2: {type: '2'},
    flag: {type: 'string'},
    beginDate: {type: '_date'},
    endDate: {type: '_date'},
    lowPrice: {type: '_price'},
    highPrice: {type: '_price'},
    lowNumParticipants: {type: '_num_participants'},
    highNumParticipants: {type: '_num_participants'},
    latitude: {type: 'number'},
    longitude: {type: 'number'},
    duration:{type: 'number'},
    category: {type: 'string'}
  });

  this.create = function(parameterDict, callback){

    var self = this;

    var validCategories = new Array("sports", "entertainment", "concert");


    //Parse strings to Ints
    if(parameterDict.time1){
      parameterDict.time1 = parseInt(parameterDict.time1,10)
    } 
    if(parameterDict.time2){
      parameterDict.time2 = parseInt(parameterDict.time2,10)
    } 
    if(parameterDict.begin_date){
      parameterDict.begin_date = parseInt(parameterDict.begin_date,10)
    } 
    if(parameterDict.end_date){
      parameterDict.end_date = parseInt(parameterDict.end_date,10)
    } 
    if(parameterDict.low_price){
      parameterDict.low_price = parseInt(parameterDict.low_price,10)
    }
    if(parameterDict.high_price){
      parameterDict.high_price = parseInt(parameterDict.high_price,10)
    }
    if(parameterDict.low_num_participants){
      parameterDict.low_num_participants = parseInt(parameterDict.low_num_participants,10)
    }
    if(parameterDict.high_num_participants){
      parameterDict.high_num_participants = parseInt(parameterDict.high_num_participants,10)
    }
    if(parameterDict.latitude){
      parameterDict.latitude = parseFloat(parameterDict.latitude)
    }
    if(parameterDict.longitude){
      parameterDict.longitude = parseFloat(parameterDict.longitude)
    }

    //make sure required fields are non-null
    if (parameterDict.name == null){

      callback({"errCode": 6, "message": "null name"}); 

    } else if (parameterDict.flag == null){

      callback({"errCode": 6, "message": "null flag"});  

    } else if (parameterDict.flag == 'start_end' || paramaterDict.flag == 'open_close'){
      if(parameterDict.time1 == null){

        callback({"errCode": 6, "message": "null time2"});    
      }
      if(parameterDict.time2 == null){

        callback({"errCode": 6, "message": "null time2"});    
      }

    } else if (parameterDict.flag != 'start_end' && parameterDict.flag != 'open_close' 
           && parameterDict.flag != 'any_time' &&  parameterDict.flag != 'day_time' && 
           parameterDict.flag != 'night_time'){

      callback({"errCode": 6, "message": "invalid flag"});   

    } else if (parameterDict.low_price == null){

      callback({"errCode": 6, "message": "null low_price"});   

    } else if (parameterDict.high_price == null){

      callback({"errCode": 6, "message": "null high_price"});   

    } else if(parameterDict.low_price != null && parameterDict.high_price != null){

      if (parameterDict.low_price > parameterDict.high_price){

        callback({"errCode": 6, "message": "invalid prices"});  
      }

    } else if(parameterDict.low_num_participants != null && parameterDict.high_num_participants != null){

      if (parameterDict.low_num_participants > parameterDict.high_num_participants){

        callback({"errCode": 6, "message": "invalid participants"});  
      } 

    } else if(parameterDict.category == null){

      callback({"errCode": 6, "message": "null category"});  

    } else if(acceptedCategories.indexOf(parameterDict.category) == -1){

      callback({"errCode": 6, "message": "invalid category"});  

    } else {

      //all checks pass
      var newActivity = geddy.model.Activity.create(parameterDict);
      geddy.model.Activity.save(newActivity, 
        function (err, result){

          if(err){
            callback({"errCode":7});
          } else {
            callback ({"errCode": 1});
          }
        });
    }     
  };
};

var geoSearchHelper = function(records, lat, long, callback)
{
  var consDist = 69.1;
  var consAng = 57.3;
  returnRecords = {};
  count = 0;
  for (var idx in records)
  {
    var record = records[idx];
    console.log("RECORD: "+record);
    //using a geo dist equation
    var dist = Math.sqrt(Math.pow(record.latitude-lat, 2) + Math.pow((record.longitude-long) * Math.cos(lat/57.3), 2))
    record.dist = dist
    returnRecords[count] = record;
    count++;
    if(count == MAX_RETURNED)
    {
      returnRecords.sort(function(recA, recB){return recA.dist-recB.dist});
      callback(returnRecords, count);
      return;
    }
  }
  returnRecords.sort(function(recA, recB){return recA.dist-recB.dist});
  callback(returnRecords, count);
};

Activity.search = function search(params, myLat, myLong, callback)
{
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
  respDict ={};
  //we want to just return values based on the name if they supply a name so we shouldnt look at max/min values just matching vals or none
  if(!(typeof params=='object'))
  {
    respDict.errCode = 7;
    callback(respDict);
  }
  Activity.all(params, function (err, activities)
  {
    if(err)
    {
      throw err;
    }
    console.log("found activities");
    console.dir(activities);
    if(myLat && myLong && typeof myLat =='number' && typeof myLong =='number')
    {
      geoSearchHelper(activities, myLat, myLong, function(returnRecords, count)
      {
        callback(returnRecords);
      });
      callback(activities);
    }
    else
    {
      callback(activities);
    }
  });
};       

Activity = geddy.model.register('Activity', Activity);
}());

(function () {
var Passport = function () {
  this.property('authType', 'string');
  this.property('key', 'string');

  this.belongsTo('User');
};

Passport = geddy.model.register('Passport', Passport);

}());

(function () {
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
      		responseDict['errCode'] = 2;
			callback(responseDict);
			//self.transfer('add');
		}
		else {
			if (!user.username || user.username.length == 0 || user.username.length > 128) {
				console.log("bad username block");
				responseDict.errCode = 3; //"ERR_BAD_USERNAME"
				callback(responseDict);
			} else if (!user.password || user.password.length == 0 || user.password.length > 128
				|| user.confirmPassword != user.password){
				console.log("bad password block");
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
						var responseDict = {};
	      				responseDict['errCode'] = 7;
						callback(responseDict);
						// self.transfer('add');
					}
					else {
						//Success errCode=1
						var responseDict = {};
	      				responseDict['errCode'] = 1;
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
      if (badCredsError || noCredsError) {
        //Error errCode = 5
        var responseDict = {};
      	responseDict['errCode'] = 5;
        callback(responseDict);
      }
      else {
        //Success errCode = 1
        var responseDict = {};
      	responseDict['errCode'] = 1;
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
	responseDict['errCode'] = 1;
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
      if (failCount == 0){
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

}());