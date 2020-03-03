## 什么是node
* 一种运行环境
* 用 Node.js 去写服务器代码
* Node.js 诞生以后，前端大爆发，类似 React/Vuejs 这样的前端框架的开发环境变得非常强大和负责，Node.js 是这些开发环境运行的基础
Node.js 和浏览器是不同的环境，是有着很多细小的差异的。首先，二者各自包含的全局变量不同。document 对象是用来操作页面的，所以只有浏览器环境下才可以直接使用。但是如果是要放到 Node.js 环境下运行代码，就不要使用 document 。同样的道理，Node.js 中可以直接拿来使用的 http 对象，在浏览器环境下就没有。其次，Node.js 和浏览器对 ES6 新特性的支持程度也是不同的，这一点也要注意

## 什么是npm
* npm 是 Node Package Manager 的缩写，意思是 Node 的包管理系统
* 系统上安装好了 Node.js 之后，就会配套安装一个命令，叫做 npm 

## 基本概念
* 浏览器是“翻译”（渲染）程序猿写的代码给用户看的
* 服务器根据请求操作数据库
* 前后端分离：为了防止两种不同的攻城狮工作内容串杂在一起，双方约定，定下一个**发送请求的地址，和请求的格式**，至此老死不相往来。这种请求的地址和其相应的格式，又被称为API（接口）
* 服务器：每一个服务器都有个IP地址。我们通过http协议访问时，一般是输入域名，域名通过dns解析服务，转换成IP
  
## 什么是ajax
* Ajax 即“AsynchronousJavascriptAndXML”（异步 JavaScript 和 XML）,是一种异步请求的技术
* Ajax 是一种在无需重新加载整个网页的情况下，能够更新部分网页的**技术**。 通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新
* 通过 Ajax 可以通过 JS 与后端接口进行数据交互

## 什么是XHR
* XMLHttpRequest（XHR）是浏览器层面的API，可以让开发人员通过JavaScript实现数据传输
* XHR的能力不仅仅表现在能实现浏览器的异步通信，还表现在它极大的简化了这个异步通信过程。XHR是浏览器提供的API，这就意味着浏览器会自动帮我们完成所有底层的连接管理、协议协商、HTTP请求格式化等等很多工作
* ajax通过原生的XMLHttpRequest对象发出HTTP请求，得到服务器返回的数据后，再进行处理
* ajax包括以下几步骤：1、创建AJAX对象；2、发出HTTP请求；3、接收服务器传回的数据；4、更新网页数据
* 一个完整的HTTP响应由状态码、响应头集合和响应主体组成。在收到响应后，这些都可以通过XHR对象的属性和方法使用
* ajax通过原生的XMLHttpRequest对象发出HTTP请求，得到服务器返回的数据后，再进行处理
* 如果需要接收的是异步响应，这就需要检测XHR对象的readyState属性，该属性表示请求/响应过程的当前活动阶段
  
## 什么是http
* HTTP全称是HyperText  Transfer  Protocal，即超文本传输协议
* HTTP是应用层协议，当你上网浏览网页的时候，浏览器和web服务器之间就会通过HTTP在Internet上进行数据的发送和接收。
* HTTP是一个基于请求/响应模式的、无状态的协议。即我们通常所说的Request/Response
* 客户向服务器请求服务时，只需传送请求方法和路径
* HTTP允许传输任意类型的数据对象
* http协议规定了发送请求的格式，这个格式有三部分组成请求行、请求头、请求体。
　　请求行包括请求的方式（get、post或其他）、要求响应的文件、http版本。
　　请求头包括本机信息、浏览器信息等等，当然，也包括URL中？后面的参数。
  请求体包括POST传递数据的相关信息，Get方式传值时，请求体为空。
* 请求信息发送至服务器以后，服务器会获取传递过来的相关信息进行后端程序的处理。一般通过request.querystring获取URL传递过来的指，通过request.form获取POST传递过来的值
* http对响应的格式也做出了规定，响应的信息主要包括，响应码、响应头、响应体。
　　响应码用来标识服务器响应的结果，如我们常看到的200、404等。大致的分类如下：1开头的表示消息，2开头表示成功，3开头表示重定向，4开头表示失败，5开头表示服务器异常。
  响应头记录服务器相关信息如服务器是否启用压缩、服务器为IIS或Ngnix、程序所用服务端语言等等。当然，缓存也是在这里设置的，通过修改响应头可以修改html在本地缓存的情况，如设置浏览器缓存过期的时间。
  响应体主要是我看到的html的相关内容了。
* 完成以上四步操作以后，浏览器就断开了与服务器的数据连接
* HTTP是基于TCP/IP的关于数据如何在万维网中如何通信的协议

## 网络七层模型
层 |作用
---|---
应用层|为应用程序提供服务并规定应用程序中通信相关的细节（http/FTP）
表示层|将应用处理的信息转换为适合网络传输的格式
会话层|负责建立和断开通信连接
传输层|唯一负责总体的数据传输和数据控制的一层,对其上三层提供可靠的传输服务,对网络层提供可靠的目的地站点信息主要功能(TCP/UDP)
网络层|将数据传输到目标地址(IP协议)
数据链路层|负责物理层面上的互联的、节点间的通信传输
物理层|负责0、1 比特流（0/1序列）与电压的高低、逛的闪灭之间的转换


