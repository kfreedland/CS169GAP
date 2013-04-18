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
      addCommentCallback(7, callback);

    } else if (userRecord){

      //create comment and add it to event
      geddy.model.Event.first({id:eventID}, function(err, eventRecord){

        if(err){

          //database error
          addCommentCallback(7, callback);


        } else if (eventRecord){

          //create comment and add to event
          var commentDict = {};
          commentDict.text = text;
          commentDict.userid = userID;
          var commentRecord = geddy.model.Comment.create(commentDict);
          geddy.model.Comment.save(commentRecord, function(err, commentModel){

            //add to event
            var comments = eventRecord.comments;
            var commentList = comments.split(',');
            commentList.push(commentModel.id);
            eventRecord.comments = commentList.join(',');

            eventRecord.save(function(err, result){

              if(err){

                //database error
                addCommentCallback(7, callback);


              } else {

                //succeeded
                addCommentCallback(1, callback);

              }

            });

          });

        } else {

          //event doesn't exist
          addCommentCallback(10, callback);

        }

      });

    } else {

      //user does not exist
      addCommentCallback(10, callback);

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

  geddy.model.Event.first({id:eventID}, function(err, eventRecord){

    if(err){

      //database error
      getCommentsCallback(7, null, callback);

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

    }

  });

}


function getCommentsCallback(errCode, comments, callback){
var responseDict = {};
responseDict.errCode = errCode;
responseDict.comments = comments;
callback(responseDict);
}

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

