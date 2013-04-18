var Comments = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Comment.all(function(err, comments) {
      self.respond({params: params, comments: comments});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , comment = geddy.model.Comment.create(params);

    if (!comment.isValid()) {
      params.errors = comment.errors;
      self.transfer('add');
    }

    comment.save(function(err, data) {
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

    geddy.model.Comment.first(params.id, function(err, comment) {
      if (!comment) {
        var err = new Error();
        err.statusCode = 404;
        self.error(err);
      } else {
        self.respond({params: params, comment: comment.toObj()});
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Comment.first(params.id, function(err, comment) {
      if (!comment) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, comment: comment});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Comment.first(params.id, function(err, comment) {
      comment.updateProperties(params);
      if (!comment.isValid()) {
        params.errors = comment.errors;
        self.transfer('edit');
      }

      comment.save(function(err, data) {
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

    geddy.model.Comment.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Comments = Comments;
