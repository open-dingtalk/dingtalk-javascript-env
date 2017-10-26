import { PLATFORM } from './constants.js';

export default function environment(runtime,framework,virtualEnv){
  const isWeb = virtualEnv.platform === 'Web';
  const isWeexiOS = virtualEnv.platform === 'iOS';
  const isWeexAndroid = virtualEnv.platform === 'android';
  const isWeex = isWeexAndroid || isWeexiOS;
  const UA = (() => {
    if(isWeb){
      return window.navigator.userAgent.toLowerCase();
    }
    return '';
  })();
  const PCFrameConf = (() => {
    let tempConf = {}
    if(isWeb){
      const frameName = window.name;
      try{
        const frameConf = JSON.parse(frameName);
        tempConf.containerId = frameConf.containerId;
        tempConf.version = frameConf.hostVersion;
        tempConf.language = frameConf.language || '*';
      }catch(e){
        
      }
    }
    return tempConf;
  })();
  const isDingTalk = (() => {
    if (isWeex){
      if (virtualEnv.appName === 'DingTalk' || virtualEnv.appName === 'com.alibaba.android.rimet'){
        return true;
      }
      return false;
    } else {
      if (UA.indexOf('dingtalk') > -1 || UA.indexOf('aliapp') > -1){
        return true;
      } else {
        return !!PCFrameConf.containerId
      }
    }
  })();
  const version = (() => {
    if (isWeb){
      if (PCFrameConf.version){
        return PCFrameConf.version;
      } else {
        let matches = UA.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);
        if (matches === null) {
            matches = UA.match(/dingtalk\/([a-zA-Z0-9.-]+)/);
        }
        let version = (matches && matches[1]) ;
        return version || 'Unknown';
      }
    } else {
      return virtualEnv.appVersion;
    }
  })();
  const isPC = !!PCFrameConf.containerId;
  const isWebiOS = /iphone|ipod|ios/.test(UA);
  const isiPad = /ipad/.test(UA);
  const isWebAndroid = UA.indexOf('android') > -1;
  const isDingTalkPCMac = (UA.indexOf('mac') > -1) && isPC;
  const isDingTalkPCWindows = (UA.indexOf('win') > -1) && isPC;
  const isDingTalkPCWeb = (!isDingTalkPCMac && !isDingTalkPCWindows) && isPC;
  const isDingTalkPC = isPC;
  let platform = '';
  if (isDingTalk){
    if (isWebiOS || isWeexiOS){
      platform = PLATFORM.IOS;
    } else if (isWebAndroid || isWeexAndroid){
      platform = PLATFORM.ANDROID;
    } else if (isiPad){
      platform = PLATFORM.IPAD;
    } else if (isDingTalkPCMac){
      platform = PLATFORM.MAC;
    } else if (isDingTalkPCWindows){
      platform = PLATFORM.WINDOWS;
    } else if (isDingTalkPCWeb){
      platform = PLATFORM.BROWSER;
    } else {
      platform = PLATFORM.UNKNOWN;
    }
  } else {
    platform = PLATFORM.UNKNOWN;
  }
  return {
    isDingTalk,
    isWebiOS,
    isWebAndroid,
    isWeexiOS,
    isWeexAndroid,
    isDingTalkPCMac,
    isDingTalkPCWeb,
    isDingTalkPCWindows,
    isDingTalkPC,
    runtime,
    framework,
    platform,
    version
  }
}