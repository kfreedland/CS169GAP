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
var mocha = new Mocha({reporter: 'spec', ui: 'bdd'});
 
function run_tests(cb) {
    mocha.addFile('./test/userTest.js');
    mocha.addFile('./test/activityAddTest.js');
    mocha.addFile('./test/activityFindTest.js');
    mocha.run(function(failures) {
        cb(failures);
    });
}
 
desc('mocha unit test-run');
task('test', {async: true}, function(args) {
    run_tests(function(err) {
        if (err) {
            fail(err);
        } else {
            complete();
        }
    });
});

