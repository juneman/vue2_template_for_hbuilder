### Hbuilder服务器环境编译

主要是注释dev-server.js, webpack.dev.conf.js中的express启动

webpack.dev.conf.js
```
// add hot-reload related code to entry chunks
/*Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})*/
...
// new webpack.HotModuleReplacementPlugin(),
```
dev-server.js修改成这样
```
require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
/*var express = require('express')*/
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

/*var app = express()*/
var compiler = webpack(webpackConfig)
// webpack-dev-middleware-hard-disk需要npm安装
require('webpack-dev-middleware-hard-disk')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
```

> 注意这里npm run dev并不会把static的资源复制到dist下

### 支持scss

要想下面得到支持

```
<style lang="scss"></style>
```
必须安装

```
npm install node-sass sass-loader --save-dev
```

### .js文件支持autoprefixer

```
npm install node-sass postcss-loader --save-dev
```

utils.js追加

```
...
var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  },
  postcssLoader = {  //add
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }
  ....
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader, postcssLoader] //add 
```
兼容浏览器前缀可以在package.json修改
```
"browserslist": [
    "> 1%",
    "last 2 versions",
    "Android >= 4.0",
    "iOS >= 6",
    "not ie <= 8"
]
```
### Previous source map found, but options.sourceMap isn't set警告

```
postcssLoader = {  //add
    loader: 'postcss-loader',
    options: {// 暂时解决
      sourceMap: true
    }
  }
```

### 如何启动Hbuilder和vue开发项目
1. npm install

2. 修改build/index.js下的index和assetsRoot路径
```
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../../dist'),
```
3. npm run dev
这个将会上面2的配置在vue2.3-Hbuilder同级目录生成一个dist目录
4. Hbuilder打开这个目录，右键转换成移动app，这是会生成.project和mainfest.json文件
5. 点击链接真机（当然也可以浏览器运行结果），就ok（如何提示：打开文件服务失败，请尝试拔掉数据线后重新连接手机；那就重新插一下数据线吧）

### 缺点

- 开发过程中连接真机，编译有时候要过3秒，真机才刷新最新的效果出来
- 浏览器看没有及时见到效果，因为没了热加载，需要手动刷新
- 使用vue与mui整合也许有许多问题要解决，比如现在是spa，那么页面之间的跳转和mui和h5+如何整合？毕竟mui可能在h5+有更加好的发挥。

参考：

- [vue-template-for-hbuilder](https://github.com/4013465w/vue-template-for-hbuilder)