var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity
  , Event = geddy.model.Event;

var resetFixture = function (done){
	Activity.TESTAPI_resetFixture(function(){
		done();
	});
};

describe('Event', function()
{
	beforeEach(function(done) 
	{
		//Erase database
		resetFixture(done);
	});

describe('Event.changeDateTime change time1', function()
	{
		it('should return errCode:1', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									paramDict.time1 = 100;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 1};
										assert.deepEqual(changeDateResponse, expected);


										//make sure date time is changed
										Event.first({id: eventRecord.id}, function(err, newEventRecord){

											assert.deepEqual(newEventRecord.time1, 100);
											done();

										});

									});

								});
							});
						});
					});
				});
			});
		});
	});





describe('Event.changeDateTime change time2', function()
	{
		it('should return errCode:1', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									paramDict.time2 = 600;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 1};
										assert.deepEqual(changeDateResponse, expected);


										//make sure date time is changed
										Event.first({id: eventRecord.id}, function(err, newEventRecord){

											assert.deepEqual(newEventRecord.time2, 600);
											done();

										});

									});

								});
							});
						});
					});
				});
			});
		});
	});

describe('Event.changeDateTime change time1 and time2', function()
	{
		it('should return errCode:1', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									paramDict.time1 = 600;
									paramDict.time2 = 1100;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 1};
										assert.deepEqual(changeDateResponse, expected);


										//make sure date time is changed
										Event.first({id: eventRecord.id}, function(err, newEventRecord){

											assert.deepEqual(newEventRecord.time1, 600);
											assert.deepEqual(newEventRecord.time2, 1100);
											done();

										});

									});

								});
							});
						});
					});
				});
			});
		});
	});

describe('Event.changeDateTime change begindate', function()
	{
		it('should return errCode:1', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									var newBeginDate = d.getTime() + 100;
									//var newEndDate = d.getTime() + 10000;
									paramDict.begindate = newBeginDate;
									//paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 1};
										assert.deepEqual(changeDateResponse, expected);


										//make sure date time is changed
										Event.first({id: eventRecord.id}, function(err, newEventRecord){

											assert.deepEqual(newEventRecord.begindate, newBeginDate);
											//assert.deepEqual(newEventRecord.enddate, newEndDate);
											done();

										});

									});

								});
							});
						});
					});
				});
			});
		});
	});


describe('Event.changeDateTime change enddate', function()
	{
		it('should return errCode:1', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									//var newBeginDate = d.getTime() + 100;
									var newEndDate = d.getTime() + 10000;
									//paramDict.begindate = newBeginDate;
									paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 1};
										assert.deepEqual(changeDateResponse, expected);


										//make sure date time is changed
										Event.first({id: eventRecord.id}, function(err, newEventRecord){

											//assert.deepEqual(newEventRecord.begindate, newBeginDate);
											assert.deepEqual(newEventRecord.enddate, newEndDate);
											done();

										});

									});

								});
							});
						});
					});
				});
			});
		});
	});


describe('Event.changeDateTime change begindate and enddate', function()
	{
		it('should return errCode:1', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									var newBeginDate = d.getTime() + 100;
									var newEndDate = d.getTime() + 10000;
									paramDict.begindate = newBeginDate;
									paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 1};
										assert.deepEqual(changeDateResponse, expected);


										//make sure date time is changed
										Event.first({id: eventRecord.id}, function(err, newEventRecord){

											assert.deepEqual(newEventRecord.begindate, newBeginDate);
											assert.deepEqual(newEventRecord.enddate, newEndDate);
											done();

										});

									});

								});
							});
						});
					});
				});
			});
		});
	});


describe('Event.changeDateTime change begindate and enddate, time1 and time2', function()
	{
		it('should return errCode:1', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									var newBeginDate = d.getTime() + 100;
									var newEndDate = d.getTime() + 10000;
									var newtime1 = 1200;
									var newtime2 = 2000;
									paramDict.time1 = newtime1;
									paramDict.time2 = newtime2;
									paramDict.begindate = newBeginDate;
									paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 1};
										assert.deepEqual(changeDateResponse, expected);


										//make sure date time is changed
										Event.first({id: eventRecord.id}, function(err, newEventRecord){

											assert.deepEqual(newEventRecord.begindate, newBeginDate);
											assert.deepEqual(newEventRecord.enddate, newEndDate);
											assert.deepEqual(newEventRecord.time1, newtime1);
											assert.deepEqual(newEventRecord.time2, newtime2);
											done();

										});

									});

								});
							});
						});
					});
				});
			});
		});
	});


describe('Event.changeDateTime all date/time fields null', function()
	{
		it('should return errCode:6', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									var newBeginDate = d.getTime() + 100;
									var newEndDate = d.getTime() + 10000;
									var newtime1 = 1200;
									var newtime2 = 2000;
									// paramDict.time1 = newtime1;
									// paramDict.time2 = newtime2;
									// paramDict.begindate = newBeginDate;
									// paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 6, message: "all date/time parameters are null"};
										assert.deepEqual(changeDateResponse, expected);
										done();

									});

								});
							});
						});
					});
				});
			});
		});
	});

describe('Event.changeDateTime eventid null', function()
	{
		it('should return errCode:6', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									var newBeginDate = d.getTime() + 100;
									var newEndDate = d.getTime() + 10000;
									var newtime1 = 1200;
									var newtime2 = 2000;
									paramDict.time1 = newtime1;
									paramDict.time2 = newtime2;
									paramDict.begindate = newBeginDate;
									paramDict.enddate = newEndDate;
									//paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 6, message: "null eventid"};
										assert.deepEqual(changeDateResponse, expected);
										done();

									});

								});
							});
						});
					});
				});
			});
		});
	});

