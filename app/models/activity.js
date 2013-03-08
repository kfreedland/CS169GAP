const MIN_RETURNED = 1;
const MAX_RETURNED = 2;
var Activity = function () {

  this.defineProperties({
    name: {type: 'string', required: true},
    description: {type: 'string'},
    category:{type: 'string'},
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
    duration:{type: 'number'},
    category: {type: 'string'}
  });

  this.create = function(parameterDict, callback){

    var self = this;

    //make sure required fields are non-null
    if (parameterDict.name == null){
      callback({"errCode": 6});    
    } else if (parameterDict.flag == null){
      callback({"errCode": 6});    
    } else if (parameterDict.flag == 'start_end' || paramaterDict.flag == 'open_close'){
      if(parameterDict.time1 == null || parameterDict.time2 == null){
        callback({"errCode": 6});    
      }
    } else if(parameterDict.flag == null){
      callback({"errCode": 6}); 
    } else if (parameterDict.flag != 'start_end' && parameterDict.flag != 'open_close' 
           && parameterDict.flag != 'any_time' &&  parameterDict.flag != 'day_time' && parameterDict.flag != 'night_time'){
      callBack{"errCode":6}
    }

    

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

var geoSearchHelper = function(records, lat, long, callback)
{
  var consDist = 69.1;
  var consAng = 57.3;
  returnRecords = {};
  count = 0;
  for (var idx in records)
  {
    var record = records[idx];
    console.log("RECORD: "+record);
    //using a geo dist equation
    var dist = Math.sqrt(Math.pow(record.latitude-lat, 2) + Math.pow((record.longitude-long) * Math.cos(lat/57.3), 2))
    record.dist = dist
    returnRecords[count] = record;
    count++;
    if(count == MAX_RETURNED)
    {
      returnRecords.sort(function(recA, recB){return recA.dist-recB.dist});
      callback(returnRecords, count);
      return;
    }
  }
  returnRecords.sort(function(recA, recB){return recA.dist-recB.dist});
  callback(returnRecords, count);
}
Activity.search = function search(params, myLat, myLong, callback)
{
  /** data is of the following form
  Name: string
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
  respDict ={};
  //we want to just return values based on the name if they supply a name so we shouldnt look at max/min values just matching vals or none
  if(!(typeof params=='object'))
  {
    respDict.errCode = 7;
    callback(respDict);
  }
  Activity.all(params, function (err, activities)
  {
    if(err)
    {
      throw err;
    }
    console.log("found activities");
    console.dir(activities);
    if(myLat && myLong && typeof myLat =='number' && typeof myLong =='number')
    {
      geoSearchHelper(activities, myLat, myLong, function(returnRecords, count)
      {
        callback(returnRecords);
      });
      callback(activities);
    }
    else
    {
      callback(activities);
    }
  });
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

