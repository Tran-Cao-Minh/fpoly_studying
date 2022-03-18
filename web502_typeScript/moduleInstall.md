# auto reload
> npm install --save-dev ts-node nodemon

# webpack
1. npm i --save-dev webpack
2. npm i --save-dev webpack-cli
3. npm i --save-dev typescript ts-loader
4. tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
5. webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
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
    path: path.resolve(__dirname, 'dist'),
  },
};