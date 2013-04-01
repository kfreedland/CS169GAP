// desc('This is the default task.');
// task('default', {async: true}, function (params) {
//   var cmds = [
//     'nodeunit test/test-user.js'
//   ];

//   jake.exec(cmds, function () {
//     console.log('All tests passed.');
//     complete();
//   }, {printStdout: true});
	

//   	//Nodeunit reporter
// 	// var reporter = require('nodeunit').reporters.default;
// 	// reporter.run(['test']);

// });

// var t = new jake.TestTask('GAP', function () {
//   this.testFiles.include('test3/*.js');
//   this.testFiles.include('test3/**/*.js');
// });

var Mocha = require('mocha');

function run_tests(callback){
    var mocha = new Mocha({reporter: 'spec', ui: 'bdd'});
    execute_test_code(mocha, callback);
}

function create_coverage_code(callback){
    //Create backup
    jake.exec(['rm -rf app-backup', 'cp -R ./app ./app-backup'], function() {
        //Create coverage code
        jake.exec(['rm -rf app-cov', 'jscoverage ./app ./app-cov'], function() {
            //Make coverage code the app dir
            jake.exec(['rm -rf app', 'cp -R ./app-cov ./app'], function() {
                callback();
            });
        });
    });
}

function run_test_coverage(callback){
    var mocha = new Mocha({reporter: 'html-cov', ui: 'bdd'});
    execute_test_code(mocha, callback);
}
 
function execute_test_code(mochaInstance, cb) {
    mochaInstance.addFile('./test/userTest.js');
    mochaInstance.addFile('./test/activityAddTest.js');
    // mochaInstance.addFile('./test/activityFindTest.js');
    mochaInstance.options.ignoreLeaks = true;
    mochaInstance.run(function(failures) {
        cb(failures);
    });
}
 
desc('mocha unit test-run');
task('test', {async: true}, function(args) {
    run_tests(function(err) {
        if (err) {
            fail(err);
        } else {
            //This runs the runTestCoverage task and directs the output to the correct file
            jake.exec(['geddy jake runTestCoverage > ./output/coverage.html'], function () {
                complete();
            }, {printStdout: true});
        }
    });
});

//This runs the test coverage and when done, opens the html output
task('runTestCoverage', {async: true}, function(args) {
    create_coverage_code(function(err){
        if (err){

        } else {
            run_test_coverage(function(err) {
                jake.exec(['open ./output/coverage.html']);
                //Put back backup
                jake.exec(['rm -rf app' ,'cp -R app-backup app'], function(){
                    complete();
                });
            });
        }
    });
});