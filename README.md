# Webpack安裝筆記
###### tags: `javascript`
#### 確定安裝yarn或npm以及node
```yarn -v```或```npm -v```
#### 確定安裝node並更新到最新版
```node -v```
#### 進入想要使用的專案建立package.json檔
```yarn init```或```npm init```
## 安裝webpack
```yarn add -D webpack```或```npm i -D webpack```
###### -D是安裝在devDependencies而非dependencies，在開發node時，要注意區分什麼時候用dependencies什麼時候用devDependencies。一般做測試，打包，ES6轉ES5此類的工作所依賴的庫就使用devDependencies，而正常功能所依賴的則使用dependencies


#### ~~global安裝webpack~~
~~```yarn add global webpack```或```npm -g i webpack```~~
###### 在config裡面去依照project做設定比全域設定好，因為不同專案可能使用不同版本的webpack
#### 查看Webpack最新的版本為何
```yarn info webpack versions``` 或
```npm view webpack versions --json```
#### 如果不是最新版本，可以將Webpack更新至最新版下載
```yarn add -D webpack@4.1.1```或
```npm i -D webpack＠4.1.1``` 
###### 下載完可以在pacjage.json裡面的"devDependencies"看到"webpack": "^4.1.1"（版本）

#### Ｗebpack第4版之後必須要安裝webpack cli 
```yarn add webpack-cli -D```

###### 下載完可以在pacjage.json裡面的"devDependencies"看到"webpack-cli": "^2.0.12"（版本）

#### F1 > Open Workspace Settings中找"files.exclude"，複製貼上到右邊並加上'node_modules','.vscode','yarn-error.log','yarn.lock'把不會用到的檔案隱藏起來
```javascript=
{
 "files.exclude": {
 "**/.git": true,
 "**/.svn": true,
 "**/.hg": true,
 "**/CVS": true,
 "**/.DS_Store": true,
 "node_modules": true,
 ".vscode": true,
 "yarn-error.log": true,
 "yarn.lock": true
    }
}
```
###### save之後'node_modules'和'.vscode'就會從資料夾被隱藏
#### 增加一個src資料夾和一個dist資料夾，src資料夾裡面加上app.js
#### 增加Webpack設定檔'webpack.config.js'來設定檔案output和entry的路徑
```javascript=
 const   path   =   require('path');
 
 module.exports   = {
 entry:   './src/app.js',
 output: {
 filename:   'bundle.js',
 path:   path.resolve(__dirname, 'dist')
 }
};
```
#### 到package.json裡的`scripts`加上 build和prod
```javascript=
"scripts": {
 "build": "webpack",
 "prod": "webpack -p"

},
```
#### 下指令幾可產出bungle出來的JS檔案
```yarn run build```或```npm run build```


## 安裝html-webpack-plugin [文件](https://github.com/jantimon/html-webpack-plugin)
```yarn add html-webpack-plugin -D```或
```npm i html-webpack-plugin --save-dev```
##### 在webpack.config.js加入'const HtmlWebpackPlugin = require('html-webpack-plugin');'
##### 以及
```javascript=
plugins: [
 new   HtmlWebpackPlugin({
 title:   'Project', // 客製化專案名稱
 minify: {
 collapseWhitespace:   true
}, // 壓縮html檔案
 hash:   true, //檔案版本號會變更
 template:   './src/index.html'
})
]
```
## 安裝css-loader
```yarn add css-loader style-loader -D```或
```npm install css-loader style-loader --save-dev```
##### 在webpack.config.js加入
```javascript=
module: {
 rules: [
    {
     test: /\.css$/,
     use: [ 'style-loader', 'css-loader' ]
     }
    ]
}
```
##### 在src中加入style.css檔案，並在src/app.js中引入css檔
`const css = require('./style.css')`

