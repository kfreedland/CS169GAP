var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity
  , Actions = require("../app/helpers/passport/actions.js");

//This is used in Auth stub defined within the login tests
var session = {};
session.get = function(name){
    return session.name;
};
session.set = function(name, value){
    session.name = value;
};

var resetFixture = function (done){
    Activity.TESTAPI_resetFixture(function() {
        User.TESTAPI_resetFixture(function(response){
            done();
        });
    });
};

describe('User', function(){
    beforeEach(function(done) {
        //Erase database
        // console.log("Running resetFixture");
        resetFixture(done);
    });

    describe('User.add one', function(){
        it('should return errCode:1', function(done){
            var user = User.create({username: 'Greg',
                            password: 'MyPassword!',
                            confirmPassword: 'MyPassword!',
                            familyName: 'LastName1',
                            givenName: 'FirstName1',
                            email: 'Greg@greg.com'});
            User.add(user, function (answerDict) {
                // console.log("Done adding user with errCode:" + answerDict.errCode);
                assert.deepEqual(answerDict, {'errCode': 1});
                done();
            });
        });
    });

    describe('User.add same', function() {
        it('should return errCode:2', function(done) {
            var user = User.create({username: 'Bob',
                              password: 'MyPassword!',
                              confirmPassword: 'MyPassword!',
                              familyName: 'LastName2',
                              givenName: 'FirstName2',
                              email: 'Bob@bob.com'});
            User.add(user, function (answerDict1) {
                User.add(user, function (answerDict) {
                    assert.deepEqual(answerDict, {'errCode': 2});
                    done();
                });
            });
        });
    });

    describe('User.add different', function() {
        it('should return errCode:1', function(done) {
            var user1 = User.create({username: 'Greg191',
                              password: 'MyPassword!191',
                              confirmPassword: 'MyPassword!191',
                              familyName: 'LastName191',
                              givenName: 'FirstName191',
                              email: 'Greg191@greg.com'});
            var user2 = User.create({username: 'Greg192',
                              password: 'MyPassword!192',
                              confirmPassword: 'MyPassword!192',
                              familyName: 'LastName192',
                              givenName: 'FirstName192',
                              email: 'Greg192@greg.com'});
            User.add(user1, function (answerDict1) {
                User.add(user2, function (answerDict) {
                    assert.deepEqual(answerDict, {'errCode': 1});
                    done();
                });
            });
        });
    });

    describe('Get all usernames', function() {
        it('should return all usernames', function(done) {
            var user1 = User.create({username: 'Greg191',
                              password: 'MyPassword!191',
                              confirmPassword: 'MyPassword!191',
                              familyName: 'LastName191',
                              givenName: 'FirstName191',
                              email: 'Greg191@greg.com'});
            var user2 = User.create({username: 'Greg192',
                              password: 'MyPassword!192',
                              confirmPassword: 'MyPassword!192',
                              familyName: 'LastName192',
                              givenName: 'FirstName192',
                              email: 'Greg192@greg.com'});
            User.add(user1, function (answerDict) 
            {
                User.add(user2, function (answerDict) 
                {
                    User.getUsernames(function(response)
                    {
                        correct = [user1.username, user2.username];
                        assert.deepEqual(correct, response);
                        done();
                    });
                });
            });
        });
    });
  
    describe('User.add empty username', function() {
        it('should return errCode:3', function(done) {
            var user = User.create({username: '',
                              password: 'MyPassword!',
                              confirmPassword: 'MyPassword!',
                              familyName: 'LastName4',
                              givenName: 'FirstName4',
                              email: 'Greg4@greg.com'});
            User.add(user, function (answerDict) {
                assert.deepEqual(answerDict, {'errCode': 3});
                done();
            });
        });
    });
  
    describe('User.add null username', function() {
        it('should return errCode:3', function(done) {
            var user = User.create({username: null,
                              password: 'MyPassword!',
                              confirmPassword: 'MyPassword!',
                              familyName: 'LastName5',
                              givenName: 'FirstName5',
                              email: 'Greg5@greg.com'});
            User.add(user, function (answerDict) {
                assert.deepEqual(answerDict, {'errCode': 3});
                done();
            });
        });
    });
  
    describe('User.add 129 username length', function() {
        it('should return errCode:3', function(done) {
            var user = User.create({username: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                              password: 'MyPassword!',
                              confirmPassword: 'MyPassword!',
                              familyName: 'LastName6',
                              givenName: 'FirstName6',
                              email: 'Greg6@greg.com'});
            User.add(user, function (answerDict) {
                assert.deepEqual(answerDict, {'errCode': 3});
                done();
            });
        });
    });
  
    describe('User.add empty password', function() {
        it('should return errCode:4', function(done) {
            var user = User.create({username: 'Greg7',
                              password: '',
                              confirmPassword: '',
                              familyName: 'LastName7',
                              givenName: 'FirstName7',
                              email: 'Greg7@greg.com'});
            User.add(user, function (answerDict) {
                assert.deepEqual(answerDict, {"errCode": 4});
                done();
            });
        });
    });
 
     describe('User.add null password', function() {
         it('should return errCode:4', function(done) {
             var user = User.create({username: 'Greg8',
                              password: null,
                              confirmPassword: null,
                              familyName: 'LastName8',
                              givenName: 'FirstName8',
                              email: 'Greg8@greg.com'});
            User.add(user, function (answerDict) {
                assert.deepEqual(answerDict, {"errCode": 4});
                done();
            });
         });
     });

     describe('User.add 129 password length', function() {
         it('should return errCode:4', function(done) {
             var user = User.create({username: 'Greg9',
                              password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                              confirmPassword: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                              familyName: 'LastName9',
                              givenName: 'FirstName9',
                              email: 'Greg9@greg.com'});
            User.add(user, function (answerDict) {
                assert.deepEqual(answerDict, {"errCode": 4});
                done();
            });
         });
     });
  
     describe('User.login bad Credentials', function() {
         it('should return errCode:5', function(done) {
             var user = User.create({username: 'Greg23524',
                              password: '2342234812093',
                              confirmPassword: '2342234812093',
                              familyName: 'LastName11',
                              givenName: 'FirstName11',
                              email: 'Greg11@greg.com'});
             User.add(user, function (answerDict) {
                 //Login
                var req = {};
                var params = {
                    username: 'test',
                    password: 'woot'
                };
                //This is a stub for the Auth controller
                var Auth = geddy.mixin(
                        {
                            redirect: function(url){
                                assert.equal(url, "/login?errCode=5");
                                done();
                            },
                            session: session
                        },
                        Actions);
                Auth.local(req, null, params, function(err, success){

                });
            });
         });
     });

    describe('User.login valid Credentials', function() {
         it('should return errCode:1', function(done) {
             var user = User.create({username: 'elayman',
                              password: '12345678',
                              confirmPassword: '12345678',
                              familyName: 'LastName11',
                              givenName: 'FirstName11',
                              email: 'Greg11@greg.com'});
             User.add(user, function (answerDict) {
                 //Login
                var req = {};
                var params = {
                    username: 'elayman',
                    password: '12345678'
                };
                //This is a stub for the Auth controller
                var Auth = geddy.mixin(
                        {
                            redirect: function(url){
                                assert.equal(url, "/?errCode=1");
                                done();
                            },
                            session: session
                        },
                        Actions);
                Auth.local(req, null, params, function(err, success){

                });
            });
         });
     });

});