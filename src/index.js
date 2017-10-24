import whichOneRuntime from './whichOneRuntime.js';
import environment from './environment.js';
import { RUNTIME, FRAMEWORK } from './constants.js';

const [ runtime, framework ] = whichOneRuntime().split('.');

function getVirtualEnv(){
  let containerEnv = {};
  switch (framework){
    case FRAMEWORK.VUE:
        const config = weex.config;
        const env = config.env;
        containerEnv.platform = env.platform;
        if (RUNTIME.WEEX === runtime){
          containerEnv.appVersion = env.appVersion;
          containerEnv.appName = env.appName;
        }
      break;
    case FRAMEWORK.RAX:
        if (RUNTIME.WEEX === runtime) {
          containerEnv.platform = navigator.platform;
          containerEnv.appName = navigator.appName;
          containerEnv.appVersion = navigator.appVersion;
        }
      break;
    case FRAMEWORK.UNKNOWN:
        if (RUNTIME.WEB === runtime){
          containerEnv.platform = RUNTIME.WEB;
        }
        if (RUNTIME.UNKNOWN === runtime){
          containerEnv.platform = RUNTIME.UNKNOWN;
        }        
      break;
  }  
  return containerEnv;
}

const virtualEnv = getVirtualEnv();
const env = environment(runtime,framework,virtualEnv);

export default env;