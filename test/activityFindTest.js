var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity;

var resetFixture = function (done){
    Activity.TESTAPI_resetFixture(function(){
        User.TESTAPI_resetFixture(function(){
            done();
        });
    });
};


describe('Activity', function(){
    beforeEach(function(done) {
        //Erase database
        resetFixture(done);
    });

    describe('Activity.search any time', function(){
        it('should return errCode:1', function(done){
            var activityDict = {};
            activityDict.name = 'jogging';
            activityDict.description = 'go for a run with some friends!';
            activityDict.category = 'Sports';
            // activityDict.time1 = undefined;
            // activityDict.time2 = undefined;
            activityDict.flag = 'anyTime';
            // activityDict.begindate = undefined;
            // activityDict.enddate = undefined;
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lownumparticipants = '1';
            // activityDict.highnumparticipants = undefined;
            // activityDict.latitude = undefined;
            // activityDict.longitude = undefined;
            activityDict.duration = '2';
            Activity.add(activityDict, function(response)
            {    
                var params = activityDict;
                var hour = 3600000;
                //We want to assure ourselves that the model only gets the relevant params and not anything extra
                //I use default values for fields that are left blank to make for easier queries in the model
                var queryInfo = {};
                if(params.name && (typeof params.name == 'string'))
                {
                  queryInfo.name = {'like': params.name};
                }
                if (params.time1)
                {
                  queryInfo.time1 = {gt: Math.max(parseFloat(params.time1) - hour,0)};
                }

                if (params.time2)
                {
                  queryInfo.time2 = {lt: Math.max(parseFloat(params.time2) + hour, 0)};
                }

                if (params.beginDate)
                {
                  queryInfo.beginDate = {gt: parseFloat(params.beginDate)};
                }

                if (params.endDate)
                {
                  queryInfo.endDate = {lt: parseFloat(params.beginDate)};
                }

                if (params.flag && (typeof params.time1 == 'string'))
                {
                  queryInfo.flag = params.flag;
                }

                if (params.lowPrice)
                {
                  queryInfo.lowPrice = {gt: Math.floor(parseFloat(params.lowPrice) * 0.75)};
                }

                if (params.highPrice)
                {
                  queryInfo.highPrice = {lt: Math.ceil(parseFloat(params.highPrice) * 1.25)};
                }

                if (params.lowNumParticipants)
                {
                  queryInfo.lowNumParticipants = {gt: Math.floor(parseFloat(params.lowNumParticipants) * 0.90)};
                }

                if (params.highNumParticipants)
                {
                  queryInfo.highNumParticipants = {lt: Math.ceil(parseFloat(params.highNumParticipants) * 1.1)};
                }

                if (params.category && (typeof params.category == 'string'))
                {
                  queryInfo.category = params.category;
                }
                Activity.search(activityDict, null/*myLat*/, null/*myLong*/, function(response)
                {
                    assert.equal(response.length, 1);
                    done();
                });
            });
        });
    });

    describe('Activity.search specific date/time', function(){
        it('should return errCode:1', function(done){
            var activityDict = {};
            activityDict.name = 'backstreet boys concert';
            activityDict.description = 'I want it that way...';
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';

            Activity.add(activityDict, function(response)
            {
                var params = activityDict;
                var hour = 3600000;
                //We want to assure ourselves that the model only gets the relevant params and not anything extra
                //I use default values for fields that are left blank to make for easier queries in the model
                var queryInfo = {};
                if(params.name && (typeof params.name == 'string'))
                {
                  queryInfo.name = {'like': params.name};
                }
                if (params.time1)
                {
                  queryInfo.time1 = {gt: Math.max(parseFloat(params.time1) - hour,0)};
                }

                if (params.time2)
                {
                  queryInfo.time2 = {lt: Math.max(parseFloat(params.time2) + hour, 0)};
                }

                if (params.beginDate)
                {
                  queryInfo.beginDate = {gt: parseFloat(params.beginDate)};
                }

                if (params.endDate)
                {
                  queryInfo.endDate = {lt: parseFloat(params.beginDate)};
                }

                if (params.flag && (typeof params.time1 == 'string'))
                {
                  queryInfo.flag = params.flag;
                }

                if (params.lowPrice)
                {
                  queryInfo.lowPrice = {gt: Math.floor(parseFloat(params.lowPrice) * 0.75)};
                }

                if (params.highPrice)
                {
                  queryInfo.highPrice = {lt: Math.ceil(parseFloat(params.highPrice) * 1.25)};
                }

                if (params.lowNumParticipants)
                {
                  queryInfo.lowNumParticipants = {gt: Math.floor(parseFloat(params.lowNumParticipants) * 0.90)};
                }

                if (params.highNumParticipants)
                {
                  queryInfo.highNumParticipants = {lt: Math.ceil(parseFloat(params.highNumParticipants) * 1.1)};
                }

                if (params.category && (typeof params.category == 'string'))
                {
                  queryInfo.category = params.category;
                }
                Activity.search(queryInfo, null/*myLat*/, null/*myLong*/, function(response)
                {
                    assert.equal(response.length, 1);
                    done();
                });
            });
        });
    });

    describe('Activity.search no description', function(){
        it('should return errCode:1', function(done){
            var activityDict = {};
            activityDict.name = 'Rock the Bells';
            // activityDict.description = undefined;
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';
            
            Activity.add(activityDict, function(response)
            {
                var params = activityDict;
                var hour = 3600000;
                //We want to assure ourselves that the model only gets the relevant params and not anything extra
                //I use default values for fields that are left blank to make for easier queries in the model
                var queryInfo = {};
                if(params.name && (typeof params.name == 'string'))
                {
                  queryInfo.name = {'like': params.name};
                }
                if (params.time1)
                {
                  queryInfo.time1 = {gt: Math.max(parseFloat(params.time1) - hour,0)};
                }

                if (params.time2)
                {
                  queryInfo.time2 = {lt: Math.max(parseFloat(params.time2) + hour, 0)};
                }

                if (params.beginDate)
                {
                  queryInfo.beginDate = {gt: parseFloat(params.beginDate)};
                }

                if (params.endDate)
                {
                  queryInfo.endDate = {lt: parseFloat(params.beginDate)};
                }

                if (params.flag && (typeof params.time1 == 'string'))
                {
                  queryInfo.flag = params.flag;
                }

                if (params.lowPrice)
                {
                  queryInfo.lowPrice = {gt: Math.floor(parseFloat(params.lowPrice) * 0.75)};
                }

                if (params.highPrice)
                {
                  queryInfo.highPrice = {lt: Math.ceil(parseFloat(params.highPrice) * 1.25)};
                }

                if (params.lowNumParticipants)
                {
                  queryInfo.lowNumParticipants = {gt: Math.floor(parseFloat(params.lowNumParticipants) * 0.90)};
                }

                if (params.highNumParticipants)
                {
                  queryInfo.highNumParticipants = {lt: Math.ceil(parseFloat(params.highNumParticipants) * 1.1)};
                }

                if (params.category && (typeof params.category == 'string'))
                {
                  queryInfo.category = params.category;
                }
                Activity.search(queryInfo, null/*myLat*/, null/*myLong*/, function(response)
                {
                    assert.equal(response.length, 1);
                    done();
                });
            });
        });
    });

describe('Activity.search geoSearch', function(){
        it('should return errCode:1 and exercise geoSearch', function(done){
            var activityDict = {};
            activityDict.name = 'Rock the Bells';
            // activityDict.description = undefined;
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';
            
            Activity.add(activityDict, function(response)
            {
                var params = activityDict;
                var hour = 3600000;
                //We want to assure ourselves that the model only gets the relevant params and not anything extra
                //I use default values for fields that are left blank to make for easier queries in the model
                var queryInfo = {};
                if(params.name && (typeof params.name == 'string'))
                {
                  queryInfo.name = {'like': params.name};
                }
                if (params.time1)
                {
                  queryInfo.time1 = {gt: Math.max(parseFloat(params.time1) - hour,0)};
                }

                if (params.time2)
                {
                  queryInfo.time2 = {lt: Math.max(parseFloat(params.time2) + hour, 0)};
                }

                if (params.beginDate)
                {
                  queryInfo.beginDate = {gt: parseFloat(params.beginDate)};
                }

                if (params.endDate)
                {
                  queryInfo.endDate = {lt: parseFloat(params.beginDate)};
                }

                if (params.flag && (typeof params.time1 == 'string'))
                {
                  queryInfo.flag = params.flag;
                }

                if (params.lowPrice)
                {
                  queryInfo.lowPrice = {gt: Math.floor(parseFloat(params.lowPrice) * 0.75)};
                }

                if (params.highPrice)
                {
                  queryInfo.highPrice = {lt: Math.ceil(parseFloat(params.highPrice) * 1.25)};
                }

                if (params.lowNumParticipants)
                {
                  queryInfo.lowNumParticipants = {gt: Math.floor(parseFloat(params.lowNumParticipants) * 0.90)};
                }

                if (params.highNumParticipants)
                {
                  queryInfo.highNumParticipants = {lt: Math.ceil(parseFloat(params.highNumParticipants) * 1.1)};
                }

                if (params.category && (typeof params.category == 'string'))
                {
                  queryInfo.category = params.category;
                }
                Activity.search(queryInfo, 10/*myLat*/, 10/*myLong*/, function(response)
                {
                    assert.equal(response.length, 1);
                    done();
                });
            });
        });
    });

});
