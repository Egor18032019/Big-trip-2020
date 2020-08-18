// отрисовка эвентов в каждом дне
import AbstractComponent from "../components/abstract-component.js";
import moment from 'moment';
import {
  HelpersForTimeinMs
} from '../mock/const.js';
/**
 * контейнер для Offers
 * @param {*} arrayOffers
 * @return{html} возращает разметку
 */
const getOffersTemplates = (arrayOffers) => {

  return (
    `
      <li class="event__offer">
      <span class="event__offer-title">${arrayOffers.title}</span>
      +
      €&nbsp;
      <span class="event__offer-price">${arrayOffers.price}</span>
     </li>
     `);
};

const getPointTemplate = (points) => {
  const {
    eventPoint,
    eventTitle,
    eventOffers,
    eventTimeStart,
    eventTimeEnd,
    eventPrice,
  } = points;
  // Более суток: дни часы минуты (например «01D 02H 30M»);
  const eventDurationSec = eventTimeEnd - eventTimeStart;
  const day = eventDurationSec / HelpersForTimeinMs.DAY;
  const hours = (eventDurationSec - Math.floor(day) * HelpersForTimeinMs.DAY) / HelpersForTimeinMs.HOUR;
  const minutes = (eventDurationSec - Math.floor(day) * HelpersForTimeinMs.DAY - Math.floor(hours) * HelpersForTimeinMs.HOUR) / HelpersForTimeinMs.MINUTE;
  let eventDuration = Math.round(eventDurationSec / HelpersForTimeinMs.MINUTE) + `M`;
  if (eventDurationSec > HelpersForTimeinMs.DAY) {
    eventDuration = Math.floor(day) + `` + `D` + `  ` + Math.floor(hours) + `H` + `  ` + Math.round(minutes) + `M`;
  }
  if (eventDurationSec > HelpersForTimeinMs.HOUR && eventDurationSec < HelpersForTimeinMs.DAY) {
    eventDuration = Math.floor(eventDurationSec / HelpersForTimeinMs.HOUR) + `H` + `  ` + Math.round((eventDurationSec - Math.floor(eventDurationSec / HelpersForTimeinMs.HOUR) * HelpersForTimeinMs.HOUR) / HelpersForTimeinMs.MINUTE) + `M`;
  }

  const startEvent = moment(eventTimeStart).format(`HH:mm`);
  const endEvent = moment(eventTimeEnd).format(`HH:mm`);

  const eventSelectedOffers = eventOffers.map((it) => getOffersTemplates(it)).join(`\n`);

  return (
    `
  <li class="trip-events__item">
  <div class="event">
    <div class="event__type">
    <img class="event__type-icon" src=img/icons/${eventPoint.toLowerCase()}.png
    alt="Event type icon" width="42" height="42">
    </div>
    <h3 class="event__title">${eventTitle}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${startEvent}">${startEvent}</time>
        —
        <time class="event__end-time" datetime="${endEvent}</">${endEvent}</time>
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

export default class EventComponent extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
    this._editFormClickHandler = null;

  }

  getTemplate() {
    return getPointTemplate(this._point);
  }

  setEditPointClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._editFormClickHandler = handler;
  }
}
