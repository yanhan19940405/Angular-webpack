const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build", //打包后的文件存放的地方
    filename: "bundle-[hash].js",
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: "./build", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true,
    hot: true,
    port:8081,
    host: 'localhost',
    proxy: {
    '/try/*': {
    target: 'http://www.runoob.com',
    changeOrigin: true,
    secure: false
 }
 }
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      }, 
      {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name].[hash:5].[ext]',
                        },
                    },
                ],
            }
     ,
     {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },{
                test: /\.json$/,
                loader: 'json-loader',
            },{
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
    options: {
      attrs: [':data-src']
    }
  }
  }
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: "style-loader"
      //     }, {
      //       loader: "css-loader",
      //       options: {
      //         modules: true
      //       }
      //     }
      //     ,{
      //       loader: "postcss-loader"
      //     }
      //   ]
      // }

    ]
  },
  plugins: [
    new webpack.BannerPlugin('VKYH'),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    }) //热加载插件
  ]
}




