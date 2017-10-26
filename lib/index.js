'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _whichOneRuntime = require('./whichOneRuntime.js');

var _whichOneRuntime2 = _interopRequireDefault(_whichOneRuntime);

var _environment = require('./environment.js');

var _environment2 = _interopRequireDefault(_environment);

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _whichOneRuntime$spli = (0, _whichOneRuntime2.default)().split('.'),
    _whichOneRuntime$spli2 = _slicedToArray(_whichOneRuntime$spli, 2),
    runtime = _whichOneRuntime$spli2[0],
    framework = _whichOneRuntime$spli2[1];

function getVirtualEnv() {
  var containerEnv = {};
  switch (framework) {
    case _constants.FRAMEWORK.VUE:
      var config = weex.config;
      var _env = config.env;
      containerEnv.platform = _env.platform;
      if (_constants.RUNTIME.WEEX === runtime) {
        containerEnv.appVersion = _env.appVersion;
        containerEnv.appName = _env.appName;
      }
      break;
    case _constants.FRAMEWORK.RAX:
      if (_constants.RUNTIME.WEEX === runtime) {
        containerEnv.platform = navigator.platform;
        containerEnv.appName = navigator.appName;
        containerEnv.appVersion = navigator.appVersion;
      }
      break;
    case _constants.FRAMEWORK.UNKNOWN:
      if (_constants.RUNTIME.WEB === runtime) {
        containerEnv.platform = _constants.RUNTIME.WEB;
      }
      if (_constants.RUNTIME.UNKNOWN === runtime) {
        containerEnv.platform = _constants.RUNTIME.UNKNOWN;
      }
      break;
  }
  return containerEnv;
}

var virtualEnv = getVirtualEnv();
var env = (0, _environment2.default)(runtime, framework, virtualEnv);

exports.default = env;
//# sourceMappingURL=index.js.map