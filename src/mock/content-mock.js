import {
  pointType, pointFinal
} from './const.js';

const Taxi = [{
  eventOfferTitle: `Rent a car`,
  evenOfferPrice: `€ 200`
}, {
  eventOfferTitle: `Order Uber`,
  evenOfferPrice: `€ 20`
}, {
  eventOfferTitle: `Поймать попопутку`,
  evenOfferPrice: `Поболтать`
}];
const Bus = [{
  eventOfferTitle: `Rent a car`,
  evenOfferPrice: `€ 200`
}, {
  eventOfferTitle: `Order Uber`,
  evenOfferPrice: `€ 20`
}, {
  eventOfferTitle: `Поймать попопутку`,
  evenOfferPrice: `Поболтать`
}];
const Ship = [{
  eventOfferTitle: `Rent a car`,
  evenOfferPrice: `€ 200`
}, {
  eventOfferTitle: `Order Uber`,
  evenOfferPrice: `€ 20`
}, {
  eventOfferTitle: `Поймать попопутку`,
  evenOfferPrice: `Поболтать`
}];
const Transport = [{
  eventOfferTitle: `Rent a car`,
  evenOfferPrice: `€ 200`
}, {
  eventOfferTitle: `Order Uber`,
  evenOfferPrice: `€ 20`
}, {
  eventOfferTitle: `Поймать попопутку`,
  evenOfferPrice: `Поболтать`
}];
const Drive = [{
  eventOfferTitle: `Rent a car`,
  evenOfferPrice: `€ 200`
}, {
  eventOfferTitle: `Order Uber`,
  evenOfferPrice: `€ 20`
}, {
  eventOfferTitle: `Поймать попопутку`,
  evenOfferPrice: `Поболтать`
}];
const Flight = [{
  eventOfferTitle: `add luggage`,
  evenOfferPrice: `€ 20`
}, {
  eventOfferTitle: `add meal`,
  evenOfferPrice: ` € 21`
}, {
  eventOfferTitle: `Choose seats`,
  evenOfferPrice: `5 $ `
}];
const Sightseeng = [{
  eventOfferTitle: `add luggage`,
  evenOfferPrice: `€ 20`
}, {
  eventOfferTitle: `add meal`,
  evenOfferPrice: ` € 21`
}, {
  eventOfferTitle: `Choose seats`,
  evenOfferPrice: `5 $ `
}];
const Restaurant = [{
  eventOfferTitle: `add luggage`,
  evenOfferPrice: `€ 20`
}, {
  eventOfferTitle: `add meal`,
  evenOfferPrice: ` € 21`
}, {
  eventOfferTitle: `Choose seats`,
  evenOfferPrice: `5 $ `
}];


const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

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

const getRandomDate = (date) => {
  const resultData = new Date(date);
  resultData.setMilliseconds(getRandomIntegerNumber(1500000, 860000000));
  return resultData;
};

const generateEventContent = function () {
  const eventPoint = getRandomArrayItem(pointType);

  return {
    eventPoint,
    eventTitle: `${eventPoint}  ${getRandomArrayItem(pointFinal)}`,
    eventOffers: getRandomArray(eventPoint, 0),
    eventTimeStart: `07:05`, // считать?
    eventTimeEnd: `16:05`, // flatpickr.js как её подключить ?
    // сделать разницу между старт и енд
    eventPrice: 50, // как это считаеться ? и считаеться ли то ?
    eventDuration: `30 M `, // как это считаеться ? и считаеться ли то ?
    eventDate: getRandomDate(10),
  };
};

const generatePoints = (count) => {
  return new Array(count)
    .fill(`
      `)
    .map(generateEventContent);
};

export {
  generateEventContent,
  generatePoints,
  getRandomDate
};
