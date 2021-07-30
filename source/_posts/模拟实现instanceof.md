---
title: 模拟实现instanceof
abbrlink: 57428
date: 2021-06-19 21:54:53
tags:
---

### 定义

用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

### 实现

```js
// left为实例函数
// right构造函数
function myInstacnce(left, right) {
  if (typeof left !== 'object' || left === null) {
    return false
  }

  let leftProto = left.__proto__
  let parentPrototype = right.prototype

  while (true) {
    if (leftProto === parentPrototype) {
      return true
    }

    if (leftProto === null) {
      return false
    }

    leftProto = leftProto.__protype__
  }
}
```
