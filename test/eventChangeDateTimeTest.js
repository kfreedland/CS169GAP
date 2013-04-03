var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity
  , Event = geddy.model.Event;

var resetFixture = function (done){
	Activity.TESTAPI_resetFixture(function(){
		done();
	});
};

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