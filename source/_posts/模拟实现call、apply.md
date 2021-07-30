---
title: 模拟实现call、apply
abbrlink: 59111
date: 2021-06-13 21:54:53
tags:
---

### 介绍

call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

### 实现

1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数

### call

```js
/**
 * 模拟实现call
 *
 * 1. 改变this指向
 * 2. 运行函数
 * 3. 第一个参数不存在时，指向window
 */
Function.prototype.call2 = function (context) {
  if (context === null || context === undefined) {
    context = window
  } else {
    context = Object(context) || context
  }
  context.__fn__ = this
  // ES6
  // let args = Array.prototype.slice.call(arguments, 1)
  // let result = context.__fn__(...args)

  // ES5
  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }
  // args会默认执行args.toString(),等同于args.join(',')
  // arguments[1],arguments[2]
  let result = eval('context.__fn__(' + args + ')')
  delete context.__fn__
  return result
}
```

### apply

实现基本与 call 一致，区别在于传参为数组

```js
Function.prototype.apply2 = function (context, arr) {
  if (context === null || context === undefined) {
    context = window
  } else {
    context = Object(context) || context
  }
  // 注意，此处的this是指的被调用的函数
  context.func = this
  arr = arr || []
  var res = eval('context.func(' + arr + ')')
  delete context.func
  return res
}
```
