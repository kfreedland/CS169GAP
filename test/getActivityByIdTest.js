var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity;

var resetFixture = function (done){
    Activity.TESTAPI_resetFixture(function(){
        done();
    });
};


describe('Activity', function(){
    beforeEach(function(done) {
        //Erase database
        resetFixture(done);
    });

    describe('Activity.getById valid id', function(){
        it('should return errCode:1', function(done){
            var activityDict = {};
            activityDict.name = 'jogging';
            activityDict.description = 'go for a run with some friends!';
            activityDict.category = 'Sports';
            activityDict.time1 = undefined;
            activityDict.time2 = undefined;
            activityDict.flag = 'anyTime';
            activityDict.begindate = undefined;
            activityDict.enddate = undefined;
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = undefined;
            activityDict.latitude = undefined;
            activityDict.longitude = undefined;
            activityDict.duration = '2';

            Activity.add(activityDict, function(response)
            {
                var expected = {errCode: 1};
                assert.deepEqual(response,expected);

                geddy.model.Activity.first({name: activityDict.name}, function (err, activityModel) {
                    Activity.getById(activityModel.id, function (responseDict) {
                        assert.equal(responseDict.errCode, 1);
                        assert.equal(responseDict.activity.id, activityModel.id);
                        done();
                    });
                });
            });
        });
    });

    describe('Activity.getById invalid id', function(){
        it('should return errCode:1', function(done){
            var activityDict = {};
            activityDict.name = 'jogging';
            activityDict.description = 'go for a run with some friends!';
            activityDict.category = 'Sports';
            activityDict.time1 = undefined;
            activityDict.time2 = undefined;
            activityDict.flag = 'anyTime';
            activityDict.begindate = undefined;
            activityDict.enddate = undefined;
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = undefined;
            activityDict.latitude = undefined;
            activityDict.longitude = undefined;
            activityDict.duration = '2';

            Activity.add(activityDict, function(response)
            {
                var expected = {errCode: 1};
                assert.deepEqual(response,expected);

                Activity.getById("12345", function (responseDict) {
                    assert.equal(responseDict.errCode, 7);
                    assert.equal(responseDict.activity, null);
                    done();
                });
            });
        });
    });

    describe('Activity.getById missing id', function(){
        it('should return errCode:1', function(done){
            var activityDict = {};
            activityDict.name = 'jogging';
            activityDict.description = 'go for a run with some friends!';
            activityDict.category = 'Sports';
            activityDict.time1 = undefined;
            activityDict.time2 = undefined;
            activityDict.flag = 'anyTime';
            activityDict.begindate = undefined;
            activityDict.enddate = undefined;
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = undefined;
            activityDict.latitude = undefined;
            activityDict.longitude = undefined;
            activityDict.duration = '2';

            Activity.add(activityDict, function(response)
            {
                var expected = {errCode: 1};
                assert.deepEqual(response,expected);

                Activity.getById(null, function (responseDict) {
                    assert.equal(responseDict.errCode, 6);
                    assert.equal(responseDict.activity, null);
                    done();
                });
            });
        });
    });
});