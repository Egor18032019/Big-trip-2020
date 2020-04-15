import {
  POINT_TYPE,
  POINT_TOWN,
  EVENT_POINT
} from './const.js';

import {
  getRandomArrayItem,
  getRandomDate,
} from './utils';

// import {
//   flatpickr
// } from '../../node_modules/flatpickr';

import moment from 'moment';

const generateEventContent = function () {

  const eventTown = getRandomArrayItem(POINT_TOWN);

  return {
    eventPoint: EVENT_POINT,
    eventTitle: `${EVENT_POINT} to  ${eventTown}`,
    eventOffers: [POINT_TYPE[EVENT_POINT]],
    // - ?? та же самая хрень . не могу из обьекта по ключу вытащить значение
    eventTimeStart: moment(getRandomDate()).format(`HH:MM`),
    eventTimeEnd: moment(getRandomDate()).format(`HH:MM`), // flatpickr.js как её подключить ?
    // сделать разницу между старт и енд
    eventPrice: 50, // как это считаеться ? и считаеться ли то ?
    eventDuration: `30 M `, // как это считаеться ? и считаеться ли то ?
    eventDate: moment(getRandomDate()).format(`MM`),
  };
};

/**
 *  @return{html} массив с обьектами от generateEventContent()
 */
const getAllEvent = () => {
  const clonesEvent = [];
  for (let i = 0; i < 5; i++) {
    const newCloneEvent = Object.assign({}, generateEventContent());
    clonesEvent.push(newCloneEvent);
  }
  return clonesEvent;
};
// console.log(getAllEvent());

/**
 * разбирает generateEventContent в массив с обьектами
 * @param {*} count список данных(ключ:значение)
 * @param {*} eventForOneDay сдедал на будщее
 * @return{html} массив
 */
const generatePoints = (count, eventForOneDay = generateEventContent) => {
  return new Array(count)
    .fill(``)
    .map(eventForOneDay);
};

export {
  generateEventContent,
  generatePoints,
  getRandomArrayItem,
  getAllEvent,
};
