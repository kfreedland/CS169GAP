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
	    activityDict.begindate = undefined;
	    activityDict.enddate = undefined;
	    activityDict.lowprice = '0';
	    activityDict.highprice = '0';
	    activityDict.lownumparticipants = '1';
	    activityDict.highnumparticipants = undefined;
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
	    		var expected = {errCode: 1};
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
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

		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 1};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity specific date/time', true);
	    	} catch(exc){
	    		var expected = {errCode: 1};
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'null name'};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity no name',true);
	    	} catch(exc){
	    		var expected = {errCode: 6, message: 'null name'};
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 1};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity no description', true);
	    	} catch(exc){
	    		var expected = {errCode: 1};
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'null category'};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity no category', true);
	    	} catch(exc){
	    		var expected = {errCode: 6, message: 'null category'};
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'invalid category'};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity invalid category', true);
	    	} catch(exc){
	    		var expected = {errCode: 6, message: 'invalid category'};
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'null time1'};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity no time1, when needed for startEnd', true);
	    	} catch(exc){
	    		var expected = {errCode: 6, message: 'null time1'};
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'null time1'};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity no time1, when needed for openClose', true);
	    	} catch(exc){
	    		var expected = {errCode: 6, message: 'null time1'};
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
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
	    
		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'invalid times'};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity time1 > time2', true);
	    	} catch(exc){
	    		var expected = {errCode: 6, message: 'invalid times'};
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
	    		callBack('add activity time1 > time2', false);
	    	}
	    });
	},

	//add activity begindate > enddate
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
	    activityDict.begindate = date2.getTime();
	    activityDict.enddate = date1.getTime();
	    activityDict.lowprice = '25';
	    activityDict.highprice = '200';
	    activityDict.lownumparticipants = '1';
	    activityDict.highnumparticipants = '10';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';

		Activity.add(activityDict, function(response){

	    	try{
	    		var expected = {errCode: 6, message: 'invalid dates'};
	    		assert.deepEqual(response,expected);
	    		callBack('add activity begindate > enddate', true);
	    	} catch(exc){
	    		var expected = {errCode: 6, message: 'invalid dates'};
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
	    		callBack('add activity begindate > enddate', false);
	    	}
	    });
	},

	//add activity lowprice > highprice
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
	    activityDict.begindate = date1.getTime();
	    activityDict.enddate = date2.getTime();
	    activityDict.lowprice = '300';
	    activityDict.highprice = '200';
	    activityDict.lownumparticipants = '1';
	    activityDict.highnumparticipants = '10';
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
	    		var expected = {errCode: 6, message: 'invalid prices'};
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
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
	    activityDict.begindate = date1.getTime();
	    activityDict.enddate = date2.getTime();
	    activityDict.lowprice = '25';
	    activityDict.highprice = '200';
	    activityDict.lownumparticipants = '10';
	    activityDict.highnumparticipants = '1';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';

		Activity.add(activityDict, function(response){
			var expected = {errCode: 6, message: 'invalid participants'};
	    	try{
	    		assert.deepEqual(response,expected);
	    		callBack('add activity lownumparticipants > highnumparticipants', true);
	    	} catch(exc){
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
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
	    activityDict.begindate = date1.getTime();
	    activityDict.enddate = date2.getTime();
	    //activityDict.lowprice = '25';
	    activityDict.highprice = '200';
	    activityDict.lownumparticipants = '1';
	    activityDict.highnumparticipants = '10';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';

		Activity.add(activityDict, function(response){

			var expected = {errCode: 6, message: 'null lowprice'};
	    	try{
	    		assert.deepEqual(response,expected);
	    		callBack('add activity null lowprice', true);
	    	} catch(exc){
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
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
	    activityDict.begindate = date1.getTime();
	    activityDict.enddate = date2.getTime();
	    activityDict.lowprice = '25';
	    //activityDict.highprice = '200';
	    activityDict.lownumparticipants = '1';
	    activityDict.highnumparticipants = '10';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';

		Activity.add(activityDict, function(response){

			var expected = {errCode: 6, message: 'null highprice'};
	    	try{
	    		
	    		assert.deepEqual(response,expected);
	    		callBack('add activity null highprice', true);
	    	} catch(exc){
	    		console.log("expected = ");
	    		console.dir(expected);
	    		console.log("response = ");
	    		console.dir(response);
	    		callBack('add activity null highprice', false);
	    	}
	    });
	},

	//add free event
	function (callBack) {

	    var activityDict = {};
	    activityDict.name = 'walk in the';
	    activityDict.description = "It's nice outside";
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
	    activityDict.lowprice = '0';
	    activityDict.highprice = '0';
	    activityDict.lowNumParticipants = '0';
	    activityDict.highNumParticipants = '10';
	    //oracle arena
	    activityDict.latitude = '37.751';
	    activityDict.longitude = '-122.200';
	    activityDict.duration = '3';

		Activity.add(activityDict, function(response){

			var expected = {errCode: 1};
	    	try{
	    		
	    		assert.deepEqual(response,expected);
	    		callBack('add free activity', true);
	    	} catch(exc){
	    		console.log("expected = " + expected);
	    		console.log("response = " + response);
	    		callBack('add free activity', false);
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
	    activityDict.begindate = undefined;
	    activityDict.enddate = undefined;
	    activityDict.lowprice = '1';
	    activityDict.highprice = '2';
	    activityDict.lownumparticipants = '2';
	    activityDict.highnumparticipants = '4';
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
		    activityDict.begindate = undefined;
		    activityDict.enddate = undefined;
		    activityDict.lowprice = '1';
		    activityDict.highprice = '2';
		    activityDict.lownumparticipants = '2';
		    activityDict.highnumparticipants = '4';
		    activityDict.latitude = undefined;
		    activityDict.longitude = undefined;
		    activityDict.duration = '2';

		    Activity.add(activityDict, function(response)
		    {
		    	var expected = {errCode: 10, message: "That Activity already exists."};
		    	try
		    	{
		    		console.log("Finished Add Duplicate Activities Test");
		    		assert.deepEqual(response,expected);
		    		callBack('add duplicate activities', true);
		    	} 
		    	catch(exc)
		    	{
		    		console.log("expected = ");
		    		console.dir(expected);
		    		console.log("response = ");
		    		console.dir(response);
		    		callBack('add duplicate activities', false);
		    	}
		    });
	    });
	}
];


module.exports = tests;
