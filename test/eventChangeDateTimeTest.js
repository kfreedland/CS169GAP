var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity
  , Event = geddy.model.Event;

var resetFixture = function (done){
	Activity.TESTAPI_resetFixture(function(){
		done();
	});
};

// describe('eventChangeDateTime', function(){
// 	before(function(done) {
// 		//Erase database
// 		resetFixture(done);
// 	});


// 	describe('event.changeDateTime normal', function(){
// 		it('should return errCode:1', function(done){
// 		    var activityDict = {};
// 		    activityDict.name = 'jogging';
// 		    activityDict.description = 'go for a run with some friends!';
// 		    activityDict.category = 'Sports';
// 		    activityDict.time1 = undefined;
// 		    activityDict.time2 = undefined;
// 		    activityDict.flag = 'anyTime';
// 		    activityDict.begindate = undefined;
// 		    activityDict.enddate = undefined;
// 		    activityDict.lowprice = '0';
// 		    activityDict.highprice = '0';
// 		    activityDict.lownumparticipants = '1';
// 		    activityDict.highnumparticipants = undefined;
// 		    activityDict.latitude = undefined;
// 		    activityDict.longitude = undefined;
// 		    activityDict.duration = '2';

// 		    Activity.add(activityDict, function(response)
// 		    {
// 	    		var expected = {errCode: 1};
// 	    		assert.deepEqual(response,expected);
// 	    		done();
// 		    });
// 		});
// 	});