describe('Event.changeDateTime invalid eventid', function()
	{
		it('should return errCode:10', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									var newBeginDate = d.getTime() + 100;
									var newEndDate = d.getTime() + 10000;
									var newtime1 = 1200;
									var newtime2 = 2000;
									paramDict.time1 = newtime1;
									paramDict.time2 = newtime2;
									paramDict.begindate = newBeginDate;
									paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id + "invalid!!";

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 10, message: "invalid eventid"};
										assert.deepEqual(changeDateResponse, expected);
										done();

									});

								});
							});
						});
					});
				});
			});
		});
	});


describe('Event.changeDateTime new time1 invalid', function()
	{
		it('should return errCode:11', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									var newBeginDate = d.getTime() + 100;
									var newEndDate = d.getTime() + 10000;
									var newtime1 = 1200;
									//var newtime2 = 2000;
									paramDict.time1 = newtime1;
									//paramDict.time2 = newtime2;
									//paramDict.begindate = newBeginDate;
									//paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 11, message: "invalid times"};
										assert.deepEqual(changeDateResponse, expected);
										done();

									});

								});
							});
						});
					});
				});
			});
		});
	});

describe('Event.changeDateTime new time2 invalid', function()
	{
		it('should return errCode:11', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									var newBeginDate = d.getTime() + 100;
									var newEndDate = d.getTime() + 10000;
									//var newtime1 = 1200;
									var newtime2 = 100;
									paramDict.time1 = newtime1;
									paramDict.time2 = newtime2;
									//paramDict.begindate = newBeginDate;
									//paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 11, message: "invalid times"};
										assert.deepEqual(changeDateResponse, expected);
										done();

									});

								});
							});
						});
					});
				});
			});
		});
	});

describe('Event.changeDateTime invalid times', function()
	{
		it('should return errCode:11', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									var newBeginDate = d.getTime() + 100;
									var newEndDate = d.getTime() + 10000;
									var newtime1 = 2000;
									var newtime2 = 1200;
									paramDict.time1 = newtime1;
									paramDict.time2 = newtime2;
									//paramDict.begindate = newBeginDate;
									//paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 11, message: "invalid times"};
										assert.deepEqual(changeDateResponse, expected);
										done();

									});

								});
							});
						});
					});
				});
			});
		});
	});

describe('Event.changeDateTime new begindate invalid', function()
	{
		it('should return errCode:11', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									var newBeginDate = eventRecord.enddate + 10;
									//var newEndDate = d.getTime() + 10000;
									//var newtime1 = 1200;
									//var newtime2 = 2000;
									//paramDict.time1 = newtime1;
									//paramDict.time2 = newtime2;
									paramDict.begindate = newBeginDate;
									//paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 11, message: "invalid dates"};
										assert.deepEqual(changeDateResponse, expected);
										done();

									});

								});
							});
						});
					});
				});
			});
		});
	});


describe('Event.changeDateTime new enddate invalid', function()
	{
		it('should return errCode:11', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									//var newBeginDate = eventRecord.enddate + 10;
									var newEndDate = eventRecord.begindate - 100;
									//var newtime1 = 1200;
									//var newtime2 = 2000;
									//paramDict.time1 = newtime1;
									//paramDict.time2 = newtime2;
									//paramDict.begindate = newBeginDate;
									paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 11, message: "invalid dates"};
										assert.deepEqual(changeDateResponse, expected);
										done();

									});

								});
							});
						});
					});
				});
			});
		});
	});


describe('Event.changeDateTime invalid new dates', function()
	{
		it('should return errCode:11', function(done)
		{
		    var eventDict = {};
		    eventDict.name = 'jogging';
		    eventDict.description = 'go for a run with some friends!';
		    eventDict.category = 'Sports';
		    eventDict.time1 = undefined;
		    eventDict.time2 = undefined;
		    eventDict.flag = 'anyTime';
		    eventDict.begindate = undefined;
		    eventDict.enddate = undefined;
		    eventDict.lowprice = '0';
		    eventDict.highprice = '0';
		    eventDict.lownumparticipants = '1';
		    eventDict.highnumparticipants = undefined;
		    eventDict.latitude = undefined;
		    eventDict.longitude = undefined;
		    eventDict.duration = '2';

		    Activity.add(eventDict, function(err, response)
		    {
		    	var user = User.create({username: 'foo',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'kfreedland@berkeley.edu'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					User.first({username: 'foo'}, function(err, userRecord)
					{

						Activity.first({name: 'jogging'}, function(err, activityRecord)
						{
							var d = new Date();
							eventData.name ="jogging with friends";
							eventData.activityid = activityRecord.id;
							eventData.time1 = 500;
							eventData.time2 = 1000;
							eventData.startdate = d.getTime();
							eventData.enddate = d.getTime() + 50000;
							eventData.description = 'my Event';
							eventData.attendingusers = userRecord.email;

							Event.add(eventData, function(eventAddResponse)
							{


								// now that event has been added, we can change the date/time

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									var time = d.getTime();
									var newBeginDate = time;
									var newEndDate = time - 100;
									//var newtime1 = 1200;
									//var newtime2 = 2000;
									//paramDict.time1 = newtime1;
									//paramDict.time2 = newtime2;
									paramDict.begindate = newBeginDate;
									paramDict.enddate = newEndDate;
									paramDict.eventid = eventRecord.id;

									//CHANGE DATE/TIME!
									Event.changeDateTime(paramDict, function(changeDateResponse){

										var expected = {errCode: 11, message: "invalid dates"};
										assert.deepEqual(changeDateResponse, expected);
										done();

									});

								});
							});
						});
					});
				});
			});
		});
	});





});









