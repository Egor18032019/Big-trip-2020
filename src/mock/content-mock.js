import {
  POINT_TYPE,
  POINT_TOWN,
  EVENT_POINT,
  description,
  descriptionImg
} from './const.js';

import {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomDate,
  getRandomArray,
  getAllEvent,
} from './utils';

// import {
//   flatpickr
// } from '../../node_modules/flatpickr';

import moment from 'moment';

const randomArraypoints = () => {

  const eventTown = getRandomArrayItem(POINT_TOWN);
  const startEvent = moment(getRandomDate()).format(`HH:MM`);
  // -??  как сделать чтобы  getRandomDate принимала startEvent ?
  const endEvent = moment(getRandomDate()).format(`HH:MM`);
  const durationEventHour = endEvent.slice(0, 2) - startEvent.slice(0, 2);
  const durationEventMinutes = endEvent.slice(3, 2) - startEvent.slice(3, 2);
  const durationEvent = `${durationEventHour}H ${durationEventMinutes}M`;
  return {
    eventPoint: EVENT_POINT,
    eventTitle: `${EVENT_POINT} to  ${eventTown}`,
    eventOffers: POINT_TYPE[EVENT_POINT],
    eventTimeStart: startEvent,
    eventTimeEnd: endEvent, // flatpickr.js как её подключить ?
    eventPrice: 50, // как это считаеться ? и считаеться ли то ?
    eventDuration: durationEvent, // как это считаеться ? и считаеться ли то ?
    eventPointTown: eventTown,
    eventPointDestination: {
      pathDestination: getRandomArray(description, 1, 5),
      destinationImg: getRandomArray(descriptionImg, 1, 5)
    },
  };
};

const generateEventContent = function () {
  const dayEventDate = moment(getRandomDate()).format(`MMM do DD`).substring(0, 5);
  // -??не могу найти как вывести просто месяц и день

  return {
    eventDate: dayEventDate,
    points: getAllEvent(getRandomIntegerNumber(1, 4), randomArraypoints()),
  };

};

export {
  generateEventContent,
  getRandomArrayItem,
};