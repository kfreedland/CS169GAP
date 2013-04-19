var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity
  , Event = geddy.model.Event
  , Comment = geddy.model.Comment;


var resetFixture = function (done){
    Activity.TESTAPI_resetFixture(function(){
        Event.TESTAPI_resetFixture(function() {
            Comment.TESTAPI_resetFixture(function() {
                User.TESTAPI_resetFixture(function() {
                    done();
                });
            });
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

  describe('Comment.getComment - add and get 1 comment from 1 event', function()
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
                            geddy.model.Event.add(eventData, function(respDict)
                            {
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                    geddy.model.Comment.addComment(eventRecord.id, userRecord.id, "sample comment", function (addCommentResponse){

                                        // console.log("about to get comments with addCommentResponse ");
                                        // console.dir(addCommentResponse);
                                        geddy.model.Comment.getCommentsForEvent(eventRecord.id, function (getCommentsResponse){

                                            assert.deepEqual(getCommentsResponse.errCode, 1);
                                            assert.deepEqual(getCommentsResponse.comments[0].text, "sample comment");
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

describe('Comment.getComment - add and get 2 comment from 1 event', function()
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
                            geddy.model.Event.add(eventData, function(respDict)
                            {
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                    geddy.model.Comment.addComment(eventRecord.id, userRecord.id, "sample comment", function (addCommentResponse){

                                        geddy.model.Comment.addComment(eventRecord.id,userRecord.id, "another comment", function(addComment2Response){

                                            geddy.model.Comment.getCommentsForEvent(eventRecord.id, function (getCommentsResponse){

                                                assert.deepEqual(getCommentsResponse.errCode, 1);
                                                assert.deepEqual(getCommentsResponse.comments[0].text, "sample comment");
                                                assert.deepEqual(getCommentsResponse.comments[1].text, "another comment");
                                                assert.deepEqual(getCommentsResponse.comments[0].userid, uId);
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


  describe('Comment.getComment - invalid eventid', function()
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
                            geddy.model.Event.add(eventData, function(respDict)
                            {
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                    geddy.model.Comment.addComment(eventRecord.id, userRecord.id, "sample comment", function (addCommentResponse){

                                        // console.log("about to get comments with addCommentResponse ");
                                        // console.dir(addCommentResponse);


                                        var parameventid = eventRecord.id + "invalid";

                                        geddy.model.Comment.getCommentsForEvent(parameventid, function (getCommentsResponse){

                                            assert.deepEqual(getCommentsResponse.errCode, 10);
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


  describe('Comment.getComment - no comments', function()
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
                            geddy.model.Event.add(eventData, function(respDict)
                            {
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {

                                    geddy.model.Comment.getCommentsForEvent(eventRecord.id, function (getCommentsResponse){

                                        assert.deepEqual(getCommentsResponse.errCode, 1);
                                        assert.deepEqual(getCommentsResponse.comments.length, 0);
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