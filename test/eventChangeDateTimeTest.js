var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity
  , Event = geddy.model.Event;

var resetFixture = function (done){
	Activity.TESTAPI_resetFixture(function(){
		done();
	});
};

describe('eventChangeDateTime', function(){
	before(function(done) {
		//Erase database
		resetFixture(done);
	});