var nodemailer = require("nodemailer");
var check = require("validator").check;


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
var incorrectParams = {errCode: 6};
var backendError = {errCode: 7};
var badTimes = {errCode: 8};
var badTableJoin = {errCode: 9};

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

            geddy.model.Event.save(eventRecord, function(err, result)
            {
              if(err)
              {
                callback(backendError);
              }
              else
              {
                //now we have to add the eventRecord to each user
                geddy.model.Event.first({attendingusers: userIds.toString()}, function(err, eventRecord)
                {
                  if(err)
                  {
                    callback(backendError);
                  }
                  else
                  {
                    addEventToUsers(eventRecord.id, userIds, function(respDict)
                    {
                      var message = "People want you to join the following activity: "+activityRecord.name;
                      invite({eventid: eventRecord.id, emails: emails , message: message}, function()
                      {
                        callback(respDict);
                      });
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
    });
  }
  else
  {
    callback(incorrectParams);
  }
}

function invite(params, callback)
{
  callback();
}

function getEmailAndId(usernamesOrEmails, errorCallback, successCallback)
{
  emails = [];
  userIds = [];
  for(var key in usernamesOrEmails)
  {
    var name = usernamesOrEmails[key];
    if(name.indexOf('@') >= 0) //special characters cant be in usernames only in emails
    {
      //console.log('EMAIL found is: '+name);
      emails.push(name);
      continue;
    }
    else
    {
      geddy.model.User.first({username: name}, function(err, record)
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
}
function addEventToUsers(eventid, uesrIds, callback)
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
            callback(backendError);
          }
        });
      }
    });
  }
  callback({errCode: 1}); //success!
}

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
  if(badEmails.count > 0 ){

    responseDict.errCode = 12;
    responseDict.message = "malformed emails";
    responseDict.bademails = badEmails;
    callback(responseDict);
    return;
  }

  //chop off the ", " at the end of the string
  if(goodEmailsString.length > 2)
  {
    goodEmailsString = goodEmailsString.substring(0,goodEmailsString.length-3);
  } 
  else
  {

    responseDict.errCode = 6;
    responseDict.message = "couldn't find any good emails";
    callback(responseDict);
    return;
  } 



  geddy.model.Event.first({id: eventID}, function (err, result) 
    {

      if(err){
        //handle error
        responseDict.errCode = 10;
        responseDict.message = "invalid eventid";
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
          }

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
      }

    });
}

function isValidEmail(email) { 
  return check(email).isEmail();

} 

Event.changeDateTime = function(params, callback) 
{

}

Event.getMyEvents = function (params, callback) {
  var responseDict = {};
  responseDict.errCode = 1;
  responseDict.events = [];

  var query = {};
  query.attendingusers = params.userID;

  Event.all(query, function (err, events)
  {
    if(err)
    {
      responseDict.errCode = 7;
      // throw err;
    }
    else
    {
      responseDict.events = events;
    }
    callback(responseDict);
  });
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

