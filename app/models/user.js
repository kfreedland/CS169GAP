var User = function () {

  this.property('username', 'string');
  this.property('password', 'string', {required: true});
  this.property('familyName', 'string', {required: true});
  this.property('givenName', 'string', {required: true});
  this.property('email', 'string');

  this.validatesLength('username', {min: 3});
  this.validatesLength('password', {min: 8});
  this.validatesConfirmed('password', 'confirmPassword');

  this.hasMany('Passports');

  this.create = function (user, callback){
  	// Non-blocking uniqueness checks are hard
    User.first({username: user.username}, function(err, data) {
      if (data) {
        params.errors = {
          username: 'This username is already in use.'
        };
        //User Exists errCode = 2
        callback(2);
        //self.transfer('add');
      }
      else {
        if (user.isValid()) {
          user.password = cryptPass(user.password);
        }
        user.save(function(err, data) {
          if (err) {
            params.errors = err;
            consol.log("got error: " + err);
            callback(err);
            // self.transfer('add');
          }
          else {
            //Success errCode = 1
            callback(1);
            // self.redirect({controller: self.name});
          }
        });
      }
    });
  };


};

User = geddy.model.register('User', User);

