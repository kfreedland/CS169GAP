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

    var validCategories = new Array("sports", "entertainment", "concert");


    //Parse strings to Ints
    if(parameterDict.time1){
      parameterDict.time1 = parseInt(parameterDict.time1,10)
    } 
    if(parameterDict.time2){
      parameterDict.time2 = parseInt(parameterDict.time2,10)
    } 
    if(parameterDict.begin_date){
      parameterDict.begin_date = parseInt(parameterDict.begin_date,10)
    } 
    if(parameterDict.end_date){
      parameterDict.end_date = parseInt(parameterDict.end_date,10)
    } 
    if(parameterDict.low_price){
      parameterDict.low_price = parseInt(parameterDict.low_price,10)
    }
    if(parameterDict.high_price){
      parameterDict.high_price = parseInt(parameterDict.high_price,10)
    }
    if(parameterDict.low_num_participants){
      parameterDict.low_num_participants = parseInt(parameterDict.low_num_participants,10)
    }
    if(parameterDict.high_num_participants){
      parameterDict.high_num_participants = parseInt(parameterDict.high_num_participants,10)
    }
    if(parameterDict.latitude){
      parameterDict.latitude = parseFloat(parameterDict.latitude)
    }
    if(parameterDict.longitude){
      parameterDict.longitude = parseFloat(parameterDict.longitude)
    }

    //make sure required fields are non-null
    if (parameterDict.name == null){
      callback({"errCode": 6, "message": "null name"}); 

    } else if (parameterDict.flag == null){
      callback({"errCode": 6, "message": "null flag"});  

    } else if (parameterDict.flag == 'start_end' || paramaterDict.flag == 'open_close'){
      if(parameterDict.time1 == null){
        callback({"errCode": 6, "message": "null time2"});    
      }
      if(parameterDict.time2 == null){
        callback({"errCode": 6, "message": "null time2"});    
      }

    } else if (parameterDict.flag != 'start_end' && parameterDict.flag != 'open_close' 
           && parameterDict.flag != 'any_time' &&  parameterDict.flag != 'day_time' && parameterDict.flag != 'night_time'){
      callback({"errCode": 6, "message": "invalid flag"});    

    } else if (parameterDict.low_price == null){
      callback({"errCode": 6, "message": "null low_price"});   

    } else if (parameterDict.high_price == null){
      callback({"errCode": 6, "message": "null high_price"});   

    } else if(parameterDict.low_price != null && parameterDict.high_price != null){

      if (parameterDict.low_price > parameterDict.high_price){
        callback({"errCode": 6, "message": "invalid prices"});  
      }

    } else if(parameterDict.low_num_participants != null && parameterDict.high_num_participants != null){

      if (parameterDict.low_num_participants > parameterDict.high_num_participants){
        callback({"errCode": 6, "message": "invalid participants"});  
      } 

    } else if(parameterDict.category == null){
      callback({"errCode": 6, "message": "null category"});  

    } else if(acceptedCategories.indexOf(parameterDict.category) == -1){
      callback({"errCode": 6, "message": "invalid category"});  

    } else {

      //all checks pass
      var newActivity = geddy.model.Activity.create(parameterDict);
      geddy.model.Activity.save(newActivity, 
        function (err, result){

          if(err){
            callback({"errCode":7});
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

