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

const getRandomDate = (start = new Date(2020, 5, 3), end = new Date()) => {
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
 * @param {*} allday кол-во дней или ивентов в дне
 * @param {*} events функция которая записывает значение в элемент массива
 * @return{html} массив с обьектами от getEventContent()
 */
const getAllEvent = (allday, events) => {
  const clonesEvent = [];
  for (let i = 0; i < allday; i++) {
    const newCloneEvent = Object.assign({}, events);
    clonesEvent.push(newCloneEvent);
  }
  return clonesEvent;
};


export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomArray,
  getRandomDate,
  getRandomNewArray,
  getAllEvent,
};