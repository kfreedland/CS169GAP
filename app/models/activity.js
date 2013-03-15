/*jslint white: false */
/*jslint indent: 2 */

var Activity = function () {

  this.defineProperties({
    name: {type: 'string', required: 'true'},
    description: {type: 'string'},
    category: {type: 'string'},
    flag: {type: 'string', required: 'true'},
    time1: {type: 'number'},
    time2: {type: 'number'},
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
  var MAX_RETURNED = 2;
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

  var activityDict = {};

  //make sure required fields are defineed

  //NAME
  if (!parameterDict.name) 
  {
    respDict.errCode = 6;
    respDict.message = "null name";
    callback(respDict);
    return;
  } 
  else 
  {
    activityDict.name = parameterDict.name;
  } 


  //DESCRIPTION
  if(parameterDict.description)
  {
    activityDict.description = parameterDict.description;
  }


  //CATEGORY
  if(!parameterDict.category) 
  {
    respDict.errCode = 6;
    respDict.message = "null category";
    callback(respDict);
    return;
  } 
  else if (validCategories.indexOf(parameterDict.category) === -1) 
  {
    respDict.errCode = 6;
    respDict.message = "invalid category";
    callback(respDict);
    return; 
  } 
  else 
  {
    activityDict.category = parameterDict.category;
  }


  //FLAG
  if (!parameterDict.flag) 
  {
    respDict.errCode = 6;
    respDict.message = "null flag";
    callback(respDict);
    return;
  } 
  else if (parameterDict.flag !== 'startEnd' && parameterDict.flag !== 'openClose' 
      && parameterDict.flag !== 'anyTime' &&  parameterDict.flag !== 'dayTime' && 
      parameterDict.flag !== 'nightTime') 
  {
    respDict.errCode = 6;
    respDict.message = "invalid flag";
    callback(respDict);
    return;

  } 
  else 
  {
    activityDict.flag = parameterDict.flag;
  }


  //TIME 1 TIME 2
  if (parameterDict.flag === 'startEnd' || parameterDict.flag === 'openClose') 
  {
    
    if(!parameterDict.time1) 
    {
      respDict.errCode = 6;
      respDict.message = "null time1";
      callback(respDict);
      return;

    } 
    else if(!parameterDict.time2) 
    {
      respDict.errCode = 6;
      respDict.message = "null time2";
      callback(respDict);
      return;
    
    } 
    else 
    {
      activityDict.time1 = parseFloat(parameterDict.time1);
      activityDict.time2 = parseFloat(parameterDict.time2);

      if(activityDict.time1 > activityDict.time2)
      {
        respDict.errCode = 6;
        respDict.message = "invalid times";
        callback(respDict);
        return;
      }
    }
  } 


  //BEGIN DATE AND END DATE
  if (parameterDict.begindate) 
  {
    parameterDict.begindate = parseFloat(parameterDict.begindate);
  } 
  if (parameterDict.enddate) 
  {
    parameterDict.enddate = parseFloat(parameterDict.enddate);
  } 

  if(parameterDict.begindate && parameterDict.enddate) 
  {

    if (parameterDict.begindate > parameterDict.enddate) 
    {
      respDict.errCode = 6;
      respDict.message = "invalid dates";
      callback(respDict);
      return;
    }
  }


  //PRICES
  if (!parameterDict.lowprice) 
  {
    respDict.errCode = 6;
    respDict.message = "null lowprice";
    callback(respDict);
    return;

  } 
  else 
  {
    activityDict.lowprice = parseFloat(parameterDict.lowprice);
  }
  if (!parameterDict.highprice) 
  {
    respDict.errCode = 6;
    respDict.message = "null highrice";
    callback(respDict);
    return; 

  } 
  else 
  {
    activityDict.highprice = parseFloat(parameterDict.highprice);
  }

  if (activityDict.lowprice > activityDict.highprice) 
  {
    respDict.errCode = 6;
    respDict.message = "invalid prices";
    callback(respDict);
    return;
  }


  //NUMBER OF PARTICIPANTS
  if (parameterDict.lownumparticipants) 
  {
    activityDict.lownumparticipants = parseFloat(parameterDict.lownumparticipants);
    if(activityDict.lownumparticipants <= 0 )
    {
      respDict.errCode = 6;
      respDict.message = "invalid participants";
      callback(respDict);
      return;
    }
  }

  if (parameterDict.highnumparticipants)
   {
    
    activityDict.highnumparticipants = parseFloat(parameterDict.highnumparticipants);
    
    if(activityDict.highnumparticipants <= 0 )
    {
      respDict.errCode = 6;
      respDict.message = "invalid participants";
      callback(respDict);
      return;
    }
  }

  if (parameterDict.lownumparticipants && parameterDict.highnumparticipants) 
  {
    if(activityDict.lownumparticipants > activityDict.highnumparticipants)
    {
      respDict.errCode = 6;
      respDict.message = "invalid participants";
      callback(respDict);
      return;
    }
  } 


  //LATTITUDE LONGITUDE
  if (parameterDict.latitude) {
    activityDict.latitude = parseFloat(parameterDict.latitude);
  }
  if (parameterDict.longitude) {
    activityDict.longitude = parseFloat(parameterDict.longitude);
  }


  //DURATION
  if(parameterDict.duration){
    activityDict.duration = parseFloat(parameterDict.duration);
    if(activityDict.duration < 0 ){
      respDict.errCode = 6;
      respDict.message = "invalid duration";
      callback(respDict);
      return;
    }
  }

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
  console.log("Lat Long: " +myLat+" "+myLong);
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
        console.log("YO THESE ARE THE RECORDS");
        console.dir(returnRecords);
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
