//依赖
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//参数
var plugins = [];
//服务器路径
var publicPath = '/';
var pagePath = './';

if (process.env.NODE_ENV === 'production') {
  publicPath = 'http://45.76.210.139/assets';
  pagePath = '../';
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );
}

//单独打包css文件
plugins.push(new ExtractTextPlugin("css/style.css"));
//打包多个page文件
plugins.push(
  new HtmlWebpackPlugin({
    filename: pagePath + 'index.html',
    template: './index.ejs',
    hash: false,
    inject: 'body',
    chunks: ['app', 'vendor']
  }),
  new HtmlWebpackPlugin({
    filename: pagePath + 'page.html',
    template: './page.ejs',
    hash: false,
    inject: 'body',
    chunks: ['page', 'vendor']
  })
);

module.exports = {
  entry: {
    // 公共
    vendor: [
      'jquery',
      'bootstrap'
    ],
    // 应用
    app: ['./src/main.js'],
    page: ['./src/page.js']
  },
  output: {
    path: path.resolve(__dirname, './dist/assets'),
    publicPath: publicPath,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader' ,
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      { test: /\.scss$/, loader: 'style-loader!css-loader!resolve-url-loader!sass-loader?sourceMap'},
      { 
        test: /\.(png|jpg|gif|svg)$/, 
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      { test: /\.(woff|svg|ttf|eot)([\?]?.*)$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /jquery\.js$/, loader: 'expose-loader?$'},
      { test: /jquery\.js$/, loader: 'expose-loader?jQuery'}
    ]
  },
  plugins: plugins,
  resolve: {
    alias: {'vue$': 'vue/dist/vue.common.js'},
    extensions: ['.js', '.jsx', '.coffee', '.html', '.css', '.scss', '.sass']
  },
  devServer: {
    publicPath: publicPath,
    hot: true,
    inline: true,
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
}

function escapeRegExpString(str) { return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'); }
function pathToRegExp(p) { return new RegExp('^' + escapeRegExpString(p)); }