/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/
var strategies = require('../helpers/passport/strategies')
  , authTypes = geddy.mixin(strategies, {local: {name: 'local account'}});
// var runTests = require('../../test/runTests.js');

var Main = function () {

  this.index = function (req, resp, params) {
    var self = this;


    geddy.io.sockets.on('connection', function(socket) {
      setTimeout(function(){ 
        socket.on('bobReturn', function (message){
          console.log("GOT BOB RETURN!!!");
        });
        socket.emit('bobEvent', {message:"This is a bob event from main."});
      }, 500);
      
    });


    var localParams = params;
    if (!localParams.errCode){
      localParams.errCode = 0;
    }
    if (!localParams.methodType){
      localParams.methodType = 0;
    }
    console.log("params.methodType =" + params.methodType + " and params.errCode =" + params.errCode);
    console.log("this.session.get('userId') = " + this.session.get('userId'));
    if (!this.session.get('userId')){
      this.session.set('userId', 0);
    }
    geddy.model.User.first({id: this.session.get('userId')}, function (err, data) {
      var params = localParams;
      params.user = null;
      params.authType = null;
      if (data) {
        console.log("Got User: " + data);
        params.user = data;
        params.authType = authTypes[self.session.get('authType')].name;
      }
      console.log("Params.User = " + params.user);
      self.respond(params, {
        format: 'html'
      , template: 'app/views/main/index'
      });
    });
  };

  this.login = function (req, resp, params) {
    //Check if redirected with errCode,
    //Otherwise it is 0
    if (!params.errCode){
      params.errCode = 0;
    }
    //If errCode = 1, this means we successfully created an account

    this.respond(params, {
      format: 'html'
    , template: 'app/views/main/login'
    });
  };

  this.logout = function (req, resp, params) {
    this.session.unset('userId');
    this.session.unset('authType');
    this.respond(params, {
      format: 'html'
    , template: 'app/views/main/logout'
    });
  };


  // this.unitTests = function (req, resp, params) {
  //   var self = this;
  //   runTests(function (answerDict) {
  //     console.log("responding from unitTests");
  //     self.respond(answerDict, {format: 'json'});
  //   });
  // };

};

exports.Main = Main;


