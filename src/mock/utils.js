const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

/**
 * Выбор случайного элемента из переданого массива
 * @param {*} array массив
 * @return{элемент} один элемент массива
 */
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomArray = (array, start, end = array.length) => {
  const count = getRandomIntegerNumber(start, end);
  return new Array(count)
    .fill(``)
    .map(() => getRandomArrayItem(array));
};


const getRandomDate = (start = new Date(2020, 4, 1), end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomNewArray = (end = 1) => {
  const newArray = [];
  for (let i = 0; i < end; i++) {
    newArray.push(getRandomIntegerNumber(1, 5));
  }
  return newArray;
};

/**
 * создает массив с 2 ключами  town: город  и day: дата когда происходит событие
 * @param {*} arrayPoint
 * @param {*} pointPath
 * @param {*} dateArray массив с датами ивентов
 * @return{html} возращает массив с обьектами по два ключа town и day
 */
const getRandomPointPathRoad = (arrayPoint, pointPath, dateArray) => {
  const poitArray = [];
  for (let i = 0; i < pointPath; i++) {
    poitArray.push({
      town: getRandomArrayItem(arrayPoint),
      day: getRandomArrayItem(dateArray)
    });
  }
  return poitArray;
};

const getRandomDateArray = (finalDate, firstDate) => {
  const dateArrayList = [];
  for (let i = firstDate; i <= finalDate; i++) {
    dateArrayList.push(i);
  }
  return dateArrayList;
};

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomArray,
  getRandomDate,
  getRandomNewArray,
  getRandomPointPathRoad,
  getRandomDateArray,
};
