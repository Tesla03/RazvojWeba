const path = require('path');

module.exports = {
  entry: './src/rx.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};