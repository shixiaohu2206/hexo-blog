---
title: PWA
abbrlink: 4606
date: 2021-02-12 21:57:20
tags:
---

## PWA

### 1. 介绍

> PWA（Progressive Web App）渐进式增强 WEB 应用, 即渐进式 web 应用。PWA 本质上是 web 应用，目的是通过多项新技术，在安全、性能、体验等方面给用户原生应用的体验。而且无需像原生应用那样繁琐的下载、安装、升级等操作。

打开`chrome://inspect/#service-workers`可查看 chrome 当前运行的 service worker

### 2. 核心功能、特性

- PWA 中包含的核心功能及特性如下：
- Web App Manifest
- Service Worker
- Cache API 缓存
- Push&Notification 推送与通知
- Background Sync 后台同步
- 响应式设计

#### 2.1 特性

- 基于 HTTPS 环境，这是构建 PWA 的硬性前提
- 是一个独立的 worker 线程，独立于当前网页进程，有自己独立的 worker context
- 可拦截 HTTP 请求和响应，可缓存文件，缓存的文件可以在网络离线状态时取到
- 能向客户端推送消息
- 不能直接操作 DOM
- 异步实现，内部大都是通过 Promise 实现

### 3. Service Worker 生命周期

> 注册--安装--激活

#### 3.1 注册

> 告诉浏览器 serviceworkerJS 文件存放在什么位置，浏览器下载、解析、执行。

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function (registration) {
        // 注册成功
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      })
      .catch(function (err) {
        // 注册失败:(
        console.log('ServiceWorker registration failed: ', err)
      })
  })
}
```

#### 3.2 安装

> 注册结束后，触发 install 事件，进行安装。

```js
var CACHE_VERSION = 'sw_v8'
var CACHE_FILES = ['/js/jquery/min.js', '/js/zui/min.js', '/js/chanzhi.js']
self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(CACHE_FILES)))
})
```

#### 3.3 激活

> 当安装成功后，serviceworker 就会激活，这时就会处理 activate 事件回调 (提供了更新缓存策略的机会)。并可以处理功能性的事件 fetch (请求)、sync (后台同步)、push (推送)。

```js
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key, i) {
          if (key !== CACHE_VERSION) {
            return caches.delete(keys[i])
          }
        })
      )
    })
  )
})
```

### 3. Service Worker 缓存功能

> 安装时，service worker 将我们指定的静态资源进行缓存（即预缓存）,与此同时，service worker 还可以拦截 HTTP 请求相应，做到动态缓存

```js
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response
      }
      var requestToCache = event.request.clone()
      return fetch(requestToCache).then(function (response) {
        if (!response || response.status !== 200) {
          return response
        }
        var responseToCache = response.clone()
        caches.open(CACHE_VERSION).then(function (cache) {
          cache.put(requestToCache, responseToCache)
        })
        return response
      })
    })
  )
})
```

#### PWA 添加横幅，增加用户使用率

1. https://lavas.baidu.com/doc/engage-retain-users/add-to-home-screen/app-install-banners
2. https://github.com/electron-react-boilerplate/electron-react-boilerplate
