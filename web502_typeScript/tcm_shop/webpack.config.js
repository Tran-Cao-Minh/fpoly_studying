const path = require('path');

module.exports = {
  entry: './src/admin/login.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  ouput: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/javascripts/admin'),
  },
};