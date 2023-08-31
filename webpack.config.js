const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    main: './src/index.tsx',
    delayedclicker: './src/scripts/delayed-clicker.ts',
    selectelement: './src/scripts/select-element.ts'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
      new CopyPlugin({
          patterns: [
              { from: 'public', to: '.'}
          ]
      })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
