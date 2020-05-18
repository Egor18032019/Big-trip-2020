/* eslint-disable strict */
const path = require(`path`);
// установка плагина для обрезки moment
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
module.exports = {
  // установите режим сборки для разработки;
  mode: `development`,
  // задайте main.js точкой входа;
  entry: [`./src/main.js`],
  // в качестве директории для сборки укажите папку public.
  // Помните, что путь должен быть абсолютный.
  //  Используйте path.join;
  output: {
    // файл сборки (бандл) назовите bundle.js;
    filename: `bundle.js`,
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, `public`),
  },
  // активируйте генерацию source-maps.
  devtool: `source-map`,
  devServer: {
    // eslint-disable-next-line no-undef
    contentBase: path.join(__dirname, `public`),
    // Лучше открывать в режиме инкогнито, чтобы браузер не кэшировал файлы сборки
    watchContentBase: true
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: [`style-loader`, `css-loader`],
    }],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    })
  ]
};