## 安裝sass-loader [文件](https://github.com/webpack-contrib/sass-loader)
```yarn add sass-loader node-sass -D```或
```npm install sass-loader node-sass webpack --save-dev```
##### 在webpack.config.js加入'sass-loader'在css-loader之後，並將test從css改成scss
```javascript=
module: {
 rules: [
    {
     test: /\.scss$/,
     use: [ 'style-loader', 'css-loader', 'sass-loader']
     }
    ]
}
```
##### 在src中加入style.scss檔案，並在src/app.js中引入scss檔
`const css = require('./style.scss')`
## 安裝ExtractTextWebpackPlugin [文件](https://github.com/webpack-contrib/extract-text-webpack-plugin) webpack版本整合 [文件](https://webpack.js.org/guides/migrating/#extracttextplugin-extract)
```yarn add extract-text-webpack-plugin -D```或是```npm install --save-dev extract-text-webpack-plugin```
#### 查看版本,並更新到最新
```yarn info extract-text-webpack-plugin versions```
```yarn add -D extract-text-webpack-plugin@4.0.0-beta.0```
#### 在webpack.config.js加入ExtractTextPlugin.extract()包住loader們，如下
```javascript=
module: {
 rules: [
    {
     test: /\.scss$/,
     use:   ExtractTextPlugin.extract({
             fallback:   'style-loader',
             use: [ 'css-loader', 'sass-loader' ],
             publicPath:   '/dist'
            })
}
```

#### 在webpack.config.js中的plugin加入'new ExtractTextPlugin("styles.css")'

```javascript=
plugins: [
    new   ExtractTextPlugin("styles.css")
  ]
```
###### 需要注意webpack版本是否有整合的必要
#### 下指令'yarn run prod'即可產出extract的css檔案
###### 如果沒有指令，去package.json的script設定prod
```javascript=
"prod": "webpack -p"
```


## 安裝pug-html-loader 

`yarn add pug html-loader pug-html-loader -D`或`npm i pug html-loader
 pug-html-loader -D`
#### 在webpack.config.js加入
```javascript=
module: {
 rules: [
    {
     test: /\.pug$/,
     use: ['html-loader', 'pug-html-loader']
    }
  ]
}
```
###### 記得將plugin中要編譯的檔案從.html改成.pug

```javascript=
plugins: [
 new   HtmlWebpackPlugin({
 title:   'Project',
 minify: {
 collapseWhitespace:   true
},
 hash:   true,
 template:   './src/index.pug'
}),
```
## 安裝webpack-dev-server [文件](https://webpack.js.org/configuration/dev-server/#src/components/Sidebar/Sidebar.jsx)

`yarn add webpack-dev-server -D`
#### 查看版本並更新
`yarn info webpack-dev-server versions`
`yarn add webpack-dev-server@3.1.1 -D`
#### 在package.json中於script加入dev
`"dev": "webpack-dev-server"`
#### 在webpack.config.js中處理路徑
`const   path   =   require('path');`

```javascript=
    output: {
     path:   path.resolve(__dirname, 'dist'),
     filename:   'bundle.js'
    },
```
#### 在webpack.config.js中加上新的property > devServer 
```javascript=
devServer: {
 contentBase:   path.join(__dirname, "dist"),
 compress:   true,
 port:   9000, //如果要客製化localhost
 stats:   "errors-only", //terminal只出現error訊息
 open:   true //如果把borwser畫面關掉，存檔會重新打開
},

```
#### 下指令'yarn run dev'即可在localhost:9000看到即時載入的畫面


## 安裝[React](https://reactjs.org/docs/add-react-to-an-existing-app.html#installing-react) 和[Babel](https://babeljs.io/docs/setup/#installation)
#### 安裝React和Babel(轉譯ES6) 
```
yarn add react react-dom -D
```
```
yarn add babel-cli babel-preset-react -D
```
#### 到Babel文件 > Docs > Setup > Webpack 安裝
```
yarn add babel-loader babel-core -D
```
#### 在webpack.config.js中加上設定
```javascript=
module: {
  rules: [
    { test: /\.js$/, 
      exclude: /node_modules/, 
      loader: "babel-loader" 
    }
  ]
}
```