## jqury(dom)
* jQuery 屏蔽了浏览器之间的兼容性问题，针对常用功能封装了大量的 API，并支持插件机制，让你写 JS 的效率很高，质量很好。

## json
* JSON 用来描述前后端数据交互的内容格式，有了 JSON 这样的一套统一的描述规则，前后端解析数据的成本变低，使用非常简单。JSON 属于 JavaScript 的一个子集。

## axios
* axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范
* axios是通过promise实现对ajax技术(XHR)的一种封装
* XHR是实际发送Http请求的客户端
* ajax技术实现了网页的局部数据刷新，axios实现了对ajax的封装
* 从浏览器中创建 XMLHttpRequest
* 支持 Promise API
* 从 node.js 创建 http 请求
* 自动转换JSON数据

## css : background属性
* background的值的顺序是background-color，background-image，background-repeat，background-attachment，background-position,     background-size
* 如果用background-size,一定要用/分隔 
* backgroun-position 顺序先垂直后水平
  
## css: box-shadow
* 水平阴影距离
* 垂直阴影距离
* 模糊半径
* 阴影距离

## css: white-sspace
* 设置空格样式
  
## line-height 行高的继承问题
```html
// em同百分数
//根据父元素的字体大小先计算出行高值然后再让子元素继承，即子元素继承的是line-height=1.5 * 16 px这个计算后的固定值
<div style="line-height: 1.5em; font-size: 16px;">
    我是父元素
    <div style="font-size: 30px;">
        我是子元素 <br>
        我是子元素
    </div>
</div>
```
```html
//根据子元素的字体大小动态计算出行高值让子元素继承，即子元素继承的是line-height=1.5这个系数,再1.5 * 30 = 45px
<div style="line-height: 1.5; font-size: 16px;">
    我是父元素
    <div style="font-size: 30px;">
        我是子元素 <br>
        我是子元素
    </div>
</div>
```
## string.replace不改变原字符串

## v-html
* 富文本：类似word文件，一般的格式设置，比如字体和段落设置，页面设置等等信息都可以存在RTF格式中
  
## 事件循环  （cnblog-yugege）
* 同步和异步任务分别进入不同的执行环境，同步的进入主线程，即主执行栈，异步的进入 Event Queue（事件队列） 。主线程内的任务执行完毕为空，会去 Event Queue 读取对应的任务，推入主线程执行。 上述过程的不断重复就是我们说的 Event Loop (事件循环)。
* (macro)task 主要包含：script( 整体代码)、setTimeout、setInterval、I/O、UI 交互事件、setImmediate(Node.js 环境)
  microtask主要包含：Promise、MutaionObserver、process.nextTick(Node.js 环境)
* microtask 优先于 task 执行，所以如果有需要优先执行的逻辑，放入microtask 队列会比 task 更早的被执行。
```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise(((resolve) => {
  console.log('promise1');
  resolve();
})).then(() => {
  console.log('promise2');
});
console.log('script end');
```

## 异步更新队列
* 只对数据

## vue:单向数据流
* 单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行
* 这意味着你不应该在一个子组件内部改变 prop

## display:none & visibility:hidden
* display：none会让元素从渲染树中消失，渲染的时候不占据任何空间；
* visibility：hidden不会让元素从渲染树中消失，渲染的时候仍然占据空间，只是内容不可见。
* display：none是非继承属性，子孙节点消失是由于元素从渲染树中消失造成，通过修改子孙节点的属性无法显示；
* visibility：hidden是继承属性，子孙节点消失是由于继承了hidden，通过设置visibility：visible，可以让子孙节点显示。

## display:flex
* align-items默认为stretch
* end不用用flexend

## 文字超出显示省略号
设置宽度
```css
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap; //单行
```
```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden; //多行
```

## ::before
* 默认inline
  
## less scoped
* display flex异常
* 给HTML的DOM节点加一个不重复data属性(形如：data-v-19fca230)来表示他的唯一性
* 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器来私有化样式 **？**
* **如果组件内部包含有其他组件，则会给其他组件的最外层标签加上当前组件的data属性**
* **同一组件中类名不能重复，即使不在一级**
  
## replace
* replace(str, (match, p1) => { return })
* match是匹配到的字符串
* p1是str加括号的第一个数

## 解决滚动条导致的页面移动
    margin-left: calc(100vw - 100%); //100%是相对父元素宽度

## vertical-align

## fetching 防连续拉取数据
* 拉数据过程中 fetching = true，调用fetch函数直接 return

## object-fill
设置图片或video在容器中的cover/contain/fill

## 动态路由分配
* 响应路由参数的变化
* 当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。
* 可以简单地 watch (监测变化) $route 对象
* 或者使用 beforeRouteUpdate 导航守卫：

## text-align : 默认继承

## %：下列几种**
* 相对于content-box**宽度**:**width、margin、padding**
* 相对于content-box高度:**height**
* 相对于border-box宽度：**left、right**
* 相对于border-box高度：**top、bottom**
* 相对于自身宽高：**background-size、border-radius、transform:translate()、border-image-width、transform-origin**
* 相对于父元素font-size: **font-size**
* 相对于自身字号： **line-height**
* 相对于行高：**vertical-align**

## undefined 转布尔值不是false

## keep-alive

## DOM操作一般挂载到mounted钩子

## Vue 不能检测对象属性的添加或删除

