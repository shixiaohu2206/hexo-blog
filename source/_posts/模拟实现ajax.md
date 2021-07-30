---
title: 模拟实现ajax
abbrlink: 34921
date: 2020-05-13 21:53:37
tags:
---

### AJAX

AJAX（Asynchronous JavaScript And XML ）是一种使用 XMLHttpRequest 技术构建更复杂，动态的网页的编程实践

### XMLHttpRequest

`XMLHttpRequest(XHR)`对象用户与服务器交互。通过`XHR`可以在不刷新页面的情况下请求指定 url，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部数据

### readyState

- 0 UNSENT 代理被创建，但尚未调用 open() 方法。
- 1 OPENED open() 方法已经被调用。
- 2 HEADERS_RECEIVED send() 方法已经被调用，并且头部和状态已经可获得。
- 3 LOADING 下载中； responseText 属性已经包含部分数据。
- 4 DONE 下载操作已完成。

### 实现

```js
function ajax(method, url, data) {
  return new Promise((resolve, reject) => {
    data = data || {}
    method = (method || 'GET').toUpperCase()
    let xhr
    if (XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else {
      xhr = new ActiveXObject('Micosoft.XMLHTTP')
    }

    if (method === 'GET') {
      xhr.open(method, url + formatData(data))
      xhr.send(null)
    } else {
      xhr.open(method, url)
      xhr.setRequestHeader('Content-type', 'application/json')
      xhr.send(JSON.stringify(data))
    }

    // 与xhr.onload一样，readyState为4时会触发onload
    xhr.onreadystatechange = function () {
      console.log(xhr)
      if (xhr.readyState === 4) {
        let status = xhr.status
        if ((status >= 200 && status < 300) || status === 304) {
          return resolve(JSON.parse(xhr.responseText))
        } else {
          return reject(xhr.statusText)
        }
      }
    }

    function formatData(data) {
      let arr = []
      let v = `_v=${new Date().getTime()}`
      if (Object.keys(data).length === 0) {
        return `?${v}`
      } else {
        for (let i in data) {
          arr.push(`${encodeURIComponent(i)}=${encodeURIComponent(data[i])}`)
        }
        arr.push(v)
        return '?' + arr.join('&')
      }
    }
  })
}
```
