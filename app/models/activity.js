const MIN_RETURNED = 1;
const MAX_RETURNED = 2;
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
    category: {type: 'string'}
  });

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
Activity.search = function search(params, callback)
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
  var name = params.name;
  var myLat = params.myLat;
  var myLong = params.myLong;
  if (name != "")
  {
    //we want to just return values based on the name if they supply a name so we shouldnt look at max/min values just matching vals or none
    Activity.all({name: {'like': name}}, function (err, activities)
    {
      if(err)
      {
        throw err;
      }
      console.log("found activities");
      console.dir(activities);
      geoSearchHelper(activities, myLat, myLong, function(returnRecords, count)
      {
        callback(returnRecords);
      });
      callback(activities);
    });
  }
  else 
  {
    //we want to do a search on all criteria if possible and then return this dict if it has enough data in it.
    if (time1 && time2)
    {
      Activity.all({
                  or: [{time1: {gt: params.time1}}, {time1: {eql: params.time1}}], 
                  or: [{time2: {lt: params.time2}}, {time2: {eql: params.time2}}],
                  or: [{begin_date: {gt: params.begin_date}}, {begin_date: {eql: params.begin_date}}], 
                  or: [{end_date: {lt: params.end_date}}, {end_date: {eql: params.end_date}}],  
                  flag: params.flag,
                  or: [{low_price: {gt: params.low_price}}, {low_price: {eql: params.low_price}}], 
                  or: [{high_price: {lt: params.high_price}}, {high_price: {eql: params.high_price}}],  
                  or: [{low_num_participants: {gt: params.low_num_participants}}, {low_num_participants: {eql: params.low_num_participants}}],
                  or: [{high_num_participants: {lt: params.high_num_participants}}, {high_num_participants: {eql: params.high_num_participants}}]
                }, 
      function(err, activities)
      {
        if(err)
        {
          throw err;
        }
        console.log("found activities");
        console.dir(activities);
        geoSearchHelper(activities, myLat, myLong,  
        function(returnRecords, count)
        {
          if(count >= MIN_RETURNED)
          {
            callback(returnRecords);
          }
          else
          //drop the participant requirement and the end date
          {
            Activity.all({
                        or: [{time1: {gt: params.time1}}, {time1: {eql: params.time1}}], 
                        or: [{time2: {lt: params.time2}}, {time2: {eql: params.time2}}],
                        or: [{begin_date: {gt: params.begin_date}}, {begin_date: {eql: params.begin_date}}], 
                        flag: params.flag,
                        or: [{low_price: {gt: params.low_price}}, {low_price: {eql: params.low_price}}], 
                        or: [{high_price: {lt: params.high_price}}, {high_price: {eql: params.high_price}}]}, 
            function(err, activities)
            {
              if(err)
              {
                throw err;
              }
              console.log("found activities");
              console.dir(activities);
              geoSearchHelper(activities, myLat, myLong,
              function(returnRecords, count)
              {
                if(count >= MIN_RETURNED)
                {
                  callback(returnRecords);
                }
                else
                {
                  //drop the price requirement, if this fails return as much as we can
                  Activity.all({
                              or: [{time1: {gt: params.time1}}, {time1: {eql: params.time1}}], 
                              or: [{time2: {lt: params.time2}}, {time2: {eql: params.time2}}],
                              or: [{begin_date: {gt: params.begin_date}}, {begin_date: {eql: params.begin_date}}], 
                              flag: params.flag},
                  function(err, activities)
                  {
                    if(err)
                    {
                      throw err;
                    }
                    console.log("found activities");
                    console.dir(activities);
                    geoSearchHelper(activities, myLat, myLong,  
                    function(returnRecords, count)
                    {
                      callback(returnRecords);
                    });
                  });
                }
              });
            });
          }
        });
      }); 
    }
    else
    //remove time1 and time2 and only use the flag in the queries
    {
            Activity.all({
                  or: [{begin_date: {gt: params.begin_date}}, {begin_date: {eql: params.begin_date}}], 
                  or: [{end_date: {lt: params.end_date}}, {end_date: {eql: params.end_date}}],  
                  flag: params.flag,
                  or: [{low_price: {gt: params.low_price}}, {low_price: {eql: params.low_price}}], 
                  or: [{high_price: {lt: params.high_price}}, {high_price: {eql: params.high_price}}],  
                  or: [{low_num_participants: {gt: params.low_num_participants}}, {low_num_participants: {eql: params.low_num_participants}}],
                  or: [{high_num_participants: {lt: params.high_num_participants}}, {high_num_participants: {eql: params.high_num_participants}}]
                }, 
      function(err, activities)
      {
        if(err)
        {
          throw err;
        }
        console.log("found activities");
        console.dir(activities);
        geoSearchHelper(activities, myLat, myLong,  
        function(returnRecords, count)
        {
          if(count >= MIN_RETURNED)
          {
            callback(returnRecords);
          }
          else
          //drop the participant requirement and the end date
          {
            Activity.all({
                        or: [{begin_date: {gt: params.begin_date}}, {begin_date: {eql: params.begin_date}}], 
                        flag: params.flag,
                        or: [{low_price: {gt: params.low_price}}, {low_price: {eql: params.low_price}}], 
                        or: [{high_price: {lt: params.high_price}}, {high_price: {eql: params.high_price}}]}, 
            function(err, activities)
            {
              if(err)
              {
                throw err;
              }
              console.log("found activities");
              console.dir(activities);
              geoSearchHelper(activities, myLat, myLong,  
              function(returnRecords, count)
              {
                if(count >= MIN_RETURNED)
                {
                  callback(returnRecords);
                }
                else
                {
                  //drop the price requirement, if this fails return as much as we can
                  Activity.all({
                              or: [{begin_date: {gt: params.begin_date}}, {begin_date: {eql: params.begin_date}}], 
                              flag: params.flag},
                  function(err, activities)
                  {
                    if(err)
                    {
                      throw err;
                    }
                    console.log("found activities");
                    console.dir(activities);
                    geoSearchHelper(activities, myLat, myLong,  
                    function(returnRecords, count)
                    {
                      callback(returnRecords);
                    });
                  });
                }
              });
            });
          }
        });
      }); 
    }
  }
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

