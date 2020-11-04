const path = require('path')
const Dotenv = require('dotenv-webpack')

const common = require('./webpack.common.config.js')

module.exports = {
  ...common,
  entry: ['@babel/polyfill', 'react-hot-loader/patch', './index.tsx'],
  plugins: [
    ...common.plugins,
    new Dotenv({
      path: path.resolve(__dirname, './.env')
    })
  ]
}
