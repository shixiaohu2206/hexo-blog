---
title: hasOwnProperty原型链方法
date: 2018-10-17 23:17:02
tags:
  - JavaScript
categories:
  - Code
---

```js
/*
 *  Object的hasOwnProperty()方法返回一个布尔值
 *  判断对象是否包含特定的自身（非继承）属性。
 *
 *  在看开源项目的过程中，经常会看到类似如下的源码
 *  for...in循环对象的所有枚举属性
 *  然后再使用hasOwnProperty()方法来忽略继承属性。
 */
var foo = {
  hasOwnProperty: function() {
    return false
  },
  bar: 'Here be dragons'
}

foo.hasOwnProperty('bar') // 始终返回 false

// 如果担心这种情况，可以直接使用原型链上真正的 hasOwnProperty 方法
// 使用另一个对象的`hasOwnProperty` 并且call
;({}.hasOwnProperty.call(foo, 'bar')) // true

// 也可以使用 Object 原型上的 hasOwnProperty 属性
Object.prototype.hasOwnProperty.call(foo, 'bar') // true
```
