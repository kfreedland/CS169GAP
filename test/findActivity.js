var assert = require('assert')
  , tests
  , Activity = geddy.model.Activity;

//these tests are more of testing geddy than our code but ill keep them here for sanity
tests = [

	//search activity any time
	function (callBack) 
	{

	    var activityDict = {};
	    activityDict.name = 'jogging';
	    activityDict.description = 'go for a run with some friends!';
	    activityDict.category = 'Sports';
	    activityDict.time1 = undefined;
	    activityDict.time2 = undefined;
	    activityDict.flag = 'anyTime';
	    activityDict.beginDate = undefined;
	    activityDict.endDate = undefined;
	    activityDict.lowPrice = '0';
	    activityDict.highPrice = '0';
	    activityDict.lowNumParticipants = '1';
	    activityDict.highNumParticipants = undefined;
	    activityDict.latitude = undefined;
	    activityDict.longitude = undefined;
	    activityDict.duration = '2';

	    Activity.add(activityDict, function(response)
	    {
	    	Activity.search(activityDict, function(response)
	    	{
	    		try
	    		{
	    			assert.equal(response.length, 1);
	    			callBack('search activity anyTime', true);
	    		}
	    		catch(exc)
	    		{
	    			callBack('search activity anyTime', false);
	    		}
	    	}
	    });
	},

	//add activity specific date/time
	function (callBack) {

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
	    activityDict.beginDate = date1.getTime();
	    activityDict.endDate = date2.getTime();
	    activityDict.lowPrice = '25';
	    activityDict.highPrice = '200';
	    activityDict.lowNumParticipants = '1';
	    activityDict.highNumParticipants = '10';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';

	    Activity.add(activityDict, function(response)
	    {
	    	Activity.search(activityDict, function(response)
	    	{
	    		try
	    		{
	    			assert.equal(response.length, 1);
	    			callBack('search activity specific date/time', true);
	    		}
	    		catch(exc)
	    		{
	    			callBack('search activity specific date/time', false);
	    		}
	    	}
	    });
	},

	//add activity no description
	 function (callBack) {

	    var activityDict = {};
	    activityDict.name = 'Rock the Bells';
	    activityDict.description = undefined;
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
	    activityDict.beginDate = date1.getTime();
	    activityDict.endDate = date2.getTime();
	    activityDict.lowPrice = '25';
	    activityDict.highPrice = '200';
	    activityDict.lowNumParticipants = '1';
	    activityDict.highNumParticipants = '10';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';
	    
	    Activity.add(activityDict, function(response)
	    {
	    	Activity.search(activityDict, function(response)
	    	{
	    		try
	    		{
	    			assert.equal(response.length, 1);
	    			callBack('search activity nodesc', true);
	    		}
	    		catch(exc)
	    		{
	    			callBack('search activity nodesc', false);
	    		}
	    	}
	    });
	}

];


module.exports = tests;
