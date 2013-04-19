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
                            email: 'Greg@theGracken.com'});
                User.add(user, function (answerDict) 
                {
                    User.first({username: 'Greg'}, function (err, userRecord)
                    {
                        var uId = userRecord.id;
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
                            eventData.inviterId = uId;

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
    });

    describe('Event.add valid - this tests invite through add as well', function()
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
                            email: 'greg@greg.com'});
                User.add(user, function (answerDict) 
                {
                    var eventData = {};
                    var expected = {errCode: 1};
                    User.first({username: 'foo'}, function(err, userRecord)
                    {
                        var uId = userRecord.id;

                        Activity.first({name: 'jogging'}, function(err, activityRecord)
                        {
                            var d = new Date();
                            eventData.name ="magical orgy";
                            eventData.activityid = activityRecord.id;
                            eventData.time1 = 500;
                            eventData.time2 = 1000;
                            eventData.begindate = d.getTime();
                            eventData.enddate = d.getTime() + 50000;
                            eventData.description = 'my Event';
                            eventData.inviterId = userRecord.id;
                            eventData.attendingusers = '';

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
    
    describe('Event.addUsersToEvent valid', function()
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
                            email: 'greg@greg.com'});
                User.add(user, function (answerDict) 
                {
                    var eventData = {};
                    var expected = {errCode: 1};
                    User.first({username: 'foo'}, function(err, userRecord)
                    {

                        Activity.first({name: 'jogging'}, function(err, activityRecord)
                        {
                            var d = new Date();
                            eventData.name ="magical orgy";
                            eventData.activityid = activityRecord.id;
                            eventData.time1 = 500;
                            eventData.time2 = 1000;
                            eventData.begindate = d.getTime();
                            eventData.enddate = d.getTime() + 50000;
                            eventData.description = 'my Event';
                            // eventData.attendingusers = '';
                            eventData.noemail = true;
                            eventData.inviterId = userRecord.id;

                            Event.add(eventData, function(respDict)
                            {
                                var user1 = User.create({username: 'blahbyblah',
                                password: 'MyPassword!',
                                confirmPassword: 'MyPassword!',
                                familyName: 'LastName1',
                                givenName: 'FirstName1',
                                email: 'greg2@greg.com'});
                                geddy.model.User.add(user1, function(aDict)
                                {
                                    geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                    {
                                        geddy.model.User.first({username: user1.username}, function(err, userRecord1)
                                        {
                                            geddy.model.Event.addUsersToEvent(eventRecord.id, userRecord1.username, function (answerDict)
                                            {
                                                assert.deepEqual(answerDict, {errCode: 1});
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
    });

    describe('Event.add registered', function()
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
                            email: 'greg@greg.com'});
                User.add(user, function (answerDict) 
                {
                    var eventData = {};
                    var expected = {errCode: 1};
                    User.first({username: 'foo'}, function(err, userRecord)
                    {
                        var uId = userRecord.id;

                        Activity.first({name: 'jogging'}, function(err, activityRecord)
                        {
                            var d = new Date();
                            eventData.name ="magical orgy";
                            eventData.activityid = activityRecord.id;
                            eventData.time1 = 500;
                            eventData.time2 = 1000;
                            eventData.begindate = d.getTime();
                            eventData.enddate = d.getTime() + 50000;
                            eventData.description = 'my Event';
                            eventData.attendingusers = '';
                            eventData.noemail = true;
                            eventData.inviterId = userRecord.id;

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

    describe('Event.add With email not in database', function()
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
                            email: 'greg@greg.com'});
                User.add(user, function (answerDict) 
                {
                    var eventData = {};
                    var expected = {errCode: 1};
                    User.first({username: 'foo'}, function(err, userRecord)
                    {
                        var uId = userRecord.id;

                        Activity.first({name: 'jogging'}, function(err, activityRecord)
                        {
                            var d = new Date();
                            eventData.name ="magical orgy";
                            eventData.activityid = activityRecord.id;
                            eventData.time1 = 500;
                            eventData.time2 = 1000;
                            eventData.begindate = d.getTime();
                            eventData.enddate = d.getTime() + 50000;
                            eventData.description = 'my Event';
                            eventData.attendingusers = 'grrrrrr@hohoh.com';
                            eventData.noemail = true;
                            eventData.inviterId = userRecord.id;

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

    describe('Event.add event with 3 attending users', function()
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
                            email: 'greg@greg.com'});
                User.add(user, function (answerDict) 
                {
                    var user2 = User.create({username: 'foo2',
                            password: 'MyPassword!',
                            confirmPassword: 'MyPassword!',
                            familyName: 'LastName1',
                            givenName: 'FirstName1',
                            email: 'greg2@greg.com'});
                    User.add(user2, function (answerDict2) 
                    {
                        var user3 = User.create({username: 'Bob',
                            password: 'MyPassword!',
                            confirmPassword: 'MyPassword!',
                            familyName: 'LastName1',
                            givenName: 'FirstName1',
                            email: 'bob@bob.com'});
                        User.add(user3, function (answerDict3) 
                        {
                            var eventData = {};
                            var expected = {errCode: 1};
                            User.first({username: 'foo'}, function(err, userRecord)
                            {
                                var uId = userRecord.id;

                                Activity.first({name: 'jogging'}, function(err, activityRecord)
                                {
                                    var d = new Date();
                                    eventData.name ="magical orgy";
                                    eventData.activityid = activityRecord.id;
                                    eventData.time1 = 500;
                                    eventData.time2 = 1000;
                                    eventData.begindate = d.getTime();
                                    eventData.enddate = d.getTime() + 50000;
                                    eventData.description = 'my Event';
                                    eventData.attendingusers = 'foo2, bob@bob.com';
                                    eventData.noemail = true;
                                    eventData.inviterId = userRecord.id;

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
    });

    describe('Event.add invalid start/eventDictdate', function()
    {
        it('should return errCode:8', function(done)
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
                    var expected = {errCode: 8};
                    User.first({username: 'foo'}, function(err, userRecord)
                    {
                        var uId = userRecord.id;

                        Activity.first({name: 'jogging'}, function(err, activityRecord)
                        {
                            var d = new Date();
                            eventData.name ="magical orgy";
                            eventData.activityid = activityRecord.id;
                            eventData.time1 = 1000;
                            eventData.time2 = 500;
                            eventData.begindate = d.getTime() + 50000;
                            eventData.enddate = d.getTime();
                            eventData.description = 'my Event';
                            eventData.attendingusers = '';
                            eventData.noemail = true;
                            eventData.inviterId = userRecord.id;

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

    describe('Event.add not a recordid', function()
    {
        it('should return errCode:9', function(done)
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
                    var expected = {errCode: 9};
                    User.first({username: 'foo'}, function(err, userRecord)
                    {
                        var uId = userRecord.id;

                        Activity.first({name: 'jogging'}, function(err, activityRecord)
                        {
                            var d = new Date();
                            eventData.name ="magical orgy";
                            eventData.activityid = 'prettysurethisisntvalid';
                            eventData.time1 = 500;
                            eventData.time2 = 1000;
                            eventData.begindate = d.getTime();
                            eventData.enddate = d.getTime() + 50000;
                            eventData.description = 'my Event';
                            eventData.attendingusers = '';
                            eventData.noemail = true;
                            eventData.inviterId = userRecord.id;

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