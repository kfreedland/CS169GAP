/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['controllers/auth.js']) {
  _$jscoverage['controllers/auth.js'] = [];
  _$jscoverage['controllers/auth.js'][1] = 0;
  _$jscoverage['controllers/auth.js'][3] = 0;
  _$jscoverage['controllers/auth.js'][4] = 0;
  _$jscoverage['controllers/auth.js'][7] = 0;
}
_$jscoverage['controllers/auth.js'][1]++;
var passport = require("../helpers/passport");
_$jscoverage['controllers/auth.js'][3]++;
var Auth = (function () {
  _$jscoverage['controllers/auth.js'][4]++;
  geddy.mixin(this, passport.actions);
});
_$jscoverage['controllers/auth.js'][7]++;
exports.Auth = Auth;
_$jscoverage['controllers/auth.js'].source = ["var passport = require('../helpers/passport');","","var Auth = function () {","  geddy.mixin(this, passport.actions);","};","","exports.Auth = Auth;"];
