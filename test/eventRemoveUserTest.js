var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity
  , Event = geddy.model.Event
  , Comment = geddy.model.Comment;


var resetFixture = function (done){
    Activity.TESTAPI_resetFixture(function(){
        User.TESTAPI_resetFixture(function() {
            done();
        });
    });
};

describe('Comment', function()
{
    beforeEach(function(done) 
    {
        //Erase database
        resetFixture(done);
    });

  describe('Event.removeUser normal', function()
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
                            eventData.name ="Jogging with friends!";
                            eventData.activityid = activityRecord.id;
                            eventData.time1 = 500;
                            eventData.time2 = 1000;
                            eventData.begindate = d.getTime();
                            eventData.enddate = d.getTime() + 50000;
                            eventData.description = 'my Event';
                            eventData.attendingusers = user.username;
                            eventData.noemail = true;
                            eventData.inviterId = userRecord.id;
                            Event.add(eventData, function(respDict)
                            {
                                var user1 = User.create({username: 'blahbyblah',
                                password: 'MyPassword!',
                                confirmPassword: 'MyPassword!',
                                familyName: 'LastName1',
                                givenName: 'FirstName1',
                                email: 'greg@greg.com'});
                                geddy.model.User.add(user1, function(aDict)
                                {
                                    geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                    {
                                        geddy.model.User.first({username: user1.username}, function(err, userRecord1)
                                        {
                                            geddy.model.Event.addUsersToEvent(eventRecord.id, userRecord1.username, function (answerDict)
                                            {

                                                geddy.model.Event.removeUser(eventRecord.id, userRecord1.id, function(removeResponse){

                                                    assert.deepEqual(removeResponse, {errCode: 1});
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