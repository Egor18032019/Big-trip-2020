/* eslint-disable strict */
// -???? а вот этот 'path'  он где ?
const path = require(`path`);

module.exports = {
  // установите режим сборки для разработки;
  mode: `development`,
  // задайте main.js точкой входа;
  entry: `./src/main.js`,
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
  }
};
