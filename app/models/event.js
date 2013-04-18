var nodemailer = require("nodemailer")
  , check = require("validator").check
  , blade = require("blade");

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
    comments: {type: 'string'},
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
  if(params.inviterId && params.name && params.begindate && params.enddate && params.time1  && params.time2 && params.activityid && params.attendingusers)
  {
    var idsOrEmails = params.attendingusers.split(',');
    getEmailAndId(idsOrEmails, callback, function(emailAndId)
    {
      var emails = emailAndId.email;
      var userIds = emailAndId.id;
      if (!userIds){
        userIds = "";
      }
      geddy.model.Activity.first({id: params.activityid}, function(err, activityRecord)
      {
        if(activityRecord && activityRecord.name) //basic assertion that record exists
        {
          if(params.begindate <= params.enddate && params.time1 <= params.time2)
          {
            //all required fields are valid
            eventDict = {};
            eventDict.name = params.name;
            eventDict.begindate = params.begindate;
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
                console.log("error in event.save in Event.add");
                console.dir(err);
                callback(backendError);
              }
              else
              {
                //find inviter info
                geddy.model.User.first({id: params.inviterId}, function(err, inviterRecord)
                {
                  var intviterUsername = inviterRecord.username;
                  var inviterFullName = inviterRecord.givenName +" " + inviterRecord.familyName;
                  userIds.push(intviterUsername);

                  addEventToUsers(eventModel.id, userIds, function(respDict)
                  {
                    if(params.noemail)
                    {
                      callback(respDict);
                    }
                    else
                    {
                      var message = inviterFullName + " wants you to join the following event: " + params.name + " if you haven't signed up with Group Activity Planner check it out!";
                      Event.invite({eventid: eventModel.id, emails: emails, userIds: userIds, message: message}, function()
                      {
                        callback(respDict);
                      });
                    }
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
          console.log("BAD TABLE JOIN IN ACTIVITY.ADD activityrecord && activityrecord.name");
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

//first time you create an event gets all emails and ids
function getEmailAndId(usernamesOrEmails, errorCallback, successCallback)
{
  emails = [];
  userIds = [];
  for(var key in usernamesOrEmails)
  {
    var id = usernamesOrEmails[key];
    // console.log("id before trim:" + id + '.');
    id = id.trim();
    // console.log("id after trim:" + id + '.');
    // console.log(id);
    if(id.indexOf('@') >= 0) //special characters cant be in usernames only in emails
    {
      geddy.model.User.first({email: id}, function(err, record)
      {
        if(record && record.email && record.username)
        {
          emails.push(record.email);
          userIds.push(record.username);
          if (emails.length === usernamesOrEmails.length)
          {
            result = {};
            result.email = emails;
            result.id = userIds;
            successCallback(result);
          }
        }
        else
        {
          emails.push(id);
          if (emails.length === usernamesOrEmails.length)
          {
            result = {};
            result.email = emails;
            result.id = userIds;
            successCallback(result);
          } 
        }
      });
    }
    else
    {
      geddy.model.User.first({username: id}, function(err, record)
      {
          if(err)
          {
            console.log("error in user.first in Event.add");
            console.dir(err);
            errorCallback(backendError);
          }
          else
          {
            if(record && record.email && record.username)
            {
              //console.log('EMAIL found is: '+record.email);
              emails.push(record.email);
              userIds.push(record.username);
              if (emails.length === usernamesOrEmails.length){
                result = {};
                result.email = emails;
                result.id = userIds;
                successCallback(result);
              }
            }
            else
            {
              console.log("BAD TABLE JOIN IN getEmailAndId record && record.email && record.username");
              errorCallback(badTableJoin);
            }
          }
        });
      }
    }
}

Event.addUsersToEvent = function(eventid, usernames, callback)
{
  console.log("adding users: " + " to event");
  usernames = usernames.split(',');
  geddy.model.Event.first({id: eventid}, function (err, eventRecord)
  {
    if(eventRecord && eventRecord.attendingusers)
    {
      var data = eventRecord.attendingusers.split(',').concat(usernames);
      validateUserIds(data, eventid, function (newUids){
        // console.log("validateUserIds returned");
        if (!newUids){
          newUids = {};
        }
        var usernamesAndEmailsList = [];
        usernamesAndEmailsList.push(newUids.usernames);
        usernamesAndEmailsList.push(newUids.emails);
        console.log("newUids = " + usernamesAndEmailsList);
        console.log("About to add attendingusers: " + usernamesAndEmailsList.toString());
        eventRecord.attendingusers = usernamesAndEmailsList.toString();
        geddy.model.Event.save(eventRecord, function(err, result)
        {
          if(err)
          {
            console.log("error in event.save in Event.addUsersToEvent");
            console.dir(err);
            callback(backendError);
          }
          else
          {
            var message = "You are cordially invited to join the following event: " + eventRecord.name + " login or signup at Group Activity Planner for more details!";
            Event.invite({eventid: eventid, emails: newUids.email, userIds: newUids.id, message: message}, function(respDict)
            {
              callback({errCode: 1});
            });
          }
        });
      });
    }
    else
    {
      console.log("BAD TABLE JOIN IN EVENT.addUsersToEvent eventRecord && eventRecord.name");
      callback(badTableJoin);
    } 
  });
};


Event.removeUserFromEvent = function(eventID, userID, callback)
{
  if(!eventID){
    removeUserFromEventCallBack(6, callback);
    return;
  }

  if(!userID){
    removeUserFromEventCallBack(6, callback);
    return;
  }
  
  geddy.model.User.first({username: userID}, function(err, userRecord) {

    if(err)
    {
      //database error
      console.log("error looking up user");
      removeUserFromEventCallBack(7, callback);
      return;

    } 
    else if (userRecord)
    {

      console.log("found user");
      var userName = userRecord.username;
      //remove username from event attendingusers
      geddy.model.Event.first({id: eventID} , function(err, eventRecord){

        if(eventRecord){

          console.log("found event, event = ");
          console.dir(eventRecord);


          var attendingUsersString = eventRecord.attendingusers;
          var attendingUsersList = attendingUsersString.split(",");
          var usernameIndex = attendingUsersList.indexOf(userRecord);
          if(usernameIndex >= 0){
            attendingUsersList.splice(usernameIndex,1);
            attendingUsersString = attendingUsersList.join(",");
            eventRecord.attendingusers = attendingUsersString;
            eventRecord.save ( function(err, data) {

              if(err){
                //database error
                console.log("error saving event");

                removeUserFromEventCallBack(7, callback);
                return;

              } else {
                //succeeded in removing username from attending users
                console.log("succeeded in removing username from attending users");


                //remove event from user
                var events = userRecord.myevents;
                var eventList = events.split(",");
                var eventIndex = eventList.indexOf(eventID);
                if(eventIndex != -1)
                {
                  eventList.splice(eventIndex,1);
                  var eventString = eventList.join(",");
                  userRecord.myevents = eventString;
                  userRecord.save(function(err, data) {

                    if(err){
                      //database error
                      removeUserFromEventCallBack(7, callback);
                      return;


                    } else {
                      //succeeded in everything
                      removeUserFromEventCallBack(1, callback);
                      return;
                    }

                  });

              }
            }
            
           });

          }

        } else {
          //event does not exist
          console.log("event does not exist in database");

          removeUserFromEventCallBack(10, callback);
          return;

        }

      });

    } else {

      //user does not exist
      console.log("user does not exist in database");

      removeUserFromEventCallBack(10, callback);
      return;
    }
  });
};

function removeUserFromEventCallBack(errCode, callback){
  var responseDict = {};
  responseDict.errCode = errCode;
  callback(responseDict);
}



//validates and returns a list of userids and emails to be added
function validateUserIds(usernameOrEmailArray, eventid, callback) //assumes valid usernames
{
  toReturn = {};
  usernameOrEmailHash = {};
  usernameReturn = [];
  emailReturn = [];
  for(var key in usernameOrEmailArray)
  {
    var usernameOrEmail = usernameOrEmailArray[key];
    //This removes duplicate identifiers
    if(usernameOrEmailHash[usernameOrEmail])
    {
      continue;
    }
    else
    {
      //Set hash to true so we don't add this usernameOrEmail again
      usernameOrEmailHash[usernameOrEmail] = true;
      //If it has @, it is an email
      if(usernameOrEmail.indexOf('@') >= 0)
      {
        geddy.model.User.first({email: usernameOrEmail}, function(err, userRecord)
        {
          if(userRecord && userRecord.username)
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
              userRecord.confirmPassword = userRecord.password;
              userRecord.errors = null;
              geddy.model.User.save(userRecord, function(err, result)
              {
                if(!err)
                {
                  emailReturn.push(userRecord.email);
                  usernameReturn.push(userRecord.username);
                  if (emailReturn.length >= usernameOrEmailArray.length - 1){
                    // console.log("RETURNING FROM VALIDATE");
                    toReturn.usernames = usernameReturn;
                    toReturn.email = emailReturn;
                    callback(toReturn);
                  }
                } else {
                  console.log("emailReturn.length = " + emailReturn.length);
                  console.log("usernameOrEmailArray.length = " + usernameOrEmailArray.length);
                  console.log("error occurred");
                  console.dir(err);
                  callback(toReturn);
                }
              });
            }
          }
          else
          {
            emailReturn.push(usernameOrEmail);
            console.log("emailReturn.length = " + emailReturn.length);
            console.log("usernameOrEmailArray.length = " + usernameOrEmailArray.length);
            if (emailReturn.length >= usernameOrEmailArray.length - 1)
            {
              // console.log("RETURNING FROM VALIDATE");
              toReturn.usernames = usernameReturn;
              toReturn.email = emailReturn;
              callback(toReturn);
            }
          }
        });
      }
      else
      {
        geddy.model.User.first({username: usernameOrEmail}, function(err, userRecord)
        {
          if(userRecord && userRecord.username)
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
              userRecord.confirmPassword = userRecord.password;
              userRecord.errors = null;
              geddy.model.User.save(userRecord, function(err, result)
              {
                if(!err)
                {
                  emailReturn.push(userRecord.email);
                  usernameReturn.push(userRecord.username);
                  if (emailReturn.length >= usernameOrEmailArray.length - 1){
                    // console.log("RETURNING FROM VALIDATE");
                    toReturn.usernames = usernameReturn;
                    toReturn.email = emailReturn;
                    callback(toReturn);
                  }
                } else {
                  console.log("emailReturn.length = " + emailReturn.length);
                  console.log("usernameOrEmailArray.length = " + usernameOrEmailArray.length);
                  console.log("error occurred");
                  console.dir(err);
                  callback(toReturn);
                }
              });
            }
          }
        });
      }
    }
  }
}

function addEventToUsers(eventid, userIds, callback)
{
  var numberOfUsersAdded = 0;
  for(var key in userIds)
  {
    var uid = userIds[key];
    geddy.model.User.first({username: uid}, function(err, userRecord)
    {
      numberOfUsersAdded++;
      if(err)
      {
        console.log("error in user.first in Event.addEventToUsers");
        console.dir(err);
        callback(backendError);
      }
      else
      {
        if(userRecord && userRecord.myevents)
        {
          userRecord.myevents += ","+eventid;
        }
        else
        {
          userRecord.myevents = eventid;
        }
        userRecord.confirmPassword = userRecord.password;
        userRecord.errors = null;
        geddy.model.User.save(userRecord, function(err, result)
        {
          if(err)
          {
            console.log("error in event.save in Event.addEventToUsers");
            console.dir(err);
            callback(backendError);
          } else if (numberOfUsersAdded >= userIds.length)
          {
            console.log("numberOfUsersAdded >= userIds.length");
            callback({errCode: 1}); //success!
          }
        });
      }
    });
  }
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
  var userIds = params.userIds;

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
        console.log("err");
        console.dir(err);
        responseDict.errCode = 7;
        responseDict.message = "database error";
        callback(responseDict);
        return;
      } 
      else 
      {

        if(eventModel)
        {
          //Send real-time notifications
          var params = {};
          params.userIds = userIds;
          params.eventModel = eventModel;
          emitEventForUserIds(params);


          //invite all emails

          // create reusable transport method (opens pool of SMTP connections)
          var smtpTransport = nodemailer.createTransport("SMTP",{
              service: "Gmail",
              auth: {
                user: "groupactivityplanner.gap@gmail.com",
                pass: "gapgapgap"
              }
              // auth: {
              //     user: "groupactivityplanner@gmail.com",
              //     pass: "gapgapgap"
              // }
          });

          //Append event data to message
          blade.compileFile('app/helpers/templates/bladeEmailTemplate.blade', function (err, tmpl) {
            //console.log("Compiled Blade File");
            if (!err && tmpl){
              //Look up activity info
              geddy.model.Activity.first({id: eventModel.activityid}, function (err, activityModel) {
                if (activityModel){
                  //TODO Get Location
                  reverseGeocodeAddressForActivity(activityModel, function(address) {
                    //Convert time to human readable
                    var time1 = convertMsToString(eventModel.time1);
                    var time2 = convertMsToString(eventModel.time2);
                    eventModel.time1 = time1;
                    eventModel.time2 = time2;
                    //Convert date to human readable
                    var beginDate = new Date(eventModel.begindate);
                    var endDate = new Date(eventModel.enddate);
                    eventModel.begindate = beginDate.toDateString();
                    eventModel.enddate = endDate.toDateString();
                    var templateVars = {
                      event: eventModel,
                      activity: activityModel,
                      message: message,
                      location: address
                    };

                    var templateHTML = tmpl(templateVars, function(err, html) {
                        //console.log("GOT HTML");
                        if(err) throw err;

                        var templateHTML = null;
                        if (html){
                          templateHTML = html;
                        }

                        var mailOptions = {
                            from: "Group Activity Planner ✔ <groupactivityplanner@gmail.com>", // sender address
                            to: goodEmailsString, // list of receivers
                            subject: "You have been invited to an event!", // Subject line
                            text: null, // plaintext body
                            html: templateHTML // html body
                        };

                        // send mail with defined transport object
                        smtpTransport.sendMail(mailOptions, function(error, response){
                            if(error){
                                console.log("error");
                                console.dir(error);
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
                    });
                  });
                }
              });
              
            } else {
              console.log("err =");
              console.dir(err);
              responseDict.errCode = 13;
              responseDict.message = "email failed";
              callback(responseDict);
            }


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

function emitEventForUserIds (params) {
  for (var key in params.userIds)
  {
    var userId = params.userIds[key];
    var eventName = userId + 'InviteEvent';
    console.log("Emitting event: " + eventName);
    geddy.io.sockets.emit(eventName, {eventId: params.eventModel.id, eventName: params.eventModel.name});

    //Update user's notification number
    geddy.model.User.first({username: userId}, function (err, userModel){
      console.log("About to increment mynotifications");
      if (!err && userModel){
        console.log("userModel exists and no err so incrementing mynotifications");
        if (userModel.mynotifications){
          userModel.mynotifications += 1;
        } else {
          userModel.mynotifications = 1;
        }
        console.log("mynotifications = " + userModel.mynotifications);
        userModel.errors = null;
        userModel.save(function (err, result){
          //do nothing
          if (err){
            console.log("Got error when saving user after updating notification number: ");
            console.dir(err);
          }
        });
      }
    });
  }
}

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

function reverseGeocodeAddressForActivity(activityModel, callback) {
  if (activityModel.latitude && activityModel.longitude){
    var gm = require('googlemaps');
    var util = require('util');

    var latLong = activityModel.latitude + ',' + activityModel.longitude;
    gm.reverseGeocode(latLong, function(err, data){
      if (err){
        callback(null);
      }
       else 
      {
        var address = '';
        if (data.status == "OK") {
          address = data.results[0].formatted_address;
        }
        callback(address);
      }
    });
  } else {
    callback(null);
  }
}
function convertMsToString(time) {
  // Create a Date object with that time as the milliseconds
  var d = new Date(0,0,0,0,0,0,time);
  var hours = d.getHours();
  var hoursStr = hours.toString();
  var minutes = d.getMinutes();
  var minutesStr = minutes.toString();
  var am_pm = 'AM';

  // Change from 24-hr clock time to 12-hr clock time
  if (hours === 12) {
    am_pm = 'PM';
  } else if (hours > 12) {
    hours = hours % 12;
    am_pm = 'PM';
    hoursStr = hours.toString();
  }
  // Add the '0' before the minutes if less than 10 minutes
  if (minutes < 10) {
    minutesStr = '0' + minutesStr;
  }

  // Create the string in the proper format HH:MM(AM/PM)
  var dateString = hoursStr + ':' + minutesStr + am_pm;
  return dateString;
}

Event.changeDateTime = function(params, callback) 
{

  var self = this;
  // console.log("params:");
  // console.dir(params);
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

  if (!params.time1 && !params.time2 && !params.begindate && !params.enddate )
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
  // console.log("params.time2 = " + params.time2);
  var newTime2;
  if(params.time2) {
    newTime2 = parseFloat(params.time2);
  }
  // console.log("NEW TIME 2 = "+ newTime2);

  //begindate
  var newBeginDate;
  if(params.begindate) {
    newBeginDate = parseFloat(params.begindate);
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
        console.log("err change date time");
        console.dir(err);
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
          if ((typeof newTime1) == 'number') {
            eventModel.time1 = newTime1;
          }
          // console.log("newTime2 = " + newTime2);
          if ((typeof newTime2) == 'number') {
            eventModel.time2 = newTime2;
            // console.log("CHANGED TIME 2");
          }

          if ((typeof newBeginDate) == 'number') {
            eventModel.begindate = newBeginDate;
          }

          if ((typeof newEndDate) == 'number') {
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

        // console.log("EVENT MODEL BEGIN DATE" + eventModel.begindate);
        // console.log("EVENT MODEL END DATE" + eventModel.enddate);

        if(eventModel.begindate >= eventModel.enddate)
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
            console.log("error in Event.save in changeDateTime");
            console.dir(err);
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
    var currentEvents = []
        ,  pastEvents = [];
    if (err){
      console.log("error in getMyEvents");
      console.dir(err);
      // console.log("err exists: ");
      // console.dir(err);
      getEventsCallback(7, currentEvents, pastEvents, callback);
    } else {
      if (userModel){
        if (userModel.myevents){
          var eventIds = userModel.myevents.split(',');
          for (var index in eventIds){
            var eventId = eventIds[index];
            geddy.model.Event.first({id: eventId}, function (err, eventModel)
            {
              if (err){
                console.log("error in event.first in getMyEvents");
                console.dir(err);
                getEventsCallback(7, currentEvents, pastEvents, callback);
              } else if (eventModel){
                //console.log("EVENT MODEL:");
                //console.log(eventModel);
                var currentDate = new Date();
                if (eventModel.enddate < currentDate.getTime())
                {
                  pastEvents.push(eventModel);
                } else {
                  currentEvents.push(eventModel);
                }
              }
              if ((currentEvents.length + pastEvents.length) == eventIds.length)
              {
                //Reset mynotifications counter
                userModel.mynotifications = 0;
                userModel.errors = null;
                userModel.save(function (err, result){
                  //Return now
                  getEventsCallback(1, currentEvents, pastEvents, callback);
                });
                // console.log("index = " + index);
              }
            });
          }
        } else {
          getEventsCallback(1, currentEvents, pastEvents, callback);
        }
      }
    }
  });
};

function getEventsCallback(errCode, currentEvents, pastEvents, callback){
  var responseDict = {};
  responseDict.errCode = errCode;
  responseDict.pastEvents = pastEvents;
  responseDict.currentEvents = currentEvents;
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
