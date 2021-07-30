---
title: 模拟实现new
abbrlink: 21804
date: 2020-07-17 21:54:53
tags:
---

### 介绍

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

1. 可以访问构造函数中的属性
2. 可以访问构造函数 prototype 的属性

### MDN

1. 创建一个空的简单 JavaScript 对象（即{}）；
2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
3. 将步骤 1 新创建的对象作为 this 的上下文 ；
4. 如果该函数没有返回对象，则返回 this。

### 功能

返回对象时，实例只能访问到返回对象的属性

```js
function Otaku(name, age) {
  this.strength = 60
  this.age = age

  return {
    name: name,
    habit: 'Games'
  }
}

var person = new Otaku('Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined
```

返回基本类型时，实例可以访问构造函数的属性

```js
function Otaku(name, age) {
  this.strength = 60
  this.age = age

  return 'handsome boy'
}

var person = new Otaku('Kevin', '18')

console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18
```

// 返回函数时，函数作为返回值

```js
function Otaku2(name, age) {
  this.strength = 60
  this.age = age

  return function cb() {
    return {
      value: 1
    }
  }
}

console.log(new Otaku2('kevin', '18')) // function cb()
```

### 实现

功能：

1. 新建一个对象实例
2. 将对象实例的`__proto__`指向构造函数的`prototype`
3. 运行构造函数
4. 判断结果为对象，返回对象，不为对象，返回新建的对象实例

```js
// 第二版的代码
function objectFactory() {
  var obj = {},
    Constructor = [].shift.call(arguments)

  obj.__proto__ = Constructor.prototype

  var ret = Constructor.apply(obj, arguments)

  return (typeof ret === 'object' || typeof ret === 'function') && ret !== null ? ret : obj
}
```
