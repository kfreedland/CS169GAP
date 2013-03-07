var Activity = function () {

  this.defineProperties({
    name: {type: 'string', required: true},
    description: {type: 'string'},
    time1: {type: '1'},
    time2: {type: '2'},
    flag: {type: 'string'},
    beginDate: {type: '_date'},
    endDate: {type: '_date'},
    lowPrice: {type: '_price'},
    highPrice: {type: '_price'},
    lowNumParticipants: {type: '_num_participants'},
    highNumParticipants: {type: '_num_participants'},
    latitude: {type: 'number'},
    longitude: {type: 'number'},
    duration:{type: 'number'}
  });

  this.create = function(parameterDict, callback){

    var self = this;

    //make sure required fields are non-null
    if (parameterDict.name == null){
      callback({"errCode": -1});    
    } else if (parameterDict.flag == null){
      callback({"errCode": -1});    
    } else if (parameterDict.time_1 == null){
      callback({"errCode": -1});    
    } else if (parameterDict.time_2 == null){
      callback({"errCode": -1});    
    } else if (parameterDict.low_price == null){
      callback({"errCode": -1});    
    } else {

      var newActivity = geddy.model.Activity.create(parameterDict);
            geddy.model.Activity.save(newActivity, 
              function (err, result){

                if(err){
                  callback({"errCode":-1});
                } else {
                  callback ({"errCode": 1});
                }
              });
    }
  };

  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
Activity.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Activity.someStaticMethod = function () {
  // Do some other stuff
};
Activity.someStaticProperty = 'YYZ';
*/

Activity = geddy.model.register('Activity', Activity);

