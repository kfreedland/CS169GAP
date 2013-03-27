exports.testSetup = function () {
  var cfg = {};
  if (process.env.environment) {
    cfg.environment = process.env.environment;
  }

  jake.addListener('complete', function (e) {
    jake.Task['env:cleanup'].invoke();
  });

  geddy.config = require('../lib/config').readConfig(cfg);
  geddy.model = require('model');

  require('../lib/init').init(geddy, function () {
    complete();
  });
};