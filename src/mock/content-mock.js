import {
  POINT_TYPE,
  POINT_TOWN,
  DESCRIPTION,
  DESCRIPTION_IMG
} from './const.js';

import {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomDate,
  getRandomArray,
} from '../utils/common.js';

// import {
//   flatpickr
// } from '../../node_modules/flatpickr';

import moment from 'moment';

const getRandomArraypoints = () => {
  const eventPoint = getRandomArrayItem(Object.keys(POINT_TYPE));
  const eventTown = getRandomArrayItem(POINT_TOWN);
  let timeStartEvent = getRandomDate();
  const startEvent = moment(timeStartEvent).format(`HH:MM`);
  // -??  как сделать чтобы  getRandomDate принимала startEvent ?

  const endEvent = moment(getRandomDate(timeStartEvent)).format(`HH:MM`);
  const durationEventHour = endEvent.slice(0, 2) - startEvent.slice(0, 2);
  const durationEventMinutes = endEvent.slice(3, 2) - startEvent.slice(3, 2);
  const durationEvent = `${durationEventHour}H ${durationEventMinutes}M`;
  return {
    eventPoint,
    eventTitle: `${eventPoint} to  ${eventTown}`,
    eventOffers: POINT_TYPE[eventPoint],
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

const createRandomArray = (length, handlerGenerateData) => {
// создаем пустой массив - заданой длины - и заливаем его `ничего`
  const randomValues = new Array(length).fill(`ничего`);
  return randomValues.map(handlerGenerateData);
};

const getEventContent = function () {
  const length = getRandomIntegerNumber(1, 5);
  // передаем в функцию createRandomArray -> длину и функцию с перемеными которая при каждом вызвае будет даватьновое значение
  return createRandomArray(length, () => ({
    eventDate: moment(getRandomDate()).format(`MMM do DD`).substring(0, 5),
    points: createRandomArray(getRandomIntegerNumber(1, 4), getRandomArraypoints),
  }));
};


export {
  getEventContent,
  getRandomArrayItem,
};
