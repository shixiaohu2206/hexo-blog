---
title: React生命周期
date: 2018-09-07
tags:
  - React
  - JavaScript
categories:
  - Code
---

### Demo

```js
class Demo extends Component {
  // 构造方法
  // 只要组件存在constructor,就必要要写super,否则this指向会错误
  constructor(props, context) {
    spuer(props, context)
  }
  // 组件将要加载
  componentWillMount() {}
  // 组件加载完成，只在render后，调用一次
  componentDidMount() {}
  // 接受新props时调用
  componentWillReceiveProps(nextProps) {}
  // 接受下次props、state，判断是否更新组件，初始化时不调用
  shouldComponentUpdate(nextProps, nextState) {}
  // 组件更改时
  componentWillUpdate(nextProps, nextState) {}
  // 组件更改完成
  componentDidUpdate(prevProps, prevState) {}
  // React 16 处理错误信息生命周期函数
  componentDidCatch() {}
  // 组件从DOM中移除前触发
  componentWillUnmount() {}
  // 渲染
  render() {
    return <div />
  }
}
export default Demo
```

### constructor 构建函数

- constructor 参数接受两个参数 props,context 可以获取到父组件传下来的的 props,context,如果你想在>constructor 构造函数内部(注意是内部哦，在组件其他地方是可以直接接收的)使用 props 或 context,则需>要传入，并传入 super 对象。

### componentWillMount 组件将要挂载

- 组件刚经历 constructor,初始完数据
- 组件还未进入 render，组件还未渲染完成，dom 还未渲染

### componentDidMount 组件渲染完成(只执行一次)

- 组件第一次渲染完成，此时 dom 节点已经生成，可以在这里调用 ajax 请求，返回数据 setState 后组件会重新渲染

### componentWillReceiveProps (nextProps) 父组件 props 改变时调用、

- 使用 this.props 访问当前的 props，可以在此 setState 更新，重新渲染组件

### shouldComponentUpdate(nextProps,nextState)

- return boolean， true 更新组件，false 为阻止更新
- 因为 react 父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断

### componentWillUpdate (nextProps,nextState)

- shouldComponentUpdate 返回 true 以后，组件进入重新渲染的流程，进入 componentWillUpdate,这里同样可以拿到 nextProps 和 nextState

### render 函数

- render 函数会插入 jsx 生成的 dom 结构，react 会生成一份虚拟 dom 树，在每一次组件更新时，在此 react 会通过其 diff 算法比较更新前后的新旧 DOM 树，比较以后，找到最小的有差异的 DOM 节点，并重新渲染

### componentDidUpdate(prevProps,prevState)

- 组件更新完毕后，react 只会在第一次初始化成功会进入 componentDidmount,之后每次重新渲染后都会进入这个生命周期，这里可以拿到 prevProps 和 prevState，即更新前的 props 和 state。

### componentWillUnmount ()

- 在组件从 DOM 中移除的时候立刻被调用。
