var nodemailer = require("nodemailer")
  , check = require("validator").check;
var incorrectParams = {errCode: 6};
var backendError = {errCode: 7};
var badTimes = {errCode: 8};
var badTableJoin = {errCode: 9};

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
};

Event.add = function(params, callback)
{
  if(params.name && params.startdate && params.enddate && params.time1  && params.time2 && params.activityid && params.attendingusers)
  {
    var usernamesOrEmails = params.attendingusers.split(',');
    getEmailAndId(usernamesOrEmails, callback, function(emailAndId)
    {
      var emails = emailAndId.email;
      var userIds = emailAndId.id;


      geddy.model.Activity.first({id: params.activityid}, function(err, activityRecord)
      {
        if(activityRecord &&  activityRecord.name) //basic assertion that record exists
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
            geddy.model.Event.save(eventRecord, function(err, eventModel)
            {
              if(err)
              {
                callback(backendError);
              }
              else
              {
                addEventToUsers(eventModel.id, userIds, function(respDict)
                {
                  var message = "People want you to join the following activity: "+activityRecord.name;
                  Event.invite({eventid: eventModel.id, emails: emails , message: message}, function()
                  {
                    callback(respDict);
                  });
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
    });
  }
  else
  {
    callback(incorrectParams);
  }
};

function getEmailAndId(usernamesOrEmails, errorCallback, successCallback)
{
  emails = [];
  userIds = [];
  for(var key in usernamesOrEmails)
  {
    var id = usernamesOrEmails[key];
    if(id.indexOf('@') >= 0) //special characters cant be in usernames only in emails
    {
      //console.log('EMAIL found is: '+name);
      emails.push(id);
      continue;
    }
    else
    {
      geddy.model.User.first({id: id}, function(err, record)
      {
          if(err)
          {
            errorCallback(backendError);
          }
          else
          {
            if(record && record.email && record.id)
            {
              //console.log('EMAIL found is: '+record.email);
              emails.push(record.email);
              userIds.push(record.id);
            }
            else
            {
              errorCallback(badTableJoin);
            }
          }
        });
      }
    }
    result = {};
    result.email = emails;
    result.id = userIds;
    successCallback(result);
}

Event.addUsersToEvent = function(eventid, userIds, callback)
{
  console.log('running addUsersToEvent');
  userIds = userIds.split(',');
  geddy.model.Event.first({id: eventid}, function(err, eventRecord)
  {
    if(eventRecord && eventRecord.attendingusers)
    {
      var newUids = eventRecord.attendingusers.split(',').concat(userIds);
      newUids = validateUserIds(newUids, eventid);
      eventRecord.attendingusers = newUids.toString();
      geddy.model.Event.save(eventRecord, function(err, result)
      {
        if(err)
        {
          callback(backendError);
        }
        else
        {
          callback({errCode: 1});
        }
      });
    }
    else
    {
      callback(badTableJoin);
    } 
  });
};

function validateUserIds(idArray, eventid) //assumes valid usernames
{
  idHash = {};
  idReturn = [];
  for(var key in idArray)
  {
    var id = idArray[key];
    if(idHash[id])
    {
      continue;
    }
    else
    {
      idHash[id] = true;
      geddy.model.User.first({id: id}, function(err, userRecord)
      {
        if(userRecord && userRecord.name)
        {
          if(!(userRecord.myevents) || (userRecord.myevents.search(eventid) < 0))
          {
            if(userRecord.myevents)
            {
              userRecord.myevents += ',' + eventid;
            }
            else
            {
              userRecord.myevents = eventid;
            }
            geddy.model.Event.save(userRecord, function(err, result)
            {
              if(!err)
              {
                idReturn.push(id);
              }
            });
          }
        }
      });
    }
  }
  return idReturn;
}

function addEventToUsers(eventid, userIds, callback)
{
  for(var key in userIds)
  {
    var uid = userIds[key];
    geddy.model.User.first({id: uid}, function(err, record)
    {
      if(err)
      {
        callback(backendError);
      }
      else
      {
        if(record && record.myevents)
        {
          record.myevents += ","+eventid;
        }
        else
        {
          record.myevents = eventid;
        }
        record.confirmPassword = record.password;
        geddy.model.User.save(record, function(err, result)
        {
          if(err)
          {
            console.log("Error Adding Event To User");
            console.dir(err);
            callback(backendError);
          }

        });
      }
    });
  }
  callback({errCode: 1}); //success!
}


//params requires eventid, emails, and message
Event.invite = function(params, callback) 
{
  //send email containing "message" to list of emails
  var self = this;
  var responseDict = {};

  var eventID = params.eventid;
  var emailList = params.emails;
  var message = params.message;

  if (eventID === null || eventID === undefined ) 
  {
    //handle null eventid
    responseDict.errCode = 6;
    responseDict.message = "null eventid";
    callback(responseDict);
    return;
  } 

  if (emailList === null || emailList === undefined || emailList === [] ) 
  {
    //handle empty emails
    responseDict.errCode = 6;
    responseDict.message = "null emails";
    callback(responseDict);
    return;
  } 

  if (message === null || message === undefined ) 
  {
    //handle null eventid
    responseDict.errCode = 6;
    responseDict.message = "null message";
    callback(responseDict);
    return;
  } 

  //check all emails for propper form
  var badEmails = [];
  var goodEmailsString = "";
  for(var index in emailList)
  {
    var emailAddr = emailList[index];


    if (!isValidEmail(emailAddr))
    {
      //email address is malformed
      badEmails.push(emailAddr);
    } else {

      goodEmailsString += emailAddr + ", ";

    }
  }

  //some emails are bad
  if(badEmails.length > 0 ){

    responseDict.errCode = 12;
    responseDict.message = "malformed emails";
    responseDict.bademails = badEmails;
    callback(responseDict);
    return;
  }

  //chop off the ", " at the end of the string
  if(goodEmailsString.length > 2)
  {

    goodEmailsString = goodEmailsString.substring(0,goodEmailsString.length-2);
  } 
  else
  {

    responseDict.errCode = 6;
    responseDict.message = "null emails";
    callback(responseDict);
    return;
  } 



  geddy.model.Event.first({id: eventID}, function (err, result) 
    {

      if(err){
        //handle error
        responseDict.errCode = 7;
        responseDict.message = "database error";
        callback(responseDict);
        return;
      } 
      else 
      {

        if(result)
        {
          //invite all emails

            // create reusable transport method (opens pool of SMTP connections)
          var smtpTransport = nodemailer.createTransport("SMTP",{
              service: "Gmail",
              auth: {
                  user: "groupactivityplanner@gmail.com",
                  pass: "gapgapgap"
              }
          });

          var mailOptions = {
              from: "Group Activity Planner ✔ <groupactivityplanner@gmail.com>", // sender address
              to: goodEmailsString, // list of receivers
              subject: "You have been invited to an event!", // Subject line
              text: message, // plaintext body
              html: null // html body
          };

          // send mail with defined transport object
          smtpTransport.sendMail(mailOptions, function(error, response){
              if(error){
                  responseDict.errCode = 13;
                  responseDict.message = "email failed";
                  callback(responseDict);
                  return;
              }else{
                  responseDict.errCode = 1;
                  callback(responseDict);
                  return;
              }

              smtpTransport.close();

          });

        }
         else 
        {
        
        responseDict.errCode = 10;
        responseDict.message = "invalid eventid";
        callback(responseDict);
        return;
        }
      }

    });
};

function isValidEmail(email) { 


  try
  {
    check(email).isEmail();
    return true;
  } 
  catch (error)
  {
    return false;
  }

}

Event.changeDateTime = function(params, callback) 
{

};

Event.getMyEvents = function (params, callback) {
  geddy.model.User.first({id: params.userId}, function (err, userModel) {
    if (err){
      responseDict.events = [];
      // console.log("err exists: ");
      // console.dir(err);
      responseDict.errCode = 7;
      callback(responseDict);
    } else {
      if (userModel){
        // console.log("myevents = ");
        // console.dir(userModel.myevents);
        var myEvents = [];
        if (userModel.myevents){
          var eventIds = userModel.myevents.split(',');
          for (var index in eventIds){
            var eventId = eventIds[index];
            geddy.model.Event.first({id: eventId}, function (err, eventModel){
              if (err){
                responseDict.events = [];
                responseDict.errCode = 7;
                callback(responseDict);
              } else if (eventModel){
                myEvents.push(eventModel);
              }
              if (index == eventIds.length - 1){
                getEventsCallback(1, myEvents, callback);
              }
            });
          }
        } else {
          getEventsCallback(1, myEvents, callback);
        }
      }
    }
  });
};

function getEventsCallback(errCode, events, callback){
  var responseDict = {};
  responseDict.errCode = 1;
  responseDict.events = events;
  callback(responseDict);
}

  
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

Event.TESTAPI_resetFixture = function (callback) {
  geddy.model.Event.all(function (err, result) {
    // console.log("got all activity models with error: " + err + " and result: " + result);
    for (var eventModel in result){
      // console.log("trying to remove activityModel: " + result[activityModel]);
      geddy.model.Event.remove(result[eventModel].id);
    }
    var responseDict = {};
    responseDict.errCode = 1;
    callback(responseDict); //"SUCCESS"
  });
};  

Event = geddy.model.register('Event', Event);
