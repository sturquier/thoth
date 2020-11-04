const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CompressionPlugin = require('compression-webpack-plugin')

const common = require('./webpack.common.config.js')

module.exports = {
  ...common,
  mode: 'production',
  devtool: '',
  entry: ['@babel/polyfill', './index.tsx'],
  performance: {
    hints: false,
    maxEntrypointSize: 90000,
    maxAssetSize: 90000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js')
    }
  },
  optimization: {
    minimize: true,
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        exclude: /\.test\.(ts|tsx)/i
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 1000,
      minChunks: 1,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
      maxSize: 90000
    }
  },
  plugins: [
    ...common.plugins,
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new Dotenv({
      path: path.resolve(__dirname, './.env.production')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new CompressionPlugin({
      test : /\.(js|css)(\?.*)?$/i,
      minRatio: Number.MAX_SAFE_INTEGER,
      deleteOriginalAssets : false
    })
  ]
}
