var nodemailer = require("nodemailer");


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
    
    callback(responseDict);
    return;
  } 

  if (emailList === null || emailList === undefined || emailList === [] ) 
  {
    //handle empty emails

    callback(responseDict);
    return;
  } 

  //check all emails for propper form
  var badEmails = [];
  var goodEmailsString = "";
  for(var emailAddr in emailList)
  {

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


    callback(responseDict);
    return;
  } 



  geddy.model.Event.first({id: eventID}, function (err, result) 
    {

      if(err){
        //handle error
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
                  console.log(error);
              }else{
                  console.log("Message sent: " + response.message);
              }

              // if you don't want to use this transport object anymore, uncomment following line
              //smtpTransport.close(); // shut down the connection pool, no more messages
          });

        }
      }

    });
}

function isValidEmail(emailAddr)
{
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\
    ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA
    -Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return re.test(email);
}

Event.changeDateTime = function(params, callback) 
{

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

