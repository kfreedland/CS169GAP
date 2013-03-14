const MIN_RETURNED = 1;
const MAX_RETURNED = 2;

var Activity = function () {

  this.defineProperties({
    name: {type: 'string', required: true},
    description: {type: 'string'},
    category: {type: 'string'},
    time1: {type: 'int'},
    time2: {type: 'int'},
    flag: {type: 'string', required: true},
    begin_date: {type: 'int'},
    end_date: {type: 'int'},
    low_price: {type: 'int', required: true},
    high_price: {type: 'int', required: true},
    low_num_participants: {type: 'int'},
    high_num_participants: {type: 'int'},
    latitude: {type: 'number'},
    longitude: {type: 'number'},
    duration: {type: 'number'}
  });

};

var geoSearchHelper = function(records, lat, long, callback)
{
  var consDist = 69.1
  var consAng = 57.3;
  var returnRecords = {};
  var count = 0;
  for (var idx in records)
  {
    var record = records[idx];
    console.log("RECORD: "+record);
    //using a geo dist equation
    var dist = Math.sqrt(Math.pow(record.latitude-lat, 2) + Math.pow((record.longitude-long) * Math.cos(lat/57.3), 2))
    record.distance = distance;
    returnRecords[count] = record;
    count++;
    if(count == MAX_RETURNED)
    {
      break;
    }
  }
  returnRecords.sort(function(recA, recB){return recA.dist-recB.dist});
  callback(returnRecords, count);
};

Activity.add = function(parameterDict, callback){

    var self = this;

    console.log("reached model create");
    console.dir(parameterDict);

    var validCategories = new Array("sports", "entertainment", "concert");


    //Parse strings to Ints
    if(parameterDict.time1 != undefined){
      parameterDict.time1 = parseInt(parameterDict.time1,10);
    } 
    if(parameterDict.time2 != undefined){
      parameterDict.time2 = parseInt(parameterDict.time2,10);
    } 
    if(parameterDict.begin_date != undefined){
      parameterDict.begin_date = parseInt(parameterDict.begin_date,10);
    } 
    if(parameterDict.end_date != undefined){
      parameterDict.end_date = parseInt(parameterDict.end_date,10);
    } 
    if(parameterDict.low_price != undefined){
      parameterDict.low_price = parseInt(parameterDict.low_price,10);
    }
    if(parameterDict.high_price != undefined){
      parameterDict.high_price = parseInt(parameterDict.high_price,10);
    }
    if(parameterDict.low_num_participants != undefined){
      parameterDict.low_num_participants = parseInt(parameterDict.low_num_participants,10);
    }
    if(parameterDict.high_num_participants != undefined){
      parameterDict.high_num_participants = parseInt(parameterDict.high_num_participants,10);
    }
    if(parameterDict.latitude != undefined){
      parameterDict.latitude = parseFloat(parameterDict.latitude);
    }
    if(parameterDict.longitude != undefined){
      parameterDict.longitude = parseFloat(parameterDict.longitude);
    }
    if(parameterDict.duration != undefined){
      parameterDict.longitude = parseFloat(parameterDict.duration);
    }

    //make sure required fields are defineed
    if (parameterDict.name == undefined){

      callback({"errCode": 6, "message": "null name"});
      return;

    } 
    if (parameterDict.flag == undefined){

      callback({"errCode": 6, "message": "null flag"}); 
      return; 

    } 
    if (parameterDict.flag == 'start_end' || paramaterDict.flag == 'open_close'){
      
      if(parameterDict.time1 == undefined){

        callback({"errCode": 6, "message": "null time2"});
        return;
      }
      if(parameterDict.time2 == undefined){

        callback({"errCode": 6, "message": "null time2"}); 
        return;
      }

    } 

    if (parameterDict.flag != 'start_end' && parameterDict.flag != 'open_close' 
           && parameterDict.flag != 'any_time' &&  parameterDict.flag != 'day_time' && 
           parameterDict.flag != 'night_time'){

      callback({"errCode": 6, "message": "invalid flag"});  
      return; 

    } 

    if (parameterDict.low_price == undefined){

      callback({"errCode": 6, "message": "null low_price"});   
      return;

    } 

    if (parameterDict.high_price == undefined){

      callback({"errCode": 6, "message": "null high_price"});  
      return; 

    } 

    if(parameterDict.low_price && parameterDict.high_price){

      if (parameterDict.low_price > parameterDict.high_price){

        callback({"errCode": 6, "message": "invalid prices"}); 
        return;

      }

    }
    
    if(parameterDict.low_num_participants && parameterDict.high_num_participants){

      if (parameterDict.low_num_participants > parameterDict.high_num_participants){

        callback({"errCode": 6, "message": "invalid participants"});  
        return;
      } 

    }

    if(parameterDict.category == undefined){

      callback({"errCode": 6, "message": "null category"});  
      return;

    }

    if(validCategories.indexOf(parameterDict.category) == -1){

      callback({"errCode": 6, "message": "invalid category"}); 
      return; 

    }

    var activityDict = {};
    activityDict.name = parameterDict.name;
    activityDict.category = parameterDict.category;
    activityDict.flag = parameterDict.flag;


    if(parameterDict.description != undefined){
      activityDict.description = parameterDict.description;
    }
    if(parameterDict.time1 != undefined){
      activityDict.time1 = parameterDict.time1;
    }
    if(parameterDict.time2 != undefined){
      activityDict.time2 = parameterDict.time2;
    }
    if(parameterDict.begin_date != undefined){
      activityDict.begin_date = parameterDict.begin_date;
    }
    if(parameterDict.end_date != undefined){
      activityDict.end_date = parameterDict.end_date;
    }
    if(parameterDict.low_price != undefined){
      activityDict.low_price = parameterDict.low_price;
    }  
    if(parameterDict.high_price != undefined){
      activityDict.high_price = parameterDict.high_price;
    }   
    if(parameterDict.low_num_participants != undefined){
      activityDict.low_num_participants = parameterDict.low_num_participants;
    } 
    if(parameterDict.high_num_participants != undefined){
      activityDict.high_num_participants = parameterDict.high_num_participants;
    } 
    if(parameterDict.latitude != undefined){
      activityDict.latitude = parameterDict.latitude;
    } 
    if(parameterDict.longitude != undefined){
      activityDict.longitude = parameterDict.longitude;
    } 
    if(parameterDict.duration != undefined){
      activityDict.duration = parameterDict.duration;
    }


    //all checks pass
    console.dir(activityDict);

    var activityRecord = geddy.model.Activity.create(activityDict);

    console.dir(activityRecord);

    geddy.model.Activity.save(activityRecord, 
      function (err, result){

        if(err){
          callback({"errCode":7});
        } else {
          callback ({"errCode": 1});
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
    }
    else
    {
      callback(activities);
    }
  });
};       

Activity = geddy.model.register('Activity', Activity);
