import {
  POINT_TYPE,
  POINT_PATH_ROAD
} from './const.js';

import {
  getRandomArrayItem,
  getRandomDate
} from './utils';

// import {
//   flatpickr
// } from '../../node_modules/flatpickr';
// // console.log(flatpickr);
// import {
//   moment,
// } from '../../node_modules/moment';
// как работать то с этим ?

const generateEventContent = function () {
  let keysPointType = Object.keys(POINT_TYPE);
  const eventPoint = getRandomArrayItem(keysPointType);
  const eventTown = getRandomArrayItem(POINT_PATH_ROAD);

  return {
    eventPoint,
    eventTitle: `${eventPoint}  ${eventTown.town}`,
    eventOffers: [POINT_TYPE.Taxi],
    // - ?? та же самая хрень . не могу из обьекта по ключу вытащить значение
    eventTimeStart: `07:05`, // считать?
    eventTimeEnd: `16:05`, // flatpickr.js как её подключить ?
    // сделать разницу между старт и енд
    eventPrice: 50, // как это считаеться ? и считаеться ли то ?
    eventDuration: `30 M `, // как это считаеться ? и считаеться ли то ?
    eventDate: eventTown.day,
  };
};
/**
 * разбирает generateEventContent в массив с обьектами
 * @param {*} count список данных(ключ:значение)
 * @return{html} массив
 */
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
