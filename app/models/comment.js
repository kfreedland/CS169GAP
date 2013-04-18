var Comment = function () {

  this.defineProperties({
    userid: {type: 'string'},
    text: {type: 'string'}
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


Comment.addComment = function(eventID, userID, text, callback)
{

  if(!eventID){
    addCommentCallback(6, callback);
    return;
  }

  if(!userID){
    addCommentCallBack(6, callback);
    return;
  }

  if(!text){
    addCommentCallBack(6, callback);
    return;
  }

  if(text == ''){
    addCommentCallBack(6, callback);
    return;
  }

  //check if userid is valid
  geddy.model.User.first({id:userID}, function(err,userRecord){

    if(err){

      //database error
      console.log("err in looking up user");
      addCommentCallback(7, callback);
      return;

    } else if (userRecord){

      console.log("successfully found user");

      //create comment and add it to event
      geddy.model.Event.first({id:eventID}, function(err, eventRecord){

        if(err){

          //database error
          console.log("err in looking up eventID");
          addCommentCallback(7, callback);
          return;

        } else if (eventRecord){

          console.log("successfully found event");

          //create comment and add to event
          var commentDict = {};
          commentDict.text = text;
          commentDict.userid = userID;
          var commentRecord = geddy.model.Comment.create(commentDict);
          console.log("created comment record:");
          console.dir(commentRecord);
          geddy.model.Comment.save(commentRecord, function(err, result){

            if (err){
              console.log("Got error saving comment:");
              console.dir(err);

              addCommentCallback(7, callback);
              return;

            } else if (commentRecord){
              //add to event

              console.log("successfully saved Comment");
              var comments = eventRecord.comments;
              if (!comments){
                console.log("event's comments are null");
                comments = "";
              }
              var commentList = comments.split(',');
              commentList.push(commentRecord.id);
              eventRecord.comments = commentList.join(',');

              eventRecord.save(function(err, result){

                if(err){

                  //database error
                  console.log("err in saving event with Comment");
                  addCommentCallback(7, callback);
                  return;

                } else {

                  //succeeded
                  console.log("saving event with comment succeeded");
                  addCommentCallback(1, callback);
                  return;
                }

              });
            } else {

              //comment.save failed
              console.log("comment.save returned nothing  ");
              addCommentCallback(7, callback);



            }

          });

        } else {

          //event doesn't exist
          console.log("event doesn't exist");
          addCommentCallback(10, callback);
          return;
        }

      });

    } else {

      //user does not exist
      console.log("user doesn't exist");
      addCommentCallback(10, callback);
      return;
    }

  });

}

function addCommentCallback(errCode, callback){
  var responseDict = {};
  responseDict.errCode = errCode;
  callback(responseDict);
}


Comment.getCommentsForEvent = function(eventID, callback)
{

  //get event
  geddy.model.Event.first({id:eventID}, function(err, eventRecord){

    if(err){

      //database error
      getCommentsCallback(7, null, callback);
      return;

    } else if (eventRecord){

      //get comments
      var commentIDsString = eventRecord.comments;
      var commentIDsList = commentIDsString.split(',');

      var commentListToReturn = [];

      for (var index in commentIDsList){

        var currentCommentID = commentIDsList[index];
        geddy.model.Comment.first({id:currentCommentID}, function(err, commentRecord){

          if(err){

            //database error
            getCommentsCallback(7, null, callback);
            return;

          } else if (commentRecord){

            //add comment to list
            commentListToReturn.push(commentRecord);

            if(commentListToReturn.length == commentIDsList.length){

              //return 
              getCommentsCallback(1, commentListToReturn, callback);
              return;

            }
          }
        });

      }

    } else {

      //event doesn't exist
      getCommentsCallback(10, null, callback);
      return;

    }

  });

}


function getCommentsCallback(errCode, comments, callback){
  var responseDict = {};
  responseDict.errCode = errCode;
  responseDict.comments = comments;
  callback(responseDict);
}

Comment.TESTAPI_resetFixture = function (callback) {
  geddy.model.Comment.all(function (err, result) {
    // console.log("got all activity models with error: " + err + " and result: " + result);
    for (var commentModel in result){
      // console.log("trying to remove activityModel: " + result[activityModel]);
      geddy.model.Comment.remove(result[commentModel].id);
    }
    var responseDict = {};
    responseDict.errCode = 1;
    callback(responseDict); //"SUCCESS"
  });
};  

/*
// Can also define them on the prototype
Comment.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Comment.someStaticMethod = function () {
  // Do some other stuff
};
Comment.someStaticProperty = 'YYZ';
*/

Comment = geddy.model.register('Comment', Comment);

