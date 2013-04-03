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


describe('Event.invite valid emails', function()
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


								// now that event has been added, we can get the event id and invite people

								Event.first({name: "jogging with friends"}, function(err, eventRecord)
								{

									paramDict = {};
									paramDict.eventid = eventRecord.id;
									paramDict.message = "you are invited to go jogging with friends!";
									paramDict.emails = ["tlangner1@gmail.com"];


									//INVITE
									Event.invite(paramDict, function(eventInviteResponse)
									{
										var expected = {errCode: 1};
										assert.deepEqual(eventInviteResponse, expected);
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
