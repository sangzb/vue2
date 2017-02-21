var path = require('path');
var webpack = require('webpack');


var plugins = [];
if (process.env.NODE_ENV === 'production') {
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

module.exports = {
  entry: {
    // 公共
    vendor: [
      'jquery',
      'bootstrap'
    ],
    // 应用
    app: ['./src/main.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!resolve-url-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!resolve-url-loader!sass-loader?sourceMap'
      },
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