var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity;

var resetFixture = function (done){
	Activity.TESTAPI_resetFixture(function(){
		done();
	});
};


describe('Activity', function(){
	beforeEach(function(done) {
		//Erase database
		resetFixture(done);
	});

	describe('Activity.search any time', function(){
		it('should return errCode:1', function(done){
			var activityDict = {};
		    activityDict.name = 'jogging';
		    activityDict.description = 'go for a run with some friends!';
		    activityDict.category = 'Sports';
		    // activityDict.time1 = undefined;
		    // activityDict.time2 = undefined;
		    activityDict.flag = 'anyTime';
		    // activityDict.begindate = undefined;
		    // activityDict.enddate = undefined;
		    activityDict.lowprice = '0';
		    activityDict.highprice = '0';
		    activityDict.lownumparticipants = '1';
		    // activityDict.highnumparticipants = undefined;
		    // activityDict.latitude = undefined;
		    // activityDict.longitude = undefined;
		    activityDict.duration = '2';

		    Activity.add(activityDict, function(response)
		    {
		    	Activity.search(activityDict, null/*myLat*/, null/*myLong*/, function(response)
		    	{
	    			assert.equal(response.length, 1);
	    			done();
		    	});
		    });
		});
	});

	describe('Activity.search specific date/time', function(){
		it('should return errCode:1', function(done){
		    var activityDict = {};
		    activityDict.name = 'backstreet boys concert';
		    activityDict.description = 'I want it that way...';
		    activityDict.category = 'Entertainment';
		    //7pm in milliseconds since midnight
		    var sevenPM = 1000 * 60 * 60 * 19;
		    activityDict.time1 = sevenPM;
		    //10pm in milliseconds senice midnight
		    var tenPM = 1000 * 60 * 60 * 22;
		    activityDict.time2 = tenPM;
		    activityDict.flag = 'startEnd';
		    //date is june 15th 2013
		    var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
		    var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
		    activityDict.begindate = date1.getTime();
		    activityDict.enddate = date2.getTime();
		    activityDict.lowprice = '25';
		    activityDict.highprice = '200';
		    activityDict.lownumparticipants = '1';
		    activityDict.highnumparticipants = '10';
		    //oracle arena
		    activityDict.latitude = '37.751';
		    activityDict.longitude = '-122.200';
		    activityDict.duration = '3';

		    Activity.add(activityDict, function(response)
		    {
		    	Activity.search(activityDict, null/*myLat*/, null/*myLong*/, function(response)
		    	{
	    			assert.equal(response.length, 1);
	    			done();
		    	});
		    });
		});
	});

	describe('Activity.search no description', function(){
		it('should return errCode:1', function(done){
		    var activityDict = {};
		    activityDict.name = 'Rock the Bells';
		    // activityDict.description = undefined;
		    activityDict.category = 'Entertainment';
		    //7pm in milliseconds since midnight
		    var sevenPM = 1000 * 60 * 60 * 19;
		    activityDict.time1 = sevenPM;
		    //10pm in milliseconds senice midnight
		    var tenPM = 1000 * 60 * 60 * 22;
		    activityDict.time2 = tenPM;
		    activityDict.flag = 'startEnd';
		    //date is june 15th 2013
		    var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
		    var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
		    activityDict.begindate = date1.getTime();
		    activityDict.endDdate = date2.getTime();
		    activityDict.lowprice = '25';
		    activityDict.highprice = '200';
		    activityDict.lownumparticipants = '1';
		    activityDict.highnumparticipants = '10';
		    //oracle arena
		    activityDict.latitude = '37.751';
		    activityDict.longitude = '-122.200';
		    activityDict.duration = '3';
		    
		    Activity.add(activityDict, function(response)
		    {
		    	Activity.search(activityDict, null/*myLat*/, null/*myLong*/, function(response)
		    	{
	    			assert.equal(response.length, 1);
	    			done();
		    	});
		    });
		});
	});

});
