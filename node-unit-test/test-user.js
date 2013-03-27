var User = geddy.model.User
  , Activity = geddy.model.Activity;

exports['addUser1'] = function (test) {
	var user = User.create({username: 'Greg',
                        password: 'MyPassword!',
                        confirmPassword: 'MyPassword!',
                        familyName: 'LastName1',
                        givenName: 'FirstName1',
                        email: 'Greg@greg.com'});
  User.add(user, function (answerDict) {
      test.equal(answerDict, {'errCode': 1});
      test.done();
  });
};