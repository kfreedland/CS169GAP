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
  });
Activity.search = function search(params, callback)
{
  /** data is of the following form
  Name: string
  Description: string
  time1: time
  time2: time
  flag: string startEnd, openClose, anyTime, dayTime, nightTime
  begin_date: date
  end_date: date
  low_price: int
  high_price: int
  low_num_participants: int
  high_num_participants: int
  latitude: number
  longitude: number
  **/
  
}
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

