---
title: 模拟实现throttle节流
abbrlink: 16539
date: 2020-08-17 21:54:53
tags:
---

### throttle 节流

1. 执行触发事件，每隔一段时间后，就触发一次真实函数

### 场景

1. 浏览器 scroll 时，滚动时，隔断时间触发一次回调

### 实现

#### 根据时间戳

1. 触发 throttle 后，会立即执行一次函数
2. 假设 wait 为 1 秒，那么在 1.2 秒时停止触发，则函数就不会再触发

```js
function throttle(fun, wait) {
    let time, prev = 0

    return function() {
        let context = this
        let args = arguments
        let now = +New Date()

        if (now - prev > wait) {
            fun.apply(context, args)
            prev = now
        }
    }
}
```

#### 使用定时器

1. 触发 throttle 后，不会立即执行一次函数
2. 假设 wait 为 1 秒，那么在 1.2 秒时停止触发，函数会在 2 秒时，再执行一次函数

```js
function throttle() {
  let time

  return function () {
    let context = this
    let args = arguments

    if (!time) {
      time = setTimeout(function () {
        time = null
        fun.apply(context, args)
      }, wait)
    }
  }
}
```
