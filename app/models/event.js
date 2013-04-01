var Event = function () {

  this.defineProperties({
    name: {type: 'string', required: true},
    description: {type: 'string'},
    time1: {type: 'number'},
    time2: {type: 'number'},
    begindate: {type: 'number'},
    enddate: {type: 'number'},
    activityid: {type: 'string'},
    attendingusers: {type: 'string'}
  });

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
Event.add = function(params, callback)
{
  var incorrectParams = {errCode: 6};
  var backendError = {errCode: 7};
  var badTimes = {errCode: 8};
  var badTableJoin = {errCode: 9};
  if(params.name && params.startdate && params.enddate && params.time1  && params.time2 && params.activityid && params.attendingusers)
  {
    var usernamesOrEmails = params.attendingusers.split(',');
    var emails = [];
    var userIds = [];
    for(var key in usernamesOrEmails)
    {
      var name = usernamesOrEmails[key];
      if(name.indexOf('@') >= 0) //special characters cant be in usernames only in emails
      {
        emails.push(name);
        continue;
      }
      else
      {
        geddy.model.User.first({username: name}, function(err, record)
        {
            if(err)
            {
              callback(backendError);
            }
            else
            {
              if(record && record.email && record.id)
              {
                emails.push(record.email);
                userIds.push(record.id);
              }
              else
              {
                callback(badTableJoin);
              }
            }
          });
        }
      }
    }
    while(useremail.length < usernamesOrEmails.length)
    {
      // console.log('waiting on email parsing to finish it will kill this if it errors');
      continue;
    }
    geddy.model.Activity.first({id: params.id}, function(err, record)
    {
      if(record && record.name) //basic assertion that record exists
      {
        if(params.startdate <= params.enddate && params.time1 <= params.time2)
        {
          //all required fields are valid
          eventDict = {};
          eventDict.name = params.name;
          eventDict.startdate = params.startdate;
          eventDict.enddate = params.enddate;
          eventDict.time1 = params.time1;
          eventDict.time2 = params.time2;
          eventDict.description = params.description;
          eventDict.activityid = params.activityid;
          eventDict.attendingusers = userIds.toString();
          var eventRecord = geddy.model.Event.create(eventDict);

          geddy.model.Event.save(eventRecord, function(err, result)
          {
            if(err)
            {
              callback(backendError);
            }
            else
            {
              //now we have to add the eventRecord to each user
              geddy.model.Event.first({attendingusers: userIds.toString()}, function(err, record)
              {
                if(err)
                {
                  callback(backendError);
                }
                else
                {
                  addEventToUsers(record.id, uesrIds, function(respDict)
                  {
                    emailNotify(emails);
                    callback(respDict);
                  });
                }

              });
            }
          });
        }
        else
        {
          callback(badTimes);
        }
      }
      else
      {
        callback(badTableJoin);
      }
    });
  }
}

function addEventToUsers(eventid, uesrIds, callback)
{
  for(var key in userIds)
  {
    var uid = userIds[key];
    geddy.model.users.first({id: uid}, function(err, record)
    {
      if(err)
      {
        callback({errCode: 7});
      }
      else
      {
        if(record.myevents)
        {
          record.myevents += ","+eventid;
        }
        else
        {
          record.myevents = eventid;
        }
        geddy.model.User.save(record, function(err, result)
        {
          if(err)
          {
            callback({errCode: 7});
          }
        });
      }
    });
  }
  callback({errCode: 1});
}


Event.getMyEvents = function (params, callback) {

};
/*
// Can also define them on the prototype
Event.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Event.someStaticMethod = function () {
  // Do some other stuff
};
Event.someStaticProperty = 'YYZ';
*/

Event = geddy.model.register('Event', Event);

