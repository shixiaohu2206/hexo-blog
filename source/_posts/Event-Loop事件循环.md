---
title: Event-Loop事件循环
abbrlink: 16638
date: 2020-10-30 21:56:42
tags:
---

## Event Loop

为了协调事件（event），用户交互（user interaction），脚本（script），渲染（rendering），网络（networking）等，用户代理（user agent）必须使用事件循环（event loops）。（3 月 29 修订）

JavaScript 引擎又称为 JavaScript 解释器，是 JavaScript 解释为机器码的工具，分别运行在浏览器和 Node 中。而根据上下文的不同，Event loop 也有不同的实现：其中 Node 使用了 libuv 库来实现 Event loop; 而在浏览器中，html 规范定义了 Event loop，具体的实现则交给不同的厂商去完成。

所以，浏览器的 Event loop 和 Node 的 Event loop 是两个概念

## 宏任务

(macro)task（又称之为宏任务），可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。

浏览器为了能够使得 JS 内部(macro)task 与 DOM 任务能够有序的执行，会在一个(macro)task 执行结束后，在下一个(macro)task 执行开始前，对页面进行重新渲染，流程如下：

`(macro)task->渲染->(macro)task->...`

(macro)task 主要包含：script(整体代码)、setTimeout、setInterval、I/O、UI 交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)

## 微任务

microtask（又称为微任务），可以理解是在当前 task 执行结束后立即执行的任务。也就是说，在当前 task 任务后，下一个 task 之前，在渲染之前。

所以它的响应速度相比 setTimeout（setTimeout 是 task）会更快，因为无需等渲染。也就是说，在某一个 macrotask 执行完后，就会将在它执行期间产生的所有 microtask 都执行完毕（在渲染前）。

microtask 主要包含：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)

## 运行机制

在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型是比较复杂的，但关键步骤如下：

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后 GUI 线程接管渲染
- 渲染完毕后，JS 线程继续接管，开始下一个宏任务（从事件队列中获取）

### EventLoop，哪些是宏任务、微任务

#### 宏任务

1. setTimeout
2. setInterval
3. I/O
4. setImmediate (node)
5. requestAnimationFrame (你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行)`https://juejin.im/post/5b6020b8e51d4535253b30d1`

#### 微任务

1. process.nextTick (node)
2. MutationObserver
3. Promise

## 面试题

问以下代码执行顺序

```js
// 今日头条面试题
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')


script start
async1 start
async2
promise1
script end
async1 end
promise2
settimeout
```

```js
setTimeout(() => {
  console.log('timer1')

  Promise.resolve().then(function () {
    console.log('promise1')
  })
}, 0)

setTimeout(() => {
  console.log('timer2')

  Promise.resolve().then(function () {
    console.log('promise2')
  })
}, 0)

// 浏览器
time1
promise1
time2
promise2

// Node
time1
time2
promise1
promise2
```

## await 做了什么

从字面意思上看 await 就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个 promise 对象也可以是其他值。

很多人以为 await 会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上 await 是一个让出线程的标志。await 后面的表达式会先执行一遍，将 await 后面的代码加入到 microtask 中，然后就会跳出整个 async 函数来执行后面的代码。

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
```

等价于

```js
async function async1() {
  console.log('async1 start')
  Promise.resolve(async2()).then(() => {
    console.log('async1 end')
  })
}
```

await async2();之后的 console.log('async1 end');，也会塞入到微任务中

## 总结

- 同一个上下文下，微任务优先于宏任务执行
- setTimeout 属于宏任务执行，Promise 属于微任务，而 async 和 await 其实是 geneorator 的语法糖,实质上最后返回的也是 promise

## 引用

浏览器的执行顺序是在一开始会通篇扫描整个脚本,生成主执行栈,用于执行同步任务.而异步任务会加入至浏览器的任务队列中.当执行栈为空,就会去 Task 队列中(任务队列)取出需要执行的代码放入执行栈中去执行。而 Task 队列中,我们又再之前提及到分:微任务和宏任务
微任务的优先级大于宏任务,所以在执行栈为空的时候,首先会去执行 Micortask(微任务)队列,执行完毕后再去取 Macrotask(宏任务)队列去执行栈中执行,一次执行一个,再去检查 Micortask(微任务),若存在则执行 Microtask,若没有则取下一个 Macrotask 任务继续执行,直至为空。

微任务和宏任务在 Node 的执行顺序

Node 10 以前：

执行完一个阶段的所有任务
执行完 nextTick 队列里面的内容
然后执行完微任务队列的内容
Node 11 以后：
和浏览器的行为统一了，都是每执行一个宏任务就执行完微任务队列。
