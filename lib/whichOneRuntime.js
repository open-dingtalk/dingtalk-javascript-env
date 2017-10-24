'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whichOneRuntime;
var maybeInWebView = typeof window !== 'undefined';
var maybeInWeexVueEnv = typeof weex !== 'undefined';
var maybeInNative = typeof callNative !== 'undefined';

var snifferWeexRaxMap = ['__weex_config__', '__weex_options__', '__weex_require__'];

var snifferWebViewMap = ['localStorage', 'location', 'navigator', 'XMLHttpRequest'];

var snifferWeexVueMap = ['config', 'requireModule', 'document'];

// 嗅探器
function snifferMachine(snifferMap, source) {
  var j = snifferMap.length;
  var i = 0;
  var result = true;
  for (; i < j; i++) {
    if (!source[snifferMap[i]]) {
      result = false;
      break;
    }
  }
  return result;
}

function whichOneRuntime() {
  if (maybeInWebView && maybeInWeexVueEnv) {
    // webview
    return snifferMachine(snifferWeexVueMap, weex) ? 'Web.Vue' : 'Web.Unknown';
  } else if (!maybeInWebView && maybeInWeexVueEnv) {
    // native
    return snifferMachine(snifferWeexVueMap, weex) ? 'Weex.Vue' : 'Weex.Unknown';
  } else if (maybeInWebView && maybeInNative && !maybeInWeexVueEnv) {
    // native
    return snifferMachine(snifferWeexRaxMap, window) ? 'Weex.Rax' : 'Weex.Unknown';
  } else {
    // default webview
    if (maybeInWebView) {
      return snifferMachine(snifferWebViewMap, window) ? 'Web.Unknown' : 'Unknown.Unknown';
    }
  }
  return 'Unknown.Unknown';
}
//# sourceMappingURL=whichOneRuntime.js.map