# dingtalk-javascript-env

钉钉容器系统-环境变量

# Install

```bash
$ npm install dingtalk-javascript-env --save
```

# 导入方式

```JavaScript
import env from 'dingtalk-javascript-env';
console.log(env)
```

```JavaScript

{
  isDingTalk, // 是否在钉钉的容器中（包含移动端和PC端）
  isWebiOS, //是否为Web iOS
  isWebAndroid, //是否为Web Android
  isWeexiOS, // 是否为Weex iOS
  isWeexAndroid, // 是否为Weex Android
  isDingTalkPCMac, // 是否为Mac客户端中
  isDingTalkPCWeb, // 是否在PC Web网页中
  isDingTalkPCWindows, // 是否在PC Windows客户端中
  isDingTalkPC, // 是否为PC
  runtime,  // 字符串【'Web','Weex','Unknown'】
  framework, // 字符串【'Vue','Rax','Unknown'】
  platform, // 字符串【'Mac','Windows','iOS','Android','iPad','Browser','Unknown'】
  version // 客户端版本
}

```

# MIT License

Copyright (c) 2017 钉钉开放平台团队