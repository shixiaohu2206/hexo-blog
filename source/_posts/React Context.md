---
title: React Context
abbrlink: 21164
date: 2021-05-12 21:57:20
tags:
---

### 介绍

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法

何时使用:

Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。

### 16.3 新版本 API

#### React.createContext

```jsx
const { Provider, Consumer } = React.createContext(defaultValue)
```

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。

#### Context.Provider

```jsx
<MyContext.Provider value={/* 某个值 */}>
```

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

#### Class.contextType

```
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;
```

挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

#### Context.Consumer

```jsx
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

一个 React 组件可以订阅 context 的变更，这让你在函数式组件中可以订阅 context。

### 建议

React 官方不建议使用大量 context,尽管他可以减少逐层传递,但是当组件结构复杂的时候,我们并不知道 context 是从哪里传过来的;而且 context 是一个全局变量,全局变量正是导致应用走向混乱的罪魁祸首.

### React 通信

- 父组件向子组件通信，使用 props
- 子组件向父组件通信，回调函数、自定义事件
- 跨级组件通信，层层传递 props、context
- 没有嵌套关系组件通信，自定义事件
