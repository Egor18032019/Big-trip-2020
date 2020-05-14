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
  getEndRandomDate,
} from '../utils/common.js';

import moment from 'moment';


const getRandomArraypoints = () => {
  const eventPoint = getRandomArrayItem(Object.keys(POINT_TYPE));
  const eventTown = getRandomArrayItem(POINT_TOWN);

  const timeStartEvent = getRandomDate();
  const startEvent = moment(timeStartEvent).format(`HH:mm`);

  const timeEndEvent = getEndRandomDate(timeStartEvent, startEvent);
  // const endEvent = moment(timeEndEvent).format(`HH:mm`);

  const getDurationEvent = timeEndEvent.getTime() - timeStartEvent.getTime();
  const durationEvent = moment(getDurationEvent).format(`HH:mm`);
  // --,,,??? почему не правильно считает ??
  const favorite = true;
  return {
    eventPoint,
    eventTitle: `${eventPoint} to  ${eventTown}`,
    eventOffers: POINT_TYPE[eventPoint],
    eventTimeStart: timeStartEvent,
    eventTimeEnd: timeEndEvent,
    eventPrice: getRandomIntegerNumber(0, 50),
    eventDuration: durationEvent,
    eventPointTown: eventTown,
    eventPointDestination: {
      pathDestination: getRandomArray(DESCRIPTION, 1, 5),
      destinationImg: getRandomArray(DESCRIPTION_IMG, 1, 5)
    },
    favorite,
    // добавить фаворит
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
