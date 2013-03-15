var assert = require('assert')
  , tests
  , User = geddy.model.User;

tests = [
  //0 'Test Model Add'
  function (callback) {
    var user = User.create({username: 'Greg',
                            password: 'MyPassword!',
                            confirmPassword: 'MyPassword!',
                            familyName: 'LastName1',
                            givenName: 'FirstName1',
                            email: 'Greg@greg.com'});
    User.add(user, function (answerDict) {
      try{
        assert.deepEqual(answerDict, {'errCode': 1});
        callback(true);
      }catch (exc) {
        callback(false);
      }
    });
  },
  //1 'Test Model Add Same'
  function (callback) {
    var user = User.create({username: 'Bob',
                            password: 'MyPassword!',
                            confirmPassword: 'MyPassword!',
                            familyName: 'LastName2',
                            givenName: 'FirstName2',
                            email: 'Bob@bob.com'});
    User.add(user, function (answerDict) {
      console.log("add first same with errCode: " + answerDict.errCode);
      User.add(user, function (answerDict) {
        console.log("add second same with errCode: " + answerDict.errCode);
        try{
          assert.deepEqual(answerDict, {'errCode': 2});
          callback(true);
        }catch (exc){
          console.log("Test 1 exception: " + exc);
          callback(false);
        }
      });
    });
  },
  //2 'Test Model Add Different'
  function (callback) {
    var user2 = User.create({username: 'Greg2',
                            password: 'MyPassword!',
                            confirmPassword: 'MyPassword!',
                            familyName: 'LastName3',
                            givenName: 'FirstName3',
                            email: 'Greg2@greg.com'});
    User.add(user2, function (answerDict) {
      try{
        assert.deepEqual(answerDict, {'errCode': 1});
        callback(true);
      }catch (exc){
        console.log("Test 2 exception: " + exc);
        callback(false);
      }
    });
  },
  //3 'Test Model Add Empty Username'
  function (callback) {
    var user = User.create({username: '',
                            password: 'MyPassword!',
                            confirmPassword: 'MyPassword!',
                            familyName: 'LastName4',
                            givenName: 'FirstName4',
                            email: 'Greg4@greg.com'});
    User.add(user, function (answerDict) {
      try{
        assert.deepEqual(answerDict, {'errCode': 3});
        callback(true);
      }catch (exc){
        console.log("Test 3 exception: " + exc);
        callback(false);
      }
    });
  },
  //4 'Test Model Add Null Username'
  function (callback) {
    var user = User.create({username: null,
                            password: 'MyPassword!',
                            confirmPassword: 'MyPassword!',
                            familyName: 'LastName5',
                            givenName: 'FirstName5',
                            email: 'Greg5@greg.com'});
    User.add(user, function (answerDict) {
      console.log("added null username and returned answerDict");
      try{
        assert.deepEqual(answerDict, {'errCode': 3});
        callback(true);
      }catch (exc){
        console.log("Test 4 exception: " + exc);
        callback(false);
      }
    });
  },
  //5 'Test Model Add 129 Username'
  function (callback) {
    var user = User.create({username: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                            password: 'MyPassword!',
                            confirmPassword: 'MyPassword!',
                            familyName: 'LastName6',
                            givenName: 'FirstName6',
                            email: 'Greg6@greg.com'});
    User.add(user, function (answerDict) {
      try{
        assert.deepEqual(answerDict, {'errCode': 3});
        callback(true);
      }catch (exc){
        console.log("Test 5 exception: " + exc);
        callback(false);
      }
    });
  },
  //6 'Test Model Add Empty Password'
  function (callback) {
    var user = User.create({username: 'Greg7',
                            password: '',
                            confirmPassword: '',
                            familyName: 'LastName7',
                            givenName: 'FirstName7',
                            email: 'Greg7@greg.com'});
    User.add(user, function (answerDict) {
      try{
        assert.deepEqual(answerDict, {"errCode": 4});
        callback(true);
      }catch (exc){
        console.log("Test 6 exception: " + exc);
        callback(false);
      }
    });
  },
  //7 'Test Model Add Null Password'
  function (callback) {
    var user = User.create({username: 'Greg8',
                            password: null,
                            confirmPassword: null,
                            familyName: 'LastName8',
                            givenName: 'FirstName8',
                            email: 'Greg8@greg.com'});
    User.add(user, function (answerDict) {
      for (var key in answerDict){
        console.log(key + " : " + answerDict[key]);
      }
      try{
        assert.deepEqual(answerDict, {"errCode": 4});
        callback(true);
      }catch (exc){
        console.log("Test 7 exception: " + exc);
        callback(false);
      }
    });
  },
  //8 'Test Model Add 129 Password'
  function (callback) {
    var user = User.create({username: 'Greg9',
                            password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                            confirmPassword: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                            familyName: 'LastName9',
                            givenName: 'FirstName9',
                            email: 'Greg9@greg.com'});
    User.add(user, function (answerDict) {
      for (var key in answerDict){
        console.log(key + " : " + answerDict[key]);
      }
      try{
        assert.deepEqual(answerDict, {"errCode": 4});
        callback(true);
      }catch (exc){
        console.log("Test 8 exception: " + exc);
        callback(false);
      }
    });
  },
  //9 'Test Model Login'
  function (callback) {
    var user = User.create({username: 'Greg10',
                            password: 'MyPassword!',
                            confirmPassword: 'MyPassword!',
                            familyName: 'LastName10',
                            givenName: 'FirstName10',
                            email: 'Greg10@greg.com'});
    User.add(user, function (answerDict) {
      User.login(user, function (answerDict) {
        console.log("login with answerDict: ");
        for (var key in answerDict){
          console.log(key + " : " + answerDict[key]);
        }
        try{
          assert.deepEqual(answerDict, {'errCode': 1});
          callback(true);
        }catch (exc){
          console.log("Test 9 exception: " + exc);
          callback(false);
        }
      });
    });
  },
  //10 'Test Model Login Bad Credentials'
  function (callback) {
    var user = User.create({username: 'Greg23524',
                            password: '2342234812093',
                            confirmPassword: '2342234812093',
                            familyName: 'LastName11',
                            givenName: 'FirstName11',
                            email: 'Greg11@greg.com'});
    User.login(user, function (answerDict) {
      console.log("login with answerDict: ");
      for (var key in answerDict){
        console.log(key + " : " + answerDict[key]);
      }
      try{
        assert.deepEqual(answerDict, {'errCode': 5});
        callback(true);
      }catch (exc){
        console.log("Test 10 exception: " + exc);
        callback(false);
      }
    });
  }
];


module.exports = tests;