// отрисовыает даты маршрута
import AbstractComponent from "../components/abstract-component.js";
import moment from "moment";

const getPathPointDate = (itemArray) => {

  return itemArray.eventTimeStart;
};

/**
 * массив с датами от всех ивентов
 * @param {*} allEvent массив ивенто
 * @return {*} массив с самой ранней датой и с самой поздней
 */
const getPathPointSortingDates = (allEvent) => {
  if (!allEvent) {
    return ``;
  } else {
    const allDates = allEvent.map((it) => getPathPointDate(it));

    // ищем самую ранюю дату
    const tripEventsStartDates = allDates.sort((a, b) => a - b);
    const tripEventsStartDatesGood = moment(tripEventsStartDates[0]).format(`LLL`).substring(0, 6);

    // ищем самую позднию дату
    const tripEventsEndtDates = allDates.sort((a, b) => a - b);
    const tripEventsEndDatesGood = moment(tripEventsEndtDates[tripEventsEndtDates.length - 1]).format(`LLL`).substring(0, 7);

    // отдаем раннюю дату и позднею дату(без месяца)
    return [tripEventsStartDatesGood, tripEventsEndDatesGood];
  }
};


/**
 *  Маршрут и  дата
 * @param {*} listEvent список ивентов
 * @return{html} возращает разметку
 */
const getSitePathTemplate = (listEvent) => {
  const durationEvents = getPathPointSortingDates(listEvent);
  let pathDate;
  if (!durationEvents) {
    pathDate = ``;
  } else {
    if (durationEvents[0] !== durationEvents[1]) {
      pathDate = durationEvents[0] + ` - ` + durationEvents[1];
    } else {
      pathDate = durationEvents[0] + ` за день успеем`;
    }
  }
  return (
    `
    <p class="trip-info__dates">${pathDate}</p>
    `
  );
};

export default class SiteDateTemplate extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return getSitePathTemplate(this._point);
  }

}
