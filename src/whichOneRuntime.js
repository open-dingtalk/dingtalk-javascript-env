const maybeInWebView = typeof window !== 'undefined';
const maybeInWeexVueEnv = typeof weex !== 'undefined';
const maybeInNative = typeof callNative !== 'undefined';

const snifferWeexRaxMap = [
  '__weex_config__',
  '__weex_options__',
  '__weex_require__'
];

const snifferWebViewMap = [
  'localStorage',
  'location',
  'navigator',
  'XMLHttpRequest'
];

const snifferWeexVueMap = [
  'config',
  'requireModule',
  'document'
];

// 嗅探器
function snifferMachine(snifferMap,source){
  const j = snifferMap.length;
  let i = 0;
  let result = true;
  for(;i < j; i++){
    if (!source[snifferMap[i]]){
      result = false;
      break;
    }
  }
  return result;
}

export default function whichOneRuntime(){
  if (maybeInWebView && maybeInWeexVueEnv){
    // webview
    return snifferMachine(snifferWeexVueMap,weex) ? 'Web.Vue' : 'Web.Unknown';
  } else if (!maybeInWebView && maybeInWeexVueEnv){
    // native
    return snifferMachine(snifferWeexVueMap,weex) ? 'Weex.Vue' : 'Weex.Unknown';
  } else if (maybeInWebView && maybeInNative && !maybeInWeexVueEnv){
    // native
    return snifferMachine(snifferWeexRaxMap,window) ? 'Weex.Rax' : 'Weex.Unknown';
  } else {
    // default webview
    if (maybeInWebView){
      return snifferMachine(snifferWebViewMap,window) ? 'Web.Unknown' : 'Unknown.Unknown';
    } 
  }
  return 'Unknown.Unknown';
}