var assert = require("assert")
  , User = geddy.model.User
  , Event = geddy.model.Event
  , Activity = geddy.model.Activity;

var resetFixture = function (done)
{
	Event.TESTAPI_resetFixture(function()
	{
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

	describe('Event.add missing params', function()
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

		    Activity.add(eventDict, function(response)
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
					var expected = {errCode: 6};
					Event.add(eventData, function (resp)
					{
						assert.deepEqual(resp, expected);
						var d = new Date();
						var begindate = d.getTime();
						var enddate = d.getTime()+500;
						eventData.begindate = begindate;
						eventData.enddate = enddate;

						Event.add(eventData, function (resp1)
						{
							assert.deepEqual(resp, expected);
							done();
						});
					});
				});

		    });
		});
	});

	describe('Event.add valid', function()
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
					User.first({username: 'Greg'}, function(err, userRecord)
					{
						var uId = userRecord.id;

						Activity.first({name: 'jogging'}, function(err, activityRecord)
							{
								var aId = activityRecord.id;
								var d = new Date();
								eventData.name ="magical orgy";
								eventData.time1 = 500;
								eventData.time2 = 1000;
								eventData.startdate = d.getTime();
								eventData.enddate = d.getTime() + 50000;
								eventData.description = 'my Event';
								eventData.myAct

								Event.add(eventData, function(respDict)
								{
									assert.deepEqual(respDict, expected);
									done();
								});
							});
					});
				});
			});
		});
	});
});