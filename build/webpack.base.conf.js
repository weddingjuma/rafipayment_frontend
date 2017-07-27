var path = require('path')
var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

// var CircularDependencyPlugin = require('circular-dependency-plugin')


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var property;

if (process.env.NODE_ENV === 'production') {
  property = 'build'
} else if (process.env.NODE_ENV === 'cordova') {
  property = 'cordova'
} else if (process.env.NODE_ENV === 'ui') {
  property = 'ui'
} else {
  property = 'dev'
}

var assetsPublicPath = config[property].assetsPublicPath
var assetsRoot = config[property].assetsRoot

module.exports = {
  entry: {
    app: './src/js/load.js'
  },
  output: {
    path: assetsRoot,
    filename: '[name].js',
    publicPath: assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src/js'),
      '%': resolve('src/scss/modules')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.version': JSON.stringify(require("../package.json").version)
    }),
    // new CircularDependencyPlugin({
    //   // exclude detection of files based on a RegExp
    //   exclude: /a\.js|node_modules/,
    //   // add errors to webpack instead of warnings
    //   failOnError: true
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?presets=es2015&retainLines=true',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          publicPath: '../../',
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
