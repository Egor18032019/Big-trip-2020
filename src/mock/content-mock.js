import {
  POINT_TYPE,
  POINT_TOWN,
  EVENT_POINT,
  DESCRIPTION,
  DESCRIPTION_IMG
} from './const.js';

import {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomDate,
  getRandomArray,
  getAllEvent,
} from '../utils/common.js';

// import {
//   flatpickr
// } from '../../node_modules/flatpickr';

import moment from 'moment';

const getRandomArraypoints = () => {

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
    eventPrice: getRandomIntegerNumber(0, 50),
    eventDuration: durationEvent,
    eventPointTown: eventTown,
    eventPointDestination: {
      pathDestination: getRandomArray(DESCRIPTION, 1, 5),
      destinationImg: getRandomArray(DESCRIPTION_IMG, 1, 5)
    },
  };
};

const getEventContent = function () {
  const dayEventDate = moment(getRandomDate()).format(`MMM do DD`).substring(0, 5);
  // -??не могу найти как вывести просто месяц и день

  return {
    eventDate: dayEventDate,
    points: getAllEvent(getRandomIntegerNumber(2, 4), getRandomArraypoints()),
  };

};

export {
  getEventContent,
  getRandomArrayItem,
};
