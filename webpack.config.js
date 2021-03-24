const path = require('path')

module.exports = {
  entry: {
    app: ['@babel/polyfill', './projects/micropost/src/app.js']
  },
  output: {
    path: path.resolve(`${__dirname}/projects/micropost`, 'build'),
    filename: 'app.bundle.js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}
