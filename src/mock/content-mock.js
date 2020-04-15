import {
  POINT_TYPE,
  POINT_PATH_ROAD,
  EVENT_POINT
} from './const.js';

import {
  getRandomArrayItem,
  getRandomDate,
} from './utils';

// import {
//   flatpickr
// } from '../../node_modules/flatpickr';
// // console.log(flatpickr);
import moment from 'moment';
// как работать то с этим ?

const generateEventContent = function () {

  const eventTown = getRandomArrayItem(POINT_PATH_ROAD);

  return {
    eventPoint: EVENT_POINT,
    eventTitle: `${EVENT_POINT} to  ${eventTown.town}`,
    eventOffers: [POINT_TYPE[EVENT_POINT]],
    // - ?? та же самая хрень . не могу из обьекта по ключу вытащить значение
    eventTimeStart: moment(getRandomDate()).format(`HH:MM`),
    eventTimeEnd: moment(getRandomDate()).format(`HH:MM`), // flatpickr.js как её подключить ?
    // сделать разницу между старт и енд
    eventPrice: 50, // как это считаеться ? и считаеться ли то ?
    eventDuration: `30 M `, // как это считаеться ? и считаеться ли то ?
    eventDate: eventTown.day,
  };
};

const clonesEvent = [];
for (let i = 0; i < 5; i++) {
  const newCloneEvent = Object.assign({}, generateEventContent());
  clonesEvent.push(newCloneEvent);
}
console.log(clonesEvent);

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
  getRandomArrayItem
};
