var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: `${SRC_DIR}/entry.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
       }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: [
    new Dotenv()
  ]
};