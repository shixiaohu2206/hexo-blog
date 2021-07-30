---
title: 模拟实现bind
abbrlink: 62877
date: 2020-06-30 21:52:29
tags:
---

### MDN 描述

1. bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
2. 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

```js
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }

  var self = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function () {}

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
  }

  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}
```

```js
/**
 * 手写bind
 *
 * 实现功能
 * 1. 返回一个函数
 * 2. 第一个参数作为返回函数运行时的this指向
 * 3. 后续参数，可以作为返回函数的参数，并且可以bind时传入，还可以在运行时传入
 * 4. 返回函数作为构造函数时，第一个参数作为this指向失效，但后续参数仍然可以当做返回函数的参数
 */
Function.prototype.bind =
  Function.prototype.bind ||
  function (context) {
    if (typeof this !== 'function') {
      throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
    }
    var self = this
    let args = Array.prototype.slice(arguments, 1)
    let fun = function () {
      let bindArgs = Array.prototype.slice(arguments)

      // 返回的函数是可以作为构造函数的
      // 使用instanceof判断，如果作为构造函数,apply需要执行本身
      return self.apply(this instanceof fun ? this : context, args.concat(bindArgs))
    }
    // 使用一个空函数，来作为prototype的中转
    // 避免作为构造函数时，修改实例的prototype，会改变self的prototype
    fun.prototype = Object.create(self.prototype)

    // let nop = function () {}
    // nop.prototype = self.prototype
    // fun.prototype = new nop()

    return fun
  }
```
