import {
  getRandomIntegerNumber,
  getRandomNewArray,
  getRandomPointPathRoad,
} from '../mock/utils.js';

const POINT_PATH = getRandomIntegerNumber(2, 8);
const FIRST_DATE = getRandomIntegerNumber(1, 28);
const FINAL_DATE = Math.round(FIRST_DATE + POINT_PATH - 1);
const MONTH_DATE = `Mar`;
const PATH_DAYS = ` ${MONTH_DATE} ${FIRST_DATE} - ${FINAL_DATE}`;
const POINT_TOWN = [`Amsterdam`, `Geneva`, `Ekaterinburg`, `Moskow`];
/**
 * массив  где написано кол-во значений в дне
 */
const EVENTS = getRandomNewArray(POINT_PATH);
const POINT_TYPE = {
  "Taxi": [{
    eventOfferTitle: `Rent a car`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order Uber`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Поймать попопутку`,
    evenOfferPrice: `Поболтать`
  }],
  "Bus": [{
    eventOfferTitle: `Rent a car`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order Uber`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Поймать попопутку`,
    evenOfferPrice: `Поболтать`
  }],
  "Train": [{
    eventOfferTitle: `Rent a vagon`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order traindriver`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Выйти покурить`,
    evenOfferPrice: `Поболтать`
  }],
  "Ship": [{
    eventOfferTitle: `Rent a Ship`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order Ship`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Пропиратить шхуну`,
    evenOfferPrice: `Виселица`
  }],
  "Transport": [{
    eventOfferTitle: `Rent a car`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order Uber`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Поймать попопутку`,
    evenOfferPrice: `Поболтать`
  }],
  "Drive": [{
    eventOfferTitle: `Rent a car`,
    evenOfferPrice: ` 200`
  }, {
    eventOfferTitle: `Order Uber`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `Поймать попопутку`,
    evenOfferPrice: `Поболтать`
  }],
  "Flight": [{
    eventOfferTitle: `add luggage`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `add meal`,
    evenOfferPrice: `  21`
  }, {
    eventOfferTitle: `Choose seats`,
    evenOfferPrice: `5 $ `
  }],
  "Check-in": [{
    eventOfferTitle: `add luggage`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `add meal`,
    evenOfferPrice: `  21`
  }, {
    eventOfferTitle: `Choose seats`,
    evenOfferPrice: `5 $ `
  }],
  "Sightseeing": [{
    eventOfferTitle: `add luggage`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `add meal`,
    evenOfferPrice: `  21`
  }, {
    eventOfferTitle: `Choose seats`,
    evenOfferPrice: `5 $ `
  }],
  "Restaurant": [{
    eventOfferTitle: `Швеский стол`,
    evenOfferPrice: `20`
  }, {
    eventOfferTitle: `Больше мясо`,
    evenOfferPrice: `21`
  }, {
    eventOfferTitle: `Choose table`,
    evenOfferPrice: `5`
  }],
};

const getRandomDateArray = (finalDate, firstDate) => {
  const dateArrayList = [];
  for (let i = firstDate; i <= finalDate; i++) {
    dateArrayList.push(i);
  }
  return dateArrayList;
};
const DATE_ARRAY = getRandomDateArray(FINAL_DATE, FIRST_DATE);


const POINT_PATH_ROAD = getRandomPointPathRoad(POINT_TOWN, POINT_PATH, DATE_ARRAY);
// console.log(POINT_PATH_ROAD);
// -? как теперь это воткнуть в моки ,,??
export {
  POINT_PATH,
  FIRST_DATE,
  MONTH_DATE,
  FINAL_DATE,
  PATH_DAYS,
  POINT_TYPE,
  POINT_TOWN,
  EVENTS,
  POINT_PATH_ROAD,
  DATE_ARRAY
};
