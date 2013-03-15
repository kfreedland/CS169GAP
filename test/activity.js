var assert = require('assert')
  , tests
  , Activity = geddy.model.Activity;

tests = {
  	'add activity anyTime': function (callBack) {

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

	    Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 1};
	    		assert.deepEqual(response,expected);
	    		callBack(true);
	    	} catch(exc){
	    		callBack(false);
	    	}
	    });
  }, 

  	'add activity specific date/time': function () {

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

		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 1};
	    		assert.deepEqual(response,expected);
	    		callBack(true);
	    	} catch(exc){
	    		callBack(false);
	    	}
	    });

  },

 	'add activity no name': function () {

	    var activityDict = {};
	    activityDict.name = undefined;
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'null name'};
	    		assert.deepEqual(response,expected);
	    		callBack(true);
	    	} catch(exc){
	    		callBack(false);
	    	}
	    });

  },

  'add activity no description': function () {

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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 1};
	    		assert.deepEqual(response,expected);
	    		callBack(true);
	    	} catch(exc){
	    		callBack(false);
	    	}
	    });

  },
 'add activity no category': function () {

	    var activityDict = {};
	    activityDict.name = 'Rock the Bells';
	    activityDict.description = 'An all day awesome concert!';
	    activityDict.category = undefined;
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'null category'};
	    		assert.deepEqual(response,expected);
	    		callBack(true);
	    	} catch(exc){
	    		callBack(false);
	    	}
	    });

  },
 
 'add activity invalid category': function () {

	    var activityDict = {};
	    activityDict.name = 'Rock the Bells';
	    activityDict.description = 'An all day awesome concert!';
	    activityDict.category = 'good times!';
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'invalid category'};
	    		assert.deepEqual(response,expected);
	    		callBack(true);
	    	} catch(exc){
	    		callBack(false);
	    	}
	    });

  },

 'add activity no time1, when needed for startEnd': function () {

	    var activityDict = {};
	    activityDict.name = 'Rock the Bells';
	    activityDict.description = 'An all day awesome concert!';
	    activityDict.category = 'Entertainment';
	    activityDict.time1 = undefined;
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'null time1'};
	    		assert.deepEqual(response,expected);
	    		callBack(true);
	    	} catch(exc){
	    		callBack(false);
	    	}
	    });

  },
  'add activity no time1, when needed for openClose': function () {

	    var activityDict = {};
	    activityDict.name = 'Rock the Bells';
	    activityDict.description = 'An all day awesome concert!';
	    activityDict.category = 'Entertainment';
	    activityDict.time1 = undefined;
	    //10pm in milliseconds senice midnight
	    var tenPM = 1000 * 60 * 60 * 22;
	    activityDict.time2 = tenPM;
	    activityDict.flag = 'openClose';
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'null time1'};
	    		assert.deepEqual(response,expected);
	    		callBack(true);
	    	} catch(exc){
	    		callBack(false);
	    	}
	    });

  },

   'add activity time1 > time2': function () {

	    var activityDict = {};
	    activityDict.name = 'Rock the Bells';
	    activityDict.description = 'An all day awesome concert!';
	    activityDict.category = 'Entertainment';
	    //7pm in milliseconds since midnight
	    var sevenPM = 1000 * 60 * 60 * 19;
	    var tenPM = 1000 * 60 * 60 * 22;
	    activityDict.time1 = tenPM;
	    //10pm in milliseconds senice midnight
	    activityDict.time2 = sevenPM;
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'invalid times'};
	    		assert.deepEqual(response,expected);
	    		callBack(true);
	    	} catch(exc){
	    		callBack(false);
	    	}
	    });

  },

  	'add activity beginDate > endDate': function () {

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
	    activityDict.beginDate = date2.getTime();
	    activityDict.endDate = date1.getTime();
	    activityDict.lowPrice = '25';
	    activityDict.highPrice = '200';
	    activityDict.lowNumParticipants = '1';
	    activityDict.highNumParticipants = '10';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';

		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'invalid dates'};
	    		assert.deepEqual(response,expected);
	    		callBack(true);
	    	} catch(exc){
	    		callBack(false);
	    	}
	    });

  }






};

module.exports = tests;
