---
title: 模拟实现debounce防抖
abbrlink: 60189
date: 2020-06-17 21:54:53
tags:
---

### debounce 防抖

1. 触发事件`N`时间后，才会真正执行绑定事件的函数
2. this 指向
3. 事件回调的 Event 参数

### 场景

1. 浏览器 resize 时
2. 按钮发送多次请求时

### 实现

```js
function debounce(fun, wait) {
  let time = null
  return function () {
    let context = this
    let args = arguments

    if (time) clearTimeout(time)
    time = setTimeout(fun.apply(context, args), wait)
  }
}
```

使用

```js
// func为真正需要执行的函数
container.onmousemove = debounce(func, 1000)
```

#### 增加功能

1. 上述防抖的执行时机为触发事件的`N`时间后。现在将需求改为触发事件时，就立即执行
2. 增加一个取消功能

```js
function debounce(fun, wait, immediate) {
  let time, result

  let debounce = function () {
    let context = this
    let args = arguments

    if (time) clearTimeout(time)

    if (immadiate) {
      let callNow = !time

      time = setTimeout(function () {
        time = null
      }, wait)

      if (callNow) {
        result = fun.apply(context, args)
      }
    } else {
      time = setTimeout(fun.apply(context, args), wait)
    }

    return result
  }

  debounce.cancel = function () {
    clearTimeout(time)
    time = null
  }

  return debounce
}
```
