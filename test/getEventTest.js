var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity
  , Event = geddy.model.Event;


var resetFixture = function (done)
{
    Activity.TESTAPI_resetFixture(function() {
        Event.TESTAPI_resetFixture(function()
        {
            User.TESTAPI_resetFixture(function(response){
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

    describe('Event.getEvent with invalid eventId', function()
    {
        it('should return response with length=0', function(done)
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
                    User.first({username: 'Greg'}, function (err, userRecord){
                        //Never add the event so we shouldn't have any now
                        Event.getEvent({eventId: 'not_real_id', userId: userRecord.id}, function (resp1)
                        {
                            assert.equal(resp1.errCode, 1);
                            assert.deepEqual(resp1.event, {});
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Event.getMyEvents 1 Event', function()
    {
        it('should return response with length=1', function(done)
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
                            eventData.attendingusers = userRecord.username;
                            eventData.noemail = true;

                            eventData.inviterId = userRecord.id;
                            Event.add(eventData, function(respDict)
                            {
                                assert.deepEqual(respDict, expected);
                                Event.first({name: eventData.name}, function (err, eventModel) {
                                    var d = new Date();
                                    var begindate = d.getTime();
                                    var enddate = d.getTime()+500;
                                    eventData.begindate = begindate;
                                    eventData.enddate = enddate;

                                    Event.getEvent({eventId: eventModel.id, userId: userRecord.id}, function (resp1)
                                    {
                                        assert.equal(resp1.errCode, 1);
                                        //Check if first item equals the event we added
                                        assert.equal(resp1.event.id, eventModel.id);
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