#### 新增一個'.babelrc'的檔案，並在裡面加入設定檔
```javascript=javascript=
{
 "presets": \["es2015", "react"\]
}
```
#### 將react官方的sample放入app.js
```javascript=
const   css   =   require('./style.scss') 

import   React   from   'react';
import   ReactDOM   from   'react-dom';
  
ReactDOM.render(
 <h1>Hello, world!</h1>,
 document.getElementById('root')
);

```
#### yarn run dev 就可以看到結果

## 安裝rimraf來讓每一次更新，可以刪除之前的html template

#### 安裝rimraf
`yarn add rimraf -D`
#### 進入package.json，再'scripts'中加入`"clean": "rimraf ./dist/*"` 並且讓run prod的時候，先執行Clean，所以把prod改成 `"prod": "yarn run clean && webpack -p"`的設定
```javascript=
"scripts": {
 "build": "webpack",
 "prod": "yarn run clean && webpack -p",
 "dev": "webpack-dev-server",
 "clean": "rimraf ./dist/*"
},
```
## 建立多個Template
#### 如果我們要移動index.html檔案到不同的位置，我們可以在webpack.config.js中plugin的HtmlWebpackPlugin加上`filename：'./../index.html' `將html設定至root層
```javascript=
plugins: [
 new   HtmlWebpackPlugin({
 title:   'Project',
 minify: {
 collapseWhitespace:   true
},
 hash:   true,
 filename:   './../index.html',
 template:   './src/index.html'
}),
 new   ExtractTextPlugin("style.css")
]
```
#### 在webpack.config.js中plugin的new一個新的 HtmlWebpackPlugin，並且在裡面加上filename
```javascript=
plugins: [
 new   HtmlWebpackPlugin({
     title:   'Project',
     minify: {
     collapseWhitespace:   true
},
 hash:   true,
 template:   './src/index.html'
}),
 new   HtmlWebpackPlugin({
     title:   'Contact',
     hash:   true,
     filename:   'contact.html',
     emplate:   './src/contact.html'
}),
 new   ExtractTextPlugin("style.css")
]
```
#### 在src新增一個contact.html的file並貼上template
```javascript=
<!DOCTYPE html>

<html>
 <head>
 <meta   http-equiv="Content-type"   content="text/html; charset=utf-8"/>
 <title><%= htmlWebpackPlugin.options.title %></title>
 </head>

 <body>
     <h1>contact page</h1>
 </body>

</html>
```
#### 在src新增一個contact.js的file並貼上測試用`console.log('hihihi from contact page script');`

#### 接著在src資料夾增加contact.js並於webpack.config.js中修改entry的設定成多個檔案，並將output改成
```javascript=
entry: {
 app:   './src/app.js',
 contact:   './src/contact.js'
},

 output: {
 path:   path.resolve(__dirname, 'dist'),
 filename:   '[name].bundle.js'
},
```
#### 之後yarn run dev就可以在localhost的url後面加上/contact.html 像是"http://localhost:9000/contact.html" 即可看到此新的頁面，並在console可以看到contact.js的內容

#### 可是進入"http://localhost:9000" 會發現console仍會出現contact.js裡面console.log的內容，因此需要設定excludeChunks及chunks於webpack.config.js中plugin的HtmlWebpackPlugin
#### 於project的檔案加入`excludeChunks: ['contact'],`於contact的檔愛加入`chunks: ['contact'],`
```javascript=
plugins: [
 new   HtmlWebpackPlugin({
     title:   'Project',
     minify: {
     collapseWhitespace:   true
    },
     hash:   true,
     excludeChunks: ['contact'],
     template:   './src/index.html'
}),

 new   HtmlWebpackPlugin({
     title:   'Contact',
     hash:   true,
     chunks: ['contact'],
     filename:   'contact.html',
     template:   './src/contact.html'
}),
 new   ExtractTextPlugin("style.css")
]
```
###### 此時我們重新run dev可以從element看到兩個url頁面會分別連結到<script type="text/javascript" src="app.bundle.js?3bf540f00762073b2100"></script>以及<script type="text/javascript" src="contact.bundle.js?3bf540f00762073b2100"></script>

