import {
  generatePoints,
} from '../mock/content-mock.js';

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
const createOffersTemplates = (arrayOffers) => {

  return (
    `
      <li class="event__offer">
      <span class="event__offer-title">${arrayOffers.eventOfferTitle}</span>
      +
      €&nbsp;
      <span class="event__offer-price">${arrayOffers.evenOfferPrice}</span>
     </li>
     `);
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

  const eventSelectedOffers = eventOffers.map((it) => createOffersTemplates(it)).join(`\n`);

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

const createDateDayTemplate = (eventDay, dayEventDate = `дата сбилась`) => {

  return (
    `
    <div class="day__info">
    <span class="day__counter">${eventDay + 1}</span>
    <time class="day__date" datetime="2019-03-18">${dayEventDate}</time>
  </div>
    `
  );
};

/**
 * Контейнеры для точек маршрута
 * @param {*} eventDay номер эвента по порядку
 * @param {*} dayEventDate  дата ивента
 * @return{html} возращает разметку
 */
const createPointContainer = (eventDay, dayEventDate) => {


  const events = generatePoints(dayEventDate);
  // console.log(events);
  const dateMarkup = createDateDayTemplate(eventDay, dayEventDate);
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
