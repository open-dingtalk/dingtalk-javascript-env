'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = environment;

var _constants = require('./constants.js');

function environment(runtime, framework, virtualEnv) {
  var isWeb = virtualEnv.platform === 'Web';
  var isWeexiOS = virtualEnv.platform === 'iOS';
  var isWeexAndroid = virtualEnv.platform === 'android';
  var isWeex = isWeexAndroid || isWeexiOS;
  var UA = function () {
    if (isWeb) {
      return window.navigator.userAgent.toLowerCase();
    }
    return '';
  }();
  var PCFrameConf = function () {
    var tempConf = {};
    if (isWeb) {
      var frameName = window.name;
      try {
        var frameConf = JSON.parse(frameName);
        tempConf.containerId = frameConf.containerId;
        tempConf.version = frameConf.hostVersion;
        tempConf.language = frameConf.language || '*';
      } catch (e) {}
    }
    return tempConf;
  }();
  var isDingTalk = function () {
    if (isWeex) {
      if (virtualEnv.appName === 'DingTalk' || virtualEnv.appName === 'com.alibaba.android.rimet') {
        return true;
      }
      return false;
    } else {
      if (UA.indexOf('dingtalk') > -1 || UA.indexOf('aliapp') > -1) {
        return true;
      } else {
        return !!PCFrameConf.containerId;
      }
    }
  }();
  var version = function () {
    if (isWeb) {
      if (PCFrameConf.version) {
        return PCFrameConf.version;
      } else {
        var matches = UA.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);
        if (matches === null) {
          matches = UA.match(/dingtalk\/([a-zA-Z0-9.-]+)/);
        }
        var _version = matches && matches[1];
        return _version || 'Unknown';
      }
    } else {
      return virtualEnv.appVersion;
    }
  }();
  var isPC = !!PCFrameConf.containerId;
  var isWebiOS = /iphone|ipod|ios/.test(UA);
  var isiPad = /ipad/.test(UA);
  var isWebAndroid = UA.indexOf('android') > -1;
  var isDingTalkPCMac = UA.indexOf('mac') > -1 && isPC;
  var isDingTalkPCWindows = UA.indexOf('win') > -1 && isPC;
  var isDingTalkPCWeb = !isDingTalkPCMac && !isDingTalkPCWindows && isPC;
  var isDingTalkPC = isPC;
  var platform = '';
  if (isDingTalk) {
    if (isWebiOS || isWeexiOS) {
      platform = _constants.PLATFORM.IOS;
    } else if (isWebAndroid || isWeexAndroid) {
      platform = _constants.PLATFORM.ANDROID;
    } else if (isiPad) {
      platform = _constants.PLATFORM.IPAD;
    } else if (isDingTalkPCMac) {
      platform = _constants.PLATFORM.MAC;
    } else if (isDingTalkPCWindows) {
      platform = _constants.PLATFORM.WINDOWS;
    } else if (isDingTalkPCWeb) {
      platform = _constants.PLATFORM.BROWSER;
    } else {
      platform = _constants.PLATFORM.UNKNOWN;
    }
  } else {
    platform = _constants.PLATFORM.UNKNOWN;
  }
  return {
    isDingTalk: isDingTalk,
    isWebiOS: isWebiOS,
    isWebAndroid: isWebAndroid,
    isWeexiOS: isWeexiOS,
    isWeexAndroid: isWeexAndroid,
    isDingTalkPCMac: isDingTalkPCMac,
    isDingTalkPCWeb: isDingTalkPCWeb,
    isDingTalkPCWindows: isDingTalkPCWindows,
    isDingTalkPC: isDingTalkPC,
    runtime: runtime,
    framework: framework,
    platform: platform,
    version: version
  };
}
//# sourceMappingURL=environment.js.map