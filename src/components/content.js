import {
  generatePoints,
} from '../mock/content-mock.js';
import {
  FIRST_DATE,
  MONTH_DATE,
} from '../mock/const.js';

/**
 * Главный контейнер для контента
 * @return{html} возращает разметку
 */
const createMainContent = () => {
  return (
    `
      <ul class="trip-days">

      </ul>
    `
  );
};
/**
 * контейнер для Offers
 * @param {*} arrayOffers
 * @return{html} возращает разметку
 */
const createOffersTemplate = (arrayOffers) => {

  for (let title of arrayOffers) {
    // console.log(title);
    // -???? почему тут берет только первое значение и  что делать то ?
    let offers = title.eventOfferTitle;
    return (
      `
      <li class="event__offer">
      <span class="event__offer-title">${offers}</span>
      +
      €&nbsp;
      <span class="event__offer-price">${title.evenOfferPrice}</span>
     </li>
     `);

  }
  return `--???Что сюда написать или как исправить ?`;
};

const createPointTemplate = (points) => {
  // console.log(points);
  const {
    eventPoint,
    eventTitle,
    eventOffers,
    eventTimeStart,
    eventTimeEnd,
    eventPrice,
    eventDuration,
  } = points;
  // console.log(eventOffers);

  const eventSelectedOffers = eventOffers.map((it) => createOffersTemplate(it)).join(`\n`);

  return (
    `
  <li class="trip-events__item">
  <div class="event">
    <div class="event__type">
    <img class="event__type-icon" src=img/icons/${eventPoint}.png
    alt="Event type icon" width="42" height="42">
    </div>
    <h3 class="event__title">${eventTitle}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${eventTimeStart}</time>
        —
        <time class="event__end-time" datetime="2019-03-18T11:00">${eventTimeEnd}</time>
      </p>
      <p class="event__duration">${eventDuration}</p>
    </div>

    <p class="event__price">
      €&nbsp;<span class="event__price-value">${eventPrice}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
${eventSelectedOffers}
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
`
  );
};

const createDateDayTemplate = (dayEvent = 1) => {

  return (
    `
    <div class="day__info">
    <span class="day__counter">${dayEvent}</span>
    <time class="day__date" datetime="2019-03-18">${FIRST_DATE + dayEvent} ${MONTH_DATE}</time>
  </div>
    `
  );
};

/**
 * Контейнер для точек маршрута
 * @param {*} dayEvent дни
 * @param {*} event количество ивентом в день
 * @return{html} возращает разметку
 */
const createPointContainer = (dayEvent, event) => {

  const events = generatePoints(event);
  // console.log(events);
  const dateMarkup = createDateDayTemplate(dayEvent);
  const pointsMarkup = events.map((it) => createPointTemplate(it)).join(`\n`);
  return (
    `
  <li class="trip-days__item  day">
${dateMarkup}
    <ul class="trip-events__list">
${pointsMarkup}
     </ul>

  </li>
      `
  );
};


export {
  createMainContent,
  createPointContainer,
  createPointTemplate
};
