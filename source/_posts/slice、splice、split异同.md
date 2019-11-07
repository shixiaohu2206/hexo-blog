---
title: slice、splice、split异同
tags:
  - JavaScript
categories:
  - Code
abbrlink: 61300
date: 2017-11-01 00:00:00
---

## arguments 参数

- 生成
  JavaScript 在创建函数时，会自动生成一个 Arguments 对象实例 arguments，可以用数组下标的方式"[]"引用 arguments 的元素。arguments.length 为函数实参个数，arguments.callee 引用函数自身。
- 注意：
  在严格模式下，第 5 版 ECMAScript (ES5) 禁止使用 arguments.callee()。当一个函数必须调用自身的时候, 避免使用 arguments.callee(), 通过要么给函数表达式一个名字,要么使用一个函数声明.

- 特性：
  arguments 对象和 Function 是分不开的。因为 arguments 这个对象不能显式创建，arguments 对象只有函数开始时才可用。

- 使用方法：
  虽然 arguments 对象并不是一个数组，但是访问单个参数的方式与访问数组元素的方式相同

## Array.prototype.slice.apply(arguments)用意

直接调用 arguments.slice()将返回一个"Object doesn"t support this property or method"错误，因为 arguments 不是一个真正的数组。调用 Array.prototype.slice.apply(arguments)的意义就在于它能将函数的参数对象转化为一个真正的数组。

## Array.prototype.slice.apply(arguments， [1])用意

首先这段代码的目的是为了拿到参数里除第一个以外后面的所有参数。

现在 arguments 不是数组，所以不能直接调用 slice 方法，在 JavaScript 中借用其它对象的方法可以通过 apply 或者 call，以 call 为例，上述例子应该改写为：

```js
// 需要借用的方法slice在Array.prototype 上，然后call接受两个参数
// 第一个是需要借用方法的对象
// 第二个是传进方法的参数，也就是1
Array.prototype.slice.call(arguments, 1)
// 也可以写成
[].slice.call(arguments, 1)
```

## apply 方法与 call 方法

apply 方法与 call 方法是一样的，区别只是传参的形式，需要把方法参数按数组形式传进：

```js
Array.prototype.apply(arguments, [1]) // 数组传入
Array.prototype.apply(arguments, 1)
```