## Hot Module Replacement : 不用刷新browser就可以即時看到css更新 [文件](https://webpack.js.org/concepts/hot-module-replacement/)

#### 在webpack.config.js中引入webpack，在devServer加上`hot: true`，在Plugin加上相關設定HotModuleReplacementPlugin及NamedModulesPlugin
`const   webpack   =   require('webpack');`

```javascript=
devServer: {
     contentBase:   path.join(__dirname, "dist"),
     compress:   true,
     hot:   true,
     open:   true
},
```
```javascript=
plugins: [
 new   webpack.HotModuleReplacementPlugin(),
 new   webpack.NamedModulesPlugin(),
]
```
#### 但 HotModuleReplacementPlugin 不能和 ExtractTextPlugin 共用，因次必須先移除 `new ExtractTextPlugin("style.css")` 以及將其移除 ExtractTextPlugin.extract 在 use 的設定改成`use: ['style-loader','css-loader', 'sass-loader']`
```javascript=
rules: [

{
 test: /\.scss$/,
 use: ['style-loader','css-loader', 'sass-loader']
 // use: ExtractTextPlugin.extract({
 // fallback: 'style-loader',
 // use: [ 'css-loader', 'sass-loader' ]
 // })
},
```
#### 此時我們下 yarn run dev 的時候console當有任何css或js變動時會顯示 [HMR] Waiting for update signal from WDS...的字樣，更新完成會顯示被更新的狀態，任何的更動都是單個檔案的即時更新，瀏覽器不會重新載入

#### 但是，在 production 的狀態，我們還是希望可以有 ExtractTextPlugin 可以用，因此我們必須將dev環境和 production 環境分開設定，因此我們先回覆到原本有 ExtractTextPlugin 時的設定，進入 package.json 的 script 中，將 'prod'更新設定為
`"prod": "yarn run clean && NODE__ENV=production webpack -p",`

#### 此時回到 webpack.config.js 裡面將dev和prod分別設定

```javascript=
const   isProd   =   process.env.NODE__ENV   ===   'production'; // true or false
const   cssDev   = ['style-loader','css-loader', 'sass-loader'];
const   cssProd   =   ExtractTextPlugin.extract({
     fallback:   'style-loader',
     use: [ 'css-loader', 'sass-loader' ]
})
const   cssConfig   =   isProd   ?   cssProd   :   cssDev;
```

#### 並且在module > rules 裡面scss的use設定改成cssConfig
```javascript=
{
 test: /\.scss$/,
 use:   cssConfig
}
```

#### 在Plugin裡面將 ExtractTextPlugin 設定為只有在production狀態使用
```javascript=
new   ExtractTextPlugin({
 filename:   "style.css",
 disable:   !isProd
}),
```
#### 接著下 yarn run dev 測試在dev是否[HMR]可順利運作，下 yarn run prod 測試在 production 環境 ExtractTextPlugin 是否能夠順利產出壓縮檔案


## 安裝file-loader（轉圖片）[文件](https://doc.webpack-china.org/loaders/file-loader/)  以及image-webpack-loader(壓縮文件)
`yarn add file-loader -D`
`yarn add image-webpack-loader -D`
#### 在webpack.config.js裡面 設定

```javascript=
{
 test: /\.(jpe?g|png|gif|svg)$/i,
 use: [
     'file-loader?name=[path][name].[ext]',
     'image-webpack-loader'
    ]
}
```
#### 在index.html裡面 設定圖片引入必須如下

```javascript=
<img   src=<%= require("../images/354.jpeg" ) %> />

```
## 安裝image-webpack-loader(壓縮文件)
`yarn add image-webpack-loader -D`

