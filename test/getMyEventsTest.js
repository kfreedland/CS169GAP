var assert = require("assert")
  , User = geddy.model.User
  , Event = geddy.model.Event;

var resetFixture = function (done)
{
	Event.TESTAPI_resetFixture(function()
	{
		done();
	});
};

// <li>'name': [string]<li>
// <li>'description': [string]</li>
// <li>'time1': [int milliseconds since midnight</li>
// <li>'time2': [int, milliseconds since midnight</li>
// <li>'begindate': [milliseconds since epoch, int],</li>
// <li>'enddate': [milliseconds since epoch, int],</li>
// <li>'attendingusers': [CSV string of user ids],</li>
// <li>'activity':[activity recordID corresponding to this event]</li>

describe('Event', function()
{
	beforeEach(function(done) 
	{
		//Erase database
		resetFixture(done);
	});

	describe('Event.getMyEvents 0 Events', function()
	{
		it('should return response with count=0', function(done)
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
		    	var user = User.create({username: 'Greg',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'Greg@greg.com'});
				User.add(user, function (answerDict) 
				{	
					//Never add the event so we shouldn't have any now
					Event.getMyEvents(function (resp1)
					{
						assert.equal(resp1.count, 0);
						done();
					});
				});

		    });
		});
	}

	describe('Event.getMyEvents 1 Event', function()
	{
		it('should return response with count=1', function(done)
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
		    	var user = User.create({username: 'Greg',
		                    password: 'MyPassword!',
		                    confirmPassword: 'MyPassword!',
		                    familyName: 'LastName1',
		                    givenName: 'FirstName1',
		                    email: 'Greg@greg.com'});
				User.add(user, function (answerDict) 
				{
					var eventData = {};
					var expected = {errCode: 1};

					eventData.name = activityDict.name;
					eventData.description = activityDict.description;
					eventData.attendingusers = "Greg";
					eventData.activity = response.id;
					
					Event.add(eventData, function (resp)
					{
						assert.deepEqual(resp, expected);
						var d = new Date();
						var begindate = d.getTime();
						var enddate = d.getTime()+500;
						eventData.begindate = begindate;
						eventData.enddate = enddate;

						Event.getMyEvents(function (resp1)
						{
							//Make sure we get 1 event back
							assert.equal(resp1.count, 1);
							//Check if first item equals the event we added
							assert.deepEqual(resp1[0], resp);
							done();
						});
					});
				});

		    });
		});
	});

	describe('Event.getMyEvents 2 Event', function()
	{
		it('should return response with count=2', function(done)
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

		    Activity.add(activityDict, function(activityResp1)
		    {
		    	var activityDict2 = {};
			    activityDict2.name = 'backstreet boys concert';
			    activityDict2.description = 'I want it that way...';
			    activityDict2.category = 'Entertainment';
			    //7pm in milliseconds since midnight
			    var sevenPM = 1000 * 60 * 60 * 19;
			    activityDict2.time1 = sevenPM;
			    //10pm in milliseconds senice midnight
			    var tenPM = 1000 * 60 * 60 * 22;
			    activityDict2.time2 = tenPM;
			    activityDict2.flag = 'startEnd';
			    //date is june 15th 2013
			    var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
			    var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
			    activityDict2.begindate = date1.getTime();
			    activityDict2.enddate = date2.getTime();
			    activityDict2.lowprice = '25';
			    activityDict2.highprice = '200';
			    activityDict2.lownumparticipants = '1';
			    activityDict2.highnumparticipants = '10';
			    //oracle arena
			    activityDict2.latitude = '37.751';
			    activityDict2.longitude = '-122.200';
			    activityDict2.duration = '3';

			    Activity.add(activityDict2, function(activityResp2)
			    {
			    	var user = User.create({username: 'Greg',
			                    password: 'MyPassword!',
			                    confirmPassword: 'MyPassword!',
			                    familyName: 'LastName1',
			                    givenName: 'FirstName1',
			                    email: 'Greg@greg.com'});
					User.add(user, function (answerDict) 
					{
						var eventData = {};
						var expected = {errCode: 1};

						eventData.name = activityDict.name;
						eventData.description = activityDict.description;
						eventData.attendingusers = "Greg";
						eventData.activity = response.id;
						
						Event.add(eventData, function (resp)
						{
							assert.deepEqual(resp, expected);
							var d = new Date();
							var begindate = d.getTime();
							var enddate = d.getTime()+500;
							eventData.begindate = begindate;
							eventData.enddate = enddate;

							Event.getMyEvents(function (resp1)
							{
								//Make sure we get 1 event back
								assert.equal(resp1.count, 1);
								//Check if first item equals the event we added
								assert.deepEqual(resp1[0], resp);
								done();
							});
						});
					});
				});
		    });
		});
	});
});