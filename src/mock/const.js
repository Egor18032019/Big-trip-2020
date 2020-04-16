import {
  getRandomIntegerNumber,
  getRandomArrayItem,
} from '../mock/utils.js';


const POINT_PATH = getRandomIntegerNumber(2, 8);
const FIRST_DATE = getRandomIntegerNumber(1, 28);
const FINAL_DATE = Math.round(FIRST_DATE + POINT_PATH - 1);
const MONTH_DATE = `Mar`;
const PATH_DAYS = ` ${MONTH_DATE} ${FIRST_DATE} - ${FINAL_DATE}`;
const POINT_TOWN = [`Amsterdam`, `Geneva`, `Ekaterinburg`, `Moskow`];

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

const EVENT_POINT = getRandomArrayItem(Object.keys(POINT_TYPE));

export {
  POINT_PATH,
  MONTH_DATE,
  PATH_DAYS,
  POINT_TYPE,
  POINT_TOWN,
  EVENT_POINT
};
