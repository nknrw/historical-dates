const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
      test: /\.svg$/,
      use: ['file-loader'],
      },

    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // путь к вашему HTML-шаблону
      filename: 'index.html', // имя выходного файла
      inject: 'body', // место, куда будет вставлен ваш собранный файл
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
};
