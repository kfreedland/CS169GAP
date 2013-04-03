(function () {
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
    startdate: {type: 'number'},
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
    var idsOrEmails = params.attendingusers.split(',');
    getEmailAndId(idsOrEmails, callback, function(emailAndId)
    {
      var emails = emailAndId.email;
      var userIds = emailAndId.id;
      geddy.model.Activity.first({id: params.activityid}, function(err, activityRecord)
      {
        if(activityRecord && activityRecord.name) //basic assertion that record exists
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
                  var message = "People want you to join the following event: "+params.name;
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
      geddy.model.User.first({username: id}, function(err, record)
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

Event.addUsersToEvent = function(eventid, usernames, callback)
{
  usernames = usernames.split(',');
  geddy.model.Event.first({id: eventid}, function(err, eventRecord)
  {
    if(eventRecord && eventRecord.attendingusers)
    {
      var data = eventRecord.attendingusers.split(',').concat(usernames);
      var newUids = data.id;
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
          var message = "People want you to join the following event: "+eventRecord.name;
          Event.invite({eventid: eventid, emails: data.email, message: message}, function(respDict)
          {
            callback({errCode: 1});
          });
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
  toReturn = {};
  idHash = {};
  idReturn = [];
  emailReturn = [];
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
      if(id.indexOf('@') >= 0)
      {
        emailReturn.push(id);
      }
      else
      {
        geddy.model.User.first({username: id}, function(err, userRecord)
        {
          if(userRecord && userRecord.id)
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
              geddy.model.User.save(userRecord, function(err, result)
              {
                if(!err)
                {
                  emailReturn.push(userRecord.email);
                  idReturn.push(userRecord.id);
                }
              });
            }
          }
        });
      }
    }
  }
  toReturn.id = idReturn;
  toReturn.email = emailReturn;
  return toReturn;
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
        //record.errors = null;
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


  geddy.model.Event.first({id: eventID}, function (err, eventModel) 
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

        if(eventModel)
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

          //Append event data to message
          message = message + "";

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

  var self = this;

  var responseDict = {};

  //eventid
  if(!params.eventid)
  {
    responseDict.errCode = 6;
    responseDict.message = "null eventid";
    callback(responseDict);
    return;
  }

  var eventID = params.eventid;

  if (!params.time1 && !params.time2 && !params.startdate && !params.enddate )
  {
    responseDict.errCode = 6;
    responseDict.message = "all date/time parameters are null";
    callback(responseDict);
    return;
  }

  //time1
  var newTime1;
  if(params.time1) {
    newTime1 = parseFloat(params.time1);
  }

  //time2
  var newTime2;
  if(params.time2) {
    newTime2 = parseFloat(params.time2);
  }

  //startdate
  var newstartdate;
  if(params.startdate) {
    newstartdate = parseFloat(params.startdate);
  }

  //enddate
  var newEndDate;
  if(params.enddate) {
    newEndDate = parseFloat(params.enddate);
  }


  //get the event
  geddy.model.Event.first({id: eventID}, function (err, eventModel) 
    {

      if (err){
        //handle error
        responseDict.errCode = 7;
        responseDict.message = "database error";
        callback(responseDict);
        return;
      } 
      else 
      {

        if(!eventModel)
        {
          //event model for this id not found
          responseDict.errCode = 10;
          responseDict.message = "invalid eventid";
          callback(responseDict);
          return;

        }
        else
        {

          //set fields if neccesary
          if (newTime1) {
            eventModel.time1 = newTime1;
          }

          if (newTime2) {
            eventModel.time2 = newTime2;
          }

          if (newstartdate) {
            eventModel.startdate = newstartdate;
          }

          if (newEndDate) {
            eventModel.enddate = newEndDate;
          }
        }

        //check to see if fields are valid
        if(eventModel.time1 >= eventModel.time2)
        {
          responseDict.errCode = 11;
          responseDict.message = "invalid times";
          callback(responseDict);
          return;
        }

        if(eventModel.startdate >= eventModel.enddate)
        {
          responseDict.errCode = 11;
          responseDict.message = "invalid dates";
          callback(responseDict);
          return;
        }


        //save model!
        geddy.model.Event.save(eventModel, function(err, result)
        {
          if(err)
          {
            responseDict.errCode = 7;
            responseDict.message = "database error";
            callback(responseDict);
            return;

          } 
          else if (result)
          {
            //save succeded
            responseDict.errCode = 1;
            callback(responseDict);
            return;
          } 
          else
          {
            responseDict.errCode = 7;
            responseDict.message = "database error";
            callback(responseDict);
            return;            
          }
        });
      }
    });
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
var passport = require('passport')
  , passportHelper = require('../helpers/passport/index')
  , cryptPass = passportHelper.cryptPass;

var User = function () {
	this.property('username', 'string', {required: true});
    this.property('password', 'string', {required: true});
    this.property('familyName', 'string');
    this.property('givenName', 'string');
    this.property('email', 'string');
    this.property('myevents', 'string');
    this.validatesLength('username', {min: 3, max:128});
    this.validatesLength('password', {min: 8, max:128});
    this.validatesConfirmed('password', 'confirmPassword');

    this.hasMany('Passports');
};

User.add = function(user, callback){
    // Non-blocking uniqueness checks are hard
    User.first({username: user.username}, function(err, data) {
      var responseDict = {};
    if (data) {
      // console.log("USER EXISTS");
      //Username Exists errCode=2
      responseDict.errCode = 2;
      callback(responseDict);
      //self.transfer('add');
    }
    else {
      // console.log("USER DOESNT EXIST");
      if (!user.username || user.username.length === 0 || user.username.length > 128) {
        // console.log("bad username block");
        responseDict.errCode = 3; //"ERR_BAD_USERNAME"
        callback(responseDict);
      } else if (!user.password || user.password.length === 0 || user.password.length > 128 ) {
        //|| user.confirmPassword != user.password){
        // console.log("bad password block with confirmPassword: " + user.confirmPassword);
        //Check if password is not empty and <128 chars
        responseDict.errCode = 4; //"ERR_BAD_PASSWORD"
        callback(responseDict);
      } else {
        if (user.isValid()) {
          user.password = cryptPass(user.password);
        }
        // console.log("user is : username: " + user.username + " and password: " + user.password);
        user.save(function(err, data) {
          // console.log("Got Data: " + data);
          if (err) {
            // params.errors = err;
            //Database Error errCode=7
            console.log("Error saving User: ");
            responseDict.message = "";
            for (var item in err){
              responseDict.message += err[item];
            }
            console.log(responseDict.message);
            responseDict.errCode = 7;
            callback(responseDict);
            // self.transfer('add');
          }
          else {
            //Success errCode=1
            responseDict.errCode = 1;
            callback(responseDict);
              // self.redirect({controller: self.name});
          }
        });
      }
    }
    });
};

User.getUsernames = function(callback)
{
  usernames = [];
  geddy.model.User.all(function(err, result)
  {
    for(var key in result)
    {
      usernames.push(result[key].username);
    }
    usernames.sort();
    callback(usernames);
  });
};

User.TESTAPI_resetFixture = function (callback) {
  geddy.model.User.all(function (err, result) {
     // console.log("got all users models with error: " + err + " and result: " + result);
    for (var userModel in result){
       // console.log("trying to remove userModel: " + result[userModel]);
      geddy.model.User.remove(result[userModel].id);
    }
    var responseDict = {};
  responseDict.errCode = 1;
    callback(responseDict); //"SUCCESS"
  });
};

User = geddy.model.register('User', User);}());

(function () {
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
    lowprice: {type: 'number'},
    highprice: {type: 'number'},
    lownumparticipants: {type: 'number'},
    highnumparticipants: {type: 'number'},
    latitude: {type: 'number'},
    longitude: {type: 'number'},
    duration: {type: 'number'}
  });

};

var geoSearchHelper = function (records, lat, myLong, callback)
{
  var consDist = 69.1
    , consAng = 57.3
    , returnRecords = []
    , count = 0
    , idx;
  for (idx in records)
  {
    var record = records[idx];
    //using a geo dist equation
    var dist = Math.sqrt(Math.pow(record.latitude - lat, 2) + Math.pow((record.longitude - myLong) * Math.cos(lat / 57.3), 2));
    record.distance = dist*100;
    returnRecords.push(record);
    count = count + 1;
  }
  if (returnRecords.length > 0){
    returnRecords.sort(function (recA, recB) {return recA.distance - recB.distance;});
  }
  // console.dir(returnRecords);
  callback(returnRecords, count);
};

Activity.add = function (parameterDict, callback){

  var self = this;

  var respDict = {};

  // console.log("reached model create");
  // console.dir(parameterDict);


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
  // console.log("LOWPRICE = " + parameterDict.lowprice);
  // console.log("HIGHPRICE = " + parameterDict.highprice);
  if ((parameterDict.lowprice) === "0" || (parameterDict.lowprice === 0))
  {
    activityDict.lowprice = 0;

  } else if (!parameterDict.lowprice) 
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
  if ((parameterDict.highprice === "0") || (parameterDict.highprice === 0))
  {
    activityDict.highprice = 0;
    
  } else if (!parameterDict.highprice) 
  {
    respDict.errCode = 6;
    respDict.message = "null highprice";
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
    if(activityDict.duration <= 0 ){
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
        // console.log("activity does not exists yet, so we continue to create it");
        //all checks pass
        // console.log("ACTIVITY DICT: ");
        // console.dir(activityDict);

        var activityRecord = geddy.model.Activity.create(activityDict);

        // console.log("ACTIVITY RECORD: ");
        // console.dir(activityRecord);

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
  var respDict = {};
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
    if(myLat && myLong && (typeof myLat == 'number') && (typeof myLong == 'number'))
    {
      // console.log("Calling geoSearchHelper");
      geoSearchHelper(activities, myLat, myLong, function (returnRecords, count)
      {
        callback(returnRecords);
      });
    }
    else
    {
      // console.log("Not using geoSearchHelper");
      callback(activities);
    }
  });
};    

Activity.TESTAPI_resetFixture = function (callback) {
  geddy.model.Activity.all(function (err, result) {
    // console.log("got all activity models with error: " + err + " and result: " + result);
    for (var activityModel in result){
      // console.log("trying to remove activityModel: " + result[activityModel]);
      geddy.model.Activity.remove(result[activityModel].id);
    }
    var responseDict = {};
  responseDict.errCode = 1;
    callback(responseDict); //"SUCCESS"
  });
};   

Activity = geddy.model.register('Activity', Activity);
}());