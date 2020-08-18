/* eslint-disable strict */
const path = require(`path`);
// установка плагина для времени moment
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
//  экспортируем настройки
module.exports = {
  // установите режим сборки для разработки;
  mode: `development`,
  // задайте main.js точкой входа;
  entry: [`./src/main.js`], // - точка входа в приложение
  // в качестве директории для сборки укажите папку public.
  // Помните, что путь должен быть абсолютный.
  //  Используйте path.join;
  output: {// output - как собирать бандл и куда собирать
    // файл сборки (бандл) назовите bundle.js;
    filename: `bundle.js`,
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, `public`), // абсолютный путь до `public`. __dirname это метод
  },
  // активируйте генерацию source-maps.
  devtool: `source-map`,
  devServer: {
    // eslint-disable-next-line no-undef
    contentBase: path.join(__dirname, `public`), // - пишем откуда серверу забирать файлы
    // Лучше открывать в режиме инкогнито, чтобы браузер не кэшировал файлы сборки
    watchContentBase: true
  },
  module: {// как преобразуються файлы для webpacka
    rules: [{
      test: /\.css$/i, // те типы файлов котоорые проверям
      use: [`style-loader`, `css-loader`],
    }],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    })
  ]
};
