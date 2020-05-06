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

const getEndRandomDate = (startDate, startEventTime) => {
  const endRandomDate = new Date(startDate);
  endRandomDate.setHours(getRandomIntegerNumber(+(startEventTime.slice(0, 2)), 24));
  endRandomDate.setMinutes(getRandomIntegerNumber(0, 59));
  // - ?? почем минуты то не работают также как часы ?
  return endRandomDate;
};

const deepAssign = function () {
  // Make sure there are objects to merge
  let len = arguments.length;
  if (len < 1) {
    return;
  }
  if (len < 2) {
    return arguments[0];
  }

  // Merge all objects into first
  for (let i = 1; i < len; i++) {
    for (let key in arguments[i]) {
      // If it's an object, recursively merge
      // Otherwise, push to key
      if (Object.prototype.toString.call(arguments[i][key]) === `[object Object]`) {
        arguments[0][key] = deepAssign(arguments[0][key] || {}, arguments[i][key]);
      } else {
        arguments[0][key] = arguments[i][key];
      }
    }
  }
  return arguments[0];
};

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomArray,
  getRandomDate,
  getRandomNewArray,
  getEndRandomDate,
  deepAssign,
};
