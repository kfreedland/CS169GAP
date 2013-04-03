var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity
  , Event = geddy.model.Event;


var resetFixture = function (done)
{
    Event.TESTAPI_resetFixture(function()
    {
        User.TESTAPI_resetFixture(function(response){
            done();
        });
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
                    User.first({username: 'Greg'}, function (err, userModel){
                        //Never add the event so we shouldn't have any now
                        Event.getMyEvents({userId: userModel.id}, function (resp1)
                        {
                            assert.equal(resp1.errCode, 1);
                            assert.equal(resp1.events.length, 0);
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
                            eventData.attendingusers = userRecord.id;

                            Event.add(eventData, function(respDict)
                            {
                                assert.deepEqual(respDict, expected);
                                Event.first({name: eventData.name}, function (err, eventModel) {
                                    var d = new Date();
                                    var begindate = d.getTime();
                                    var enddate = d.getTime()+500;
                                    eventData.begindate = begindate;
                                    eventData.enddate = enddate;

                                    Event.getMyEvents({userId: userRecord.id}, function (resp1)
                                    {
                                        assert.equal(resp1.errCode, 1);
                                        //Make sure we get 1 event back
                                        assert.equal(resp1.events.length, 1);
                                        //Check if first item equals the event we added
                                        assert.deepEqual(resp1.events[0].id, eventModel.id);
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

    describe('Event.getMyEvents 2 Event', function()
    {
        it('should return response with length=2', function(done)
        {
            var user = User.create({username: 'Greg',
                                    password: 'MyPasswordYO',
                                    confirmPassword: 'MyPasswordYO',
                                    familyName: 'LastName1',
                                    givenName: 'FirstName1',
                                    email: 'Greg@greg.com'});
            User.add(user, function (answerDict) 
            {
                User.first({username: 'Greg'}, function (err, userRecord)
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
                        Activity.first({name: 'jogging'}, function (err, model1) {

                            var eventData = {};
                            var expected = {errCode: 1};

                            var d = new Date();
                            eventData.name = 'datName';
                            eventData.activityid = model1.id;
                            eventData.time1 = 500;
                            eventData.time2 = 1000;
                            eventData.begindate = d.getTime();
                            eventData.enddate = d.getTime() + 50000;
                            eventData.description = activityDict.description;
                            eventData.attendingusers = userRecord.id;
                            
                            Event.add(eventData, function (eventResp1)
                            {
                                assert.deepEqual(eventResp1, expected);

                                Event.first({name: eventData.name}, function (err, eventModel1) {
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

                                    Activity.add(activityDict2, function(response)
                                    {
                                        Activity.first({name: 'backstreet boys concert'}, function (err, model2) {
                                            var eventData2 = {};
                                            var expected2 = {errCode: 1};

                                            var d2 = new Date();
                                            eventData2.name = 'name2';
                                            eventData2.activityid = model2.id;
                                            eventData2.time1 = 500;
                                            eventData2.time2 = 1000;
                                            eventData2.begindate = d2.getTime();
                                            eventData2.enddate = d2.getTime() + 50000;
                                            eventData2.description = activityDict2.description;
                                            eventData2.attendingusers = userRecord.id;
                                            
                                            Event.add(eventData2, function (eventResp2)
                                            {
                                                assert.deepEqual(eventResp2, expected);

                                                Event.first({name: eventData2.name}, function (err, eventModel2) {
                                                    Event.getMyEvents({userId: userRecord.id}, function (resp1)
                                                    {
                                                        assert.equal(resp1.errCode, 1);
                                                        //Make sure we get 1 event back
                                                        assert.equal(resp1.events.length, 2);
                                                        //Check if first item equals the event we added
                                                        assert.deepEqual(resp1.events[0].id, eventModel1.id);
                                                        assert.deepEqual(resp1.events[1].id, eventModel2.id);
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
        });
    });
});