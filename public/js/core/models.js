(function () {
/*jslint white: false */
/*jslint indent: 2 */

 const MIN_RETURNED = 1;
 const MAX_RETURNED = 2;

var Activity = function () {

  this.defineProperties({
    name: {type: 'string', required: 'true'},
    description: {type: 'string'},
    category: {type: 'string'},
    time1: {type: 'number'},
    time2: {type: 'number'},
    flag: {type: 'string', required: 'true'},
    begindate: {type: 'number'},
    enddate: {type: 'number'},
    lowprice: {type: 'number', required: 'true'},
    highprice: {type: 'number', required: 'true'},
    lownumparticipants: {type: 'number'},
    highnumparticipants: {type: 'number'},
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

    var validCategories = ["Sports", "Entertainment", "Food", "Arts", "Nature"];


    //Parse strings to Ints
    if (parameterDict.time1 !== undefined) {
      parameterDict.time1 = parseFloat(parameterDict.time1);
    } 
    if (parameterDict.time2 !== undefined) {
      parameterDict.time2 = parseFloat(parameterDict.time2);
    } 
    if (parameterDict.begindate !== undefined) {
      parameterDict.begindate = parseFloat(parameterDict.begindate);
    } 
    if (parameterDict.enddate !== undefined) {
      parameterDict.enddate = parseFloat(parameterDict.enddate);
    } 
    if (parameterDict.lowprice !== undefined) {
      parameterDict.lowprice = parseFloat(parameterDict.lowprice);
    }
    if (parameterDict.highprice !== undefined) {
      parameterDict.highprice = parseFloat(parameterDict.highprice);
    }
    if (parameterDict.lownumparticipants !== undefined) {
      parameterDict.lownumparticipants = parseFloat(parameterDict.lownumparticipants);
    }
    if (parameterDict.highnumparticipants !== undefined) {
      parameterDict.highnumparticipants = parseFloat(parameterDict.highnumparticipants);
    }
    if (parameterDict.latitude !== undefined) {
      parameterDict.latitude = parseFloat(parameterDict.latitude);
    }
    if (parameterDict.longitude !== undefined) {
      parameterDict.longitude = parseFloat(parameterDict.longitude);
    }
    if(parameterDict.duration !== undefined){
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
    if (parameterDict.flag === 'startEnd' || parameterDict.flag === 'openClose') {
      
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

    if (parameterDict.flag !== 'startEnd' && parameterDict.flag !== 'openClose' 
           && parameterDict.flag !== 'anyTime' &&  parameterDict.flag !== 'dayTime' && 
           parameterDict.flag !== 'nightTime') {

      respDict.errCode = 6;
      respDict.message = "invalid flag";
      callback(respDict);
      return; 

    } 

    if (parameterDict.lowprice === undefined) {
      respDict.errCode = 6;
      respDict.message = "null lowPrice";
      callback(respDict);
      return;

    } 

    if (parameterDict.highprice === undefined) {
      respDict.errCode = 6;
      respDict.message = "null highPrice";
      callback(respDict);
      return; 

    } 

    if(parameterDict.lowprice && parameterDict.highprice) {

      if (parameterDict.lowprice > parameterDict.highprice) {
        respDict.errCode = 6;
        respDict.message = "invalid prices";
        callback(respDict);
        return;

      }

    }
    
    if(parameterDict.lownumparticipants && parameterDict.highnumparticipants) {

      if (parameterDict.lownumparticipants > parameterDict.highnumparticipants) {
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
    if(parameterDict.begindate !== undefined){
      activityDict.begindate = parameterDict.begindate;
    }
    if(parameterDict.enddate !== undefined){
      activityDict.enddate = parameterDict.enddate;
    }
    console.log("parameterDict.lowPrice = " + parameterDict.lowprice);
    if(parameterDict.lowprice !== undefined){
      console.log("lowPrice is NOT undefined!!");
      activityDict.lowprice = parameterDict.lowprice;
    }
    console.log("parameterDict.highPrice = " + parameterDict.highprice); 
    if(parameterDict.highprice !== undefined){
      console.log("highPrice is NOT undefined!!");
      activityDict.highprice = parameterDict.highprice;
    }  
    if(parameterDict.lownumparticipants !== undefined){
      activityDict.lownumparticipants = parameterDict.lownumparticipants;
    }
    if(parameterDict.highnumparticipants !== undefined){
      activityDict.highnumparticipants = parameterDict.highnumparticipants;
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


    // activityDict = {name :'name1',
    //                 description : 'description YO',
    //                 category : 'sports',
    //                 time1 : 123,
    //                 time2 : 234,
    //                 flag : 'startEnd',
    //                 begindate : 2323,
    //                 enddate : 23444,
    //                 lowprice : 1,
    //                 highprice : 3,
    //                 lownumparticipants : 1,
    //                 highnumparticipants : 10,
    //                 latitude : 37.87,
    //                 longitude : -122.25,
    //                 duration : 2344-2323};

    //Make sure does not exist
    geddy.model.Activity.first(activityDict, 
      function (err, result) {
        if (result){
          respDict.errCode = 10;
          respDict.message = "That Activity already exists.";
          callback(respDict);
        } else {
          console.log("activity does not exists yet, so we continue to create it");
          //all checks pass
          console.log("ACTIVITY DICT: ");
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