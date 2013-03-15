(function () {
/*jslint white: false */
/*jslint indent: 2 */

// const MIN_RETURNED = 1;
// const MAX_RETURNED = 2;

var Activity = function () {

  this.defineProperties({
    name: {type: 'string', required: 'true'},
    description: {type: 'string'},
    category: {type: 'string'},
    time1: {type: 'number'},
    time2: {type: 'number'},
    flag: {type: 'string', required: 'true'},
    begin_date: {type: 'number'},
    end_date: {type: 'number'},
    low_price: {type: 'number', required: 'true'},
    high_price: {type: 'number', required: 'true'},
    low_num_participants: {type: 'number'},
    high_num_participants: {type: 'number'},
    latitude: {type: 'number'},
    longitude: {type: 'number'},
    duration: {type: 'number'}
  });

};

var geoSearchHelper = function (records, lat, long, callback)
{
  var consDist = 69.1
    , consAng = 57.3
    , returnRecords = {}
    , count = 0
    , idx;
  for (idx in records)
  {
    var record = records[idx];
    console.log("RECORD: " + record);
    //using a geo dist equation
    var dist = Math.sqrt(Math.pow(record.latitude - lat, 2) + Math.pow((record.longitude - long) * Math.cos(lat / 57.3), 2));
    record.distance = dist;
    returnRecords[count] = record;
    count = count + 1;
    if (count === MAX_RETURNED)
    {
      break;
    }
  }
  returnRecords.sort(function (recA, recB) {return recA.dist - recB.dist;});
  callback(returnRecords, count);
};

Activity.add = function (parameterDict, callback){

  var self = this;

    var respDict = {};

    console.log("reached model create");
    console.dir(parameterDict);

    var validCategories = ["sports", "entertainment", "concert"];


    //Parse strings to Ints
    if (parameterDict.time1 !== undefined) {
      parameterDict.time1 = parseInt(parameterDict.time1, 10);
    } 
    if (parameterDict.time2 !== undefined) {
      parameterDict.time2 = parseInt(parameterDict.time2, 10);
    } 
    if (parameterDict.begin_date !== undefined) {
      parameterDict.begin_date = parseInt(parameterDict.begin_date, 10);
    } 
    if (parameterDict.end_date !== undefined) {
      parameterDict.end_date = parseInt(parameterDict.end_date, 10);
    } 
    if (parameterDict.low_price !== undefined) {
      parameterDict.low_price = parseInt(parameterDict.low_price, 10);
    }
    if (parameterDict.high_price !== undefined) {
      parameterDict.high_price = parseInt(parameterDict.high_price, 10);
    }
    if (parameterDict.low_num_participants !== undefined) {
      parameterDict.low_num_participants = parseInt(parameterDict.low_num_participants, 10);
    }
    if (parameterDict.high_num_participants !== undefined) {
      parameterDict.high_num_participants = parseInt(parameterDict.high_num_participants, 10);
    }
    if (parameterDict.latitude !== undefined) {
      parameterDict.latitude = parseFloat(parameterDict.latitude);
    }
    if (parameterDict.longitude !== undefined) {
      parameterDict.longitude = parseFloat(parameterDict.longitude);
    }
    if(parameterDict.duration != undefined){
      parameterDict.duration = parseFloat(parameterDict.duration);
    }

    //make sure required fields are defineed
    if (parameterDict.name === undefined) {
      respDict.errCode = 6;
      respDict.message = "null name";
      callback(respDict);
      return;

    } 
    if (parameterDict.flag === undefined) {
      respDict.errCode = 6;
      respDict.message = "null flag";
      callback(respDict);
      return;

    }
    if (parameterDict.flag === 'start_end' || parameterDict.flag === 'open_close') {
      
      if(parameterDict.time1 === undefined) {
        respDict.errCode = 6;
        respDict.message = "null time1";
        callback(respDict);
        return;
      }
      if(parameterDict.time2 === undefined) {

        respDict.errCode = 6;
        respDict.message = "null time2";
        callback(respDict);
        return;
      }

    } 

    if (parameterDict.flag !== 'start_end' && parameterDict.flag !== 'open_close' 
           && parameterDict.flag !== 'any_time' &&  parameterDict.flag !== 'day_time' && 
           parameterDict.flag !== 'night_time') {

      respDict.errCode = 6;
      respDict.message = "invalid flag";
      callback(respDict);
      return; 

    } 

    if (parameterDict.low_price === undefined) {
      respDict.errCode = 6;
      respDict.message = "null low_price";
      callback(respDict);
      return;

    } 

    if (parameterDict.high_price === undefined) {
      respDict.errCode = 6;
      respDict.message = "null high_price";
      callback(respDict);
      return; 

    } 

    if(parameterDict.low_price && parameterDict.high_price) {

      if (parameterDict.low_price > parameterDict.high_price) {

        respDict.errCode = 6;
        respDict.message = "invalid prices";
        callback(respDict);
        return;

      }

    }
    
    if(parameterDict.low_num_participants && parameterDict.high_num_participants) {

      if (parameterDict.low_num_participants > parameterDict.high_num_participants) {
        respDict.errCode = 6;
        respDict.message = "invalid participants";
        callback(respDict);
        return;
      } 

    }

    if(parameterDict.category === undefined) {
      respDict.errCode = 6;
      respDict.message = "null category";
      callback(respDict);
      return;

    }

    if(validCategories.indexOf(parameterDict.category) === -1) {
      respDict.errCode = 6;
      respDict.message = "invalid category";
      callback(respDict);
      return; 

    }

    var activityDict = {};
    activityDict.name = parameterDict.name;
    activityDict.category = parameterDict.category;
    activityDict.flag = parameterDict.flag;


    if(parameterDict.description !== undefined){
      activityDict.description = parameterDict.description;
    }
    if(parameterDict.time1 !== undefined){
      activityDict.time1 = parameterDict.time1;
    }
    if(parameterDict.time2 !== undefined){
      activityDict.time2 = parameterDict.time2;
    }
    if(parameterDict.begin_date !== undefined){
      activityDict.begin_date = parameterDict.begin_date;
    }
    if(parameterDict.end_date !== undefined){
      activityDict.end_date = parameterDict.end_date;
    }
    console.log("parameterDict.low_price = " + parameterDict.low_price);
    if(parameterDict.low_price !== undefined){
      console.log("low_price is NOT undefined!!");
      activityDict.low_price = parameterDict.low_price;
    }
    console.log("parameterDict.high_price = " + parameterDict.high_price); 
    if(parameterDict.high_price !== undefined){
      console.log("high_price is NOT undefined!!");
      activityDict.high_price = parameterDict.high_price;
    }  
    if(parameterDict.low_num_participants !== undefined){
      activityDict.low_num_participants = parameterDict.low_num_participants;
    }
    if(parameterDict.high_num_participants !== undefined){
      activityDict.high_num_participants = parameterDict.high_num_participants;
    }
    if(parameterDict.latitude !== undefined){
      activityDict.latitude = parameterDict.latitude;
    }
    if(parameterDict.longitude !== undefined){
      activityDict.longitude = parameterDict.longitude;
    }
    if(parameterDict.duration !== undefined){
      activityDict.duration = parameterDict.duration;
    }


    //Make sure does not exist
    geddy.model.Activity.load(activityDict, 
      function (err, result) {
        if (result){
          respDict.errCode = 10;
          respDict.message = "That Activity already exists.";
          callback(respDict);
        } else {
          console.log("activity does not exists yet, so we continue to create it");
          //all checks pass
          console.log("ACTIVIT DICT: ");
          console.dir(activityDict);

          var activityRecord = geddy.model.Activity.create(activityDict);

          console.log("ACTIVITY RECORD: ");
          console.dir(activityRecord);

          geddy.model.Activity.save(activityRecord, 
            function (err, result){

              if(err){
                console.log("ERROR in Activity SAVE");
                for (var item in err){
                  console.log(item + " : " + err.item);
                }
                respDict.errCode = 7;
                respDict.message = "database error";
                callback(respDict);
              } else {


                respDict.errCode = 1;
                callback(respDict);
              }
            });
        }

    });

       
};

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
  respDict = {};
  //we want to just return values based on the name if they supply a name so we shouldnt look at max/min values just matching vals or none
  if (typeof params !== 'object')
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
    if(myLat && myLong && (typeof myLat == 'number') && (typeof myLong == 'number'))
    {
      geoSearchHelper(activities, myLat, myLong, function (returnRecords, count)
      {
        callback(returnRecords);
      });
    }
    else
    {
      callback(activities);
    }
  });
};       

Activity = geddy.model.register('Activity', Activity);
}());

(function () {
var Passport = function () {
  this.property('authType', 'string');
  this.property('key', 'string');

  this.belongsTo('User');
};

Passport = geddy.model.register('Passport', Passport);

}());

(function () {
var User = function () {

  this.property('username', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('familyName', 'string', {required: true});
  this.property('givenName', 'string', {required: true});
  this.property('email', 'string', {required: true});

  this.validatesLength('username', {min: 3});
  this.validatesLength('password', {min: 8});
  this.validatesConfirmed('password', 'confirmPassword');

  this.hasMany('Passports');
};

User = geddy.model.register('User', User);

}());