var Activities = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.all(function(err, activities) {
      self.respond({params: params, activities: activities});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);

    var self = this
      , activity = geddy.model.Activity.create(params);

    activity.save(function(err, data) {
      if (err) {
        params.errors = err;
        self.transfer('add');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.first(params.id, function(err, activity) {
      self.respond({params: params, activity: activity.toObj()});
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.first(params.id, function(err, activity) {
      self.respond({params: params, activity: activity});
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.first(params.id, function(err, activity) {
      activity.updateProperties(params);

      activity.save(function(err, data) {
        if (err) {
          params.errors = err;
          self.transfer('edit');
        } else {
          self.redirect({controller: self.name});
        }
      });
    });
  };

  this.destroy = function (req, resp, params) {
    var self = this;

    geddy.model.Activity.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Activities = Activities;
