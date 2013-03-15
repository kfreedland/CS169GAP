var assert = require('assert')
  , tests
  , Activity = geddy.model.Activity;

tests = [

	//add activity any time
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

	    	try
	    	{
	    		var expected = {errCode: 1};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity anyTime', true);
	    	} 
	    	catch(exc)
	    	{
	    		callBack('add activity anyTime', false);
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

		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 1};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity specific date/time', true);
	    	} catch(exc){
	    		callBack('add activity specific date/time', false);
	    	}
	    });
	},

	//add activity no name
	function (callBack) {

	    var activityDict = {};
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
	    		callBack('add activity no name',true);
	    	} catch(exc){
	    		callBack('add activity no name',false);
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 1};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity no description', true);
	    	} catch(exc){
	    		callBack('add activity no description', false);
	    	}
	    });
	},

	//add activity no category
	function (callBack) {

	    var activityDict = {};
	    activityDict.name = 'Rock the Bells';
	    activityDict.description = 'An all day awesome concert!';
	    //activityDict.category = undefined;
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
	    		callBack('add activity no category', true);
	    	} catch(exc){
	    		callBack('add activity no category', false);
	    	}
	    });
	},

	//add activity invalid category
	function (callBack) {

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
	    		callBack('add activity invalid category', true);
	    	} catch(exc){
	    		callBack('add activity invalid category', false);
	    	}
	    });
	},

	//add activity no time1, needed for startEnd
	function (callBack) {

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
	    		callBack('add activity no time1, when needed for startEnd', true);
	    	} catch(exc){
	    		callBack('add activity no time1, when needed for startEnd', false);
	    	}
	    });
	},

	//add activity no time1, when needed for openClose
	function (callBack) {

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
	    		callBack('add activity no time1, when needed for openClose', true);
	    	} catch(exc){
	    		callBack('add activity no time1, when needed for openClose', false);
	    	}
	    });
	},

	//add activity time1 > time 2
	function (callBack) {

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
	    		callBack('add activity time1 > time2', true);
	    	} catch(exc){
	    		callBack('add activity time1 > time2', false);
	    	}
	    });
	},

	//add activity beginDate > endDate
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
	    		callBack('add activity beginDate > endDate', true);
	    	} catch(exc){
	    		callBack('add activity beginDate > endDate', false);
	    	}
	    });
	},

	//add activity lowPrice > highPrice
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
	    activityDict.lowPrice = '300';
	    activityDict.highPrice = '200';
	    activityDict.lowNumParticipants = '1';
	    activityDict.highNumParticipants = '10';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';

		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'invalid prices'};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity lowprice > highprice', true);
	    	} catch(exc){
	    		callBack('add activity lowprice > highprice', false);
	    	}
	    });
	},


	//add activity lownumparticipants > highnumparticipants
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
	    activityDict.lowNumParticipants = '10';
	    activityDict.highNumParticipants = '1';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';

		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'invalid participants'};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity lownumparticipants > highnumparticipants', true);
	    	} catch(exc){
	    		callBack('add activity lownumparticipants > highnumparticipants', false);
	    	}
	    });
	},


	//add activity null low price
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
	    //activityDict.lowPrice = '25';
	    activityDict.highPrice = '200';
	    activityDict.lowNumParticipants = '1';
	    activityDict.highNumParticipants = '10';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';

		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'null lowprice'};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity null lowprice', true);
	    	} catch(exc){
	    		callBack('add activity null lowprice', false);
	    	}
	    });
	},

//add activity null high price
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
	    //activityDict.highPrice = '200';
	    activityDict.lowNumParticipants = '1';
	    activityDict.highNumParticipants = '10';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';

		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'null highprice'};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity null highprice', true);
	    	} catch(exc){
	    		callBack('add activity null highprice', false);
	    	}
	    });
	},

	//add duplicate activities
	function (callBack) 
	{

	    var activityDict = {};
	    activityDict.name = 'playing tennis';
	    activityDict.description = 'go to a park near by and play tennis';
	    activityDict.category = 'Sports';
	    activityDict.time1 = undefined;
	    activityDict.time2 = undefined;
	    activityDict.flag = 'anyTime';
	    activityDict.beginDate = undefined;
	    activityDict.endDate = undefined;
	    activityDict.lowPrice = '0';
	    activityDict.highPrice = '0';
	    activityDict.lowNumParticipants = '2';
	    activityDict.highNumParticipants = '4';
	    activityDict.latitude = undefined;
	    activityDict.longitude = undefined;
	    activityDict.duration = '2';

	    Activity.add(activityDict, function(response)
	    {
	    	
			activityDict = {};
		    activityDict.name = 'playing tennis';
		    activityDict.description = 'go to a park near by and play tennis';
		    activityDict.category = 'Sports';
		    activityDict.time1 = undefined;
		    activityDict.time2 = undefined;
		    activityDict.flag = 'anyTime';
		    activityDict.beginDate = undefined;
		    activityDict.endDate = undefined;
		    activityDict.lowPrice = '0';
		    activityDict.highPrice = '0';
		    activityDict.lowNumParticipants = '2';
		    activityDict.highNumParticipants = '4';
		    activityDict.latitude = undefined;
		    activityDict.longitude = undefined;
		    activityDict.duration = '2';

		    Activity.add(activityDict, function(response)
		    {
		    	try
		    	{
		    		var expected = {errCode: 10, message: "That Activity already exists."};
		    		assert.deepEqual(response,expected);
		    		callBack('add duplicate activities', true);
		    	} 
		    	catch(exc)
		    	{
		    		callBack('add duplicate activities', false);
		    	}
		    });
	    });
	}
];


module.exports = tests;
