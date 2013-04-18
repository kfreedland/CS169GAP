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

  describe('Comment.addComment normal - adds user to event first', function()
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
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                    geddy.model.Comment.addComment(eventRecord.id, userRecord.id, "sample comment", function(addCommentResponse){


                                        geddy.model.Comment.getCommentsForEvent(eventRecord.id, function(getCommentsResponse){

                                            assert.deepEqual(addCommentResponse.errCode, 1);
                                            assert.deepEqual(addCommentResponse.comments[0].text, "sample comment");
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