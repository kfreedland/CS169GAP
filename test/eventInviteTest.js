var assert = require("assert")
  , User = geddy.model.User
  , Event = geddy.model.Event
  , Activity = geddy.model.Activity;

var resetFixture = function (done){
    Activity.TESTAPI_resetFixture(function(){
        Event.TESTAPI_resetFixture(function() {
            User.TESTAPI_resetFixture(function() {
                done();
            });
        });
    });
};

describe('Event', function()
{
	beforeEach(function(done) 
	{
		//Erase database
		resetFixture(done);
	});


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
            eventDict.latitude = '37.87';
            eventDict.longitude = '-122.2705';
            eventDict.duration = '2';

            Activity.add(eventDict, function(err, response)
            {
                var user = User.create({username: 'foo',
                            password: 'MyPassword!',
                            confirmPassword: 'MyPassword!',
                            familyName: 'LastName1',
                            givenName: 'FirstName1',
                            email: 'elayman123@gmail.com'});
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
                            eventData.time1 = 39600000;
                            eventData.time2 = 43200000;
                            eventData.begindate = d.getTime();
                            eventData.enddate = d.getTime() + 86400000;
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
                                    paramDict.emails = ["fake@fake.com"];


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


describe('Event.invite valid and invalid emails', function()
    {
        it('should return errCode:12', function(done)
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
                            email: 'greg@greg.com'});
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
                            eventData.begindate = d.getTime();
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
                                    paramDict.emails = ["tlangner1@gmail.com", "tlangner@berkeley.edu", "badEmailAtGoogleMail", "badEmail@gmail"];


                                    //INVITE
                                    Event.invite(paramDict, function(eventInviteResponse)
                                    {
                                        var expected = {};
                                        expected.errCode = 12;
                                        expected.bademails = ["badEmailAtGoogleMail", "badEmail@gmail"];
                                        expected.message = "malformed emails";
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

describe('Event.invite empty email list', function()
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
                            email: 'greg@greg.com'});
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
                            eventData.begindate = d.getTime();
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
                                    paramDict.emails = [];


                                    //INVITE
                                    Event.invite(paramDict, function(eventInviteResponse)
                                    {
                                        var expected = {};
                                        expected.errCode = 6;
                                        expected.message = "null emails";
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

describe('Event.invite emails undefined', function()
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
                            email: 'greg@greg.com'});
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
                            eventData.begindate = d.getTime();
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
                                    //paramDict.emails = [];


                                    //INVITE
                                    Event.invite(paramDict, function(eventInviteResponse)
                                    {
                                        var expected = {};
                                        expected.errCode = 6;
                                        expected.message = "null emails";
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


describe('Event.invite null message', function()
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
                            email: 'greg@greg.com'});
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
                            eventData.begindate = d.getTime();
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
                                    //paramDict.message = "you are invited to go jogging with friends!";
                                    paramDict.emails = ["tlangner1@gmail.com"];


                                    //INVITE
                                    Event.invite(paramDict, function(eventInviteResponse)
                                    {
                                        var expected = {};
                                        expected.errCode = 6;
                                        expected.message = "null message";
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

describe('Event.invite invalid event id', function()
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
                            email: 'greg@greg.com'});
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
                            eventData.begindate = d.getTime();
                            eventData.enddate = d.getTime() + 50000;
                            eventData.description = 'my Event';
                            eventData.attendingusers = userRecord.email;

                            Event.add(eventData, function(eventAddResponse)
                            {


                                // now that event has been added, we can get the event id and invite people

                                Event.first({name: "jogging with friends"}, function(err, eventRecord)
                                {

                                    paramDict = {};
                                    paramDict.eventid = eventRecord.id + "invalid!!";
                                    paramDict.message = "you are invited to go jogging with friends!";
                                    paramDict.emails = ["tlangner1@gmail.com"];


                                    //INVITE
                                    Event.invite(paramDict, function(eventInviteResponse)
                                    {
                                        var expected = {};
                                        expected.errCode = 10;
                                        expected.message = "invalid eventid";
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


describe('Event.invite null eventid', function()
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
                            email: 'greg@greg.com'});
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
                            eventData.begindate = d.getTime();
                            eventData.enddate = d.getTime() + 50000;
                            eventData.description = 'my Event';
                            eventData.attendingusers = userRecord.email;

                            Event.add(eventData, function(eventAddResponse)
                            {


                                // now that event has been added, we can get the event id and invite people

                                Event.first({name: "jogging with friends"}, function(err, eventRecord)
                                {

                                    paramDict = {};
                                    //paramDict.eventid = eventRecord.id;
                                    paramDict.message = "you are invited to go jogging with friends!";
                                    paramDict.emails = ["tlangner1@gmail.com"];


                                    //INVITE
                                    Event.invite(paramDict, function(eventInviteResponse)
                                    {
                                        var expected = {};
                                        expected.errCode = 6;
                                        expected.message = "null eventid";
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

});











