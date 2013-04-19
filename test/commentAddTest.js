var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity
  , Event = geddy.model.Event
  , Comment = geddy.model.Comment;


var resetFixture = function (done){
    Activity.TESTAPI_resetFixture(function(){
        Event.TESTAPI_resetFixture(function() {
            User.TESTAPI_resetFixture(function() {
                Comment.TESTAPI_resetFixture(function() {
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
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                	geddy.model.Comment.addComment(eventRecord.id, userRecord.id, "sample comment", function(addCommentResponse){

                                		assert.deepEqual(addCommentResponse, {errCode: 1});
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


  describe('Comment.addComment - 2 normal comments', function()
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
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                    geddy.model.Comment.addComment(eventRecord.id, userRecord.id, "comment1", function(addCommentResponse){

                                        geddy.model.Comment.addComment(eventRecord.id, userRecord.id, "comment2", function(addComment2Response){

                                            assert.deepEqual(addComment2Response, {errCode: 1});
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



  describe('Comment.addComment - null eventID', function()
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

                            Event.add(eventData, function(respDict)
                            {
                                
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                	//var eventid = eventRecord.id;
                                	var eventid = null;
                                	var userid = userRecord.id;
                                	var commentText = "sample comment";
                  
                                	geddy.model.Comment.addComment(eventid, userid, commentText, function(addCommentResponse){


                                		assert.deepEqual(addCommentResponse, {errCode: 6});
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

	
  describe('Comment.addComment - undefined eventID', function()
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

                            Event.add(eventData, function(respDict)
                            {
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                	//var eventid = eventRecord.id;
                                	var eventid = null;
                                	var userid = userRecord.id;
                                	var commentText = "sample comment";
                  
                                	geddy.model.Comment.addComment(eventid, userid, commentText, function(addCommentResponse){


                                		assert.deepEqual(addCommentResponse, {errCode: 6});
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


  describe('Comment.addComment - null userid', function()
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

                            Event.add(eventData, function(respDict)
                            {
                                
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                    var eventid = eventRecord.id;
                                    //var userid = userRecord.id;
                                    var userid = null;
                                    var commentText = "sample comment";
                  
                                    geddy.model.Comment.addComment(eventid, userid, commentText, function(addCommentResponse){


                                        assert.deepEqual(addCommentResponse, {errCode: 6});
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


  describe('Comment.addComment - undefined userid', function()
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

                            Event.add(eventData, function(respDict)
                            {
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                    var eventid = eventRecord.id;
                                    //var eventid = null;
                                    //var userid = userRecord.id;
                                    var userid = undefined;
                                    var commentText = "sample comment";
                  
                                    geddy.model.Comment.addComment(eventid, userid, commentText, function(addCommentResponse){


                                        assert.deepEqual(addCommentResponse, {errCode: 6});
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


  describe('Comment.addComment - null text ', function()
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

                            Event.add(eventData, function(respDict)
                            {
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                    var eventid = eventRecord.id;
                                    //var eventid = null;
                                    var userid = userRecord.id;
                                    //var commentText = "sample comment";
                                    var commentText = null;
                  
                                    geddy.model.Comment.addComment(eventid, userid, commentText, function(addCommentResponse){


                                        assert.deepEqual(addCommentResponse, {errCode: 6});
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



  describe('Comment.addComment - empty string text ', function()
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

                            Event.add(eventData, function(respDict)
                            {
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                    var eventid = eventRecord.id;
                                    //var eventid = null;
                                    var userid = userRecord.id;
                                    //var commentText = "sample comment";
                                    var commentText = '';
                  
                                    geddy.model.Comment.addComment(eventid, userid, commentText, function(addCommentResponse){


                                        assert.deepEqual(addCommentResponse, {errCode: 6});
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


  describe('Comment.addComment - invalid eventID', function()
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

                            Event.add(eventData, function(respDict)
                            {
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                    var eventid = eventRecord.id + "invalid";
                                    var userid = userRecord.id;
                                    var commentText = "sample comment";
                  
                                    geddy.model.Comment.addComment(eventid, userid, commentText, function(addCommentResponse){


                                        assert.deepEqual(addCommentResponse, {errCode: 10});
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


  describe('Comment.addComment - invalid userid', function()
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

                            Event.add(eventData, function(respDict)
                            {
                                geddy.model.Event.first({name: eventData.name}, function(err, eventRecord)
                                {
                                    var eventid = eventRecord.id;
                                    var userid = userRecord.id + "invalid";
                                    var commentText = "sample comment";
                  
                                    geddy.model.Comment.addComment(eventid, userid, commentText, function(addCommentResponse){


                                        assert.deepEqual(addCommentResponse, {errCode: 10});
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
