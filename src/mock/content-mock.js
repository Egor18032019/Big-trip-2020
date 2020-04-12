import {
  pointType,
  POINT_TOWN
} from './const.js';

import {
  getRandomArrayItem,
  getRandomDate
} from './utils';

// import {
//   flatpickr
// } from '../../node_modules/flatpickr';
// // console.log(flatpickr);

const generateEventContent = function () {
  let keysPointType = Object.keys(pointType);
  const eventPoint = getRandomArrayItem(keysPointType);

  return {
    eventPoint,
    eventTitle: `${eventPoint}  ${getRandomArrayItem(POINT_TOWN)}`,
    eventOffers: [pointType.Taxi],
    // - ?? та же самая хрень . не могу из обьекта по ключу вытащить значение
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
    .fill(``)
    .map(generateEventContent);
};

export {
  generateEventContent,
  generatePoints,
  getRandomDate,
  getRandomArrayItem
};
