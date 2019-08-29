---
title: H5与Native交互
tags:
  - JavaScript
categories:
  - Code
abbrlink: 43434
date: 2019-04-15 17:35:06
---

### 介绍三种 APP 的开发模式

- Native
- WebAPP
- HybridAPP

### Native

#### 优点

1. 原生应用。性能最好，交互体验有优势
2. 可以调用移动硬件设备的底层功能（摄像头、日历和地理位置等）

#### 缺点

1. 更新体验较差、需要用户手动更新。
2. 苹果商店发布流程繁琐
3. 使用不同的开发语言，所以开发、维护成本大

<!-- more -->

### WebAPP

#### 优点

1. 开发成本低，效率快
2. 跨平台、升级维护简单，不受应用商店限制
3. 不需要用户下载使用，有浏览器即可访问

#### 缺点

1. 依赖网络，访问速度受限于终端网速。每次访问，消耗流量
2. 性能差，用户体验较差（因为需要去远端下载资源）
3. 无法调用移动硬件设备的底层功能（摄像头、日历和地理位置等）

### HybridAPP

#### 优点

1. 开发成本较低，效率较快,性能介于 Native 与 WebAPP 之间，可与 Nactive 媲美
2. 跨平台、实现多端展示同一个交互层
3. 可以调用移动硬件设备的底层功能（摄像头、日历和地理位置等）

#### 缺点

1. 用户需要在应用商店下载，发布流程繁琐
2. 团队中需要有懂 Web、IOS 开发的技术人员，双方需要配合工作

#### Crocodile 框架中通信

1. 执行 webapck 打包 Hybrid 包时，将 vendor/bridge.js 文件打包至 crocodile.seed.js 中，在前端应用启动时，优先于其他脚本代码加载。
2. 当 Native 的 webview 加载完成后，调用 H5 的`web_view_finished_load`接口获取 Nacti 端的基本信息(版本、系统参数...)

##### 初始化

```java
WebSettings webSettings = mWebView.getSettings();
//Android容器允许JS脚本
webSettings.setJavaScriptEnabled(true);
//Android容器设置侨连对象
mWebView.addJavascriptInterface(getJSBridge(), "JSBridge");

//Android4.2版本以上，本地方法要加上注解@JavascriptInterface，否则会找不到方法。
private Object getJSBridge(){
    Object insertObj = new Object(){
    	@JavascriptInterface
        public String foo(){
            return "foo";
        }

        @JavascriptInterface
        public String foo2(final String param){
            return "foo2:" + param;
        }

    };
    return insertObj;
}
```

##### JS 调用

```js
//调用方法一
window.JSBridge.foo() //返回:'foo'
//调用方法二
window.JSBridge.foo2('test') //返回:'foo2:test'
```

##### 4.4 版本前

```java
// mWebView = new WebView(this); //即当前webview对象
mWebView.loadUrl("javascript: 方法名('参数,需要转为字符串')");

//ui线程中运行
 runOnUiThread(new Runnable() {
        @Override
        public void run() {
            mWebView.loadUrl("javascript: 方法名('参数,需要转为字符串')");
            Toast.makeText(Activity名.this, "调用方法...", Toast.LENGTH_SHORT).show();
        }
});
```

##### 4.4 版本后（包括）

```java
//异步执行JS代码,并获取返回值
mWebView.evaluateJavascript("javascript: 方法名('参数,需要转为字符串')", new ValueCallback() {
        @Override
        public void onReceiveValue(String value) {
    		//这里的value即为对应JS方法的返回值
        }
});
```
