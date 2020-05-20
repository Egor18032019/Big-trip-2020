import SmartComponent from "../components/smart-component.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";
// import "flatpickr/dist/flatpickr.min.css";  - не работает так
import moment from 'moment';
import {
  POINT_TYPE,
  styleOffers
} from '../mock/const.js';


const getEventAvailableOffer = (array, iterator) => {
  let keyStyleOffers = array.eventOfferTitle;
  return (
    `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${styleOffers[keyStyleOffers]}-${iterator}" type="checkbox" name="event-offer-luggage" checked="">
      <label class="event__offer-label" for="event-offer-${styleOffers[keyStyleOffers]}-${iterator}">
      <span class="event__offer-title">${array.eventOfferTitle}</span>
           +€&nbsp;
       <span class="event__offer-price">${array.evenOfferPrice}</span>
       </label>
     </div>
    `
  );
};

/**
 * Новая форма
 * @param {*}  eventOneDay;
 * @param {*}  iterator;
 * @return{html} возращает разметку
 */
const getFormEditEventTemplate = (eventOneDay, iterator) => {

  const eventType = eventOneDay.eventPoint;

  const pointEventList = eventOneDay.eventPointTown;

  let offersForType = eventOneDay.eventOffers;

  const eventAvailableOffers = offersForType.map((it) => getEventAvailableOffer(it, iterator)).join(`\n`);
  const isFavorite = `${eventOneDay.favorite ? `checked=""` : ``}`;
  const eventStartTime = moment().format();
  const eventEndTime = moment().format();
  return (
    `
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${iterator}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon" width="17" height="17">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${iterator}" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${iterator}">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-${iterator}">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-${iterator}">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-${iterator}">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-${iterator}">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-${iterator}">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-${iterator}">Flight</label>
          </div>
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          <div class="event__type-item">
            <input id="event-type-check-in-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${iterator}">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${iterator}">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${iterator}">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${iterator}">
      ${eventType} to
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${iterator}" type="text" name="event-destination" value="${pointEventList}" list="destination-list-${iterator}">
      <datalist id="destination-list-${iterator}">
      ${pointEventList}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${iterator}">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-${iterator}" type="text" name="event-start-time" value="${eventStartTime}">
      —
      <label class="visually-hidden" for="event-end-time-${iterator}">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-${iterator}" type="text" name="event-end-time" value="${eventEndTime}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${iterator}">
        <span class="visually-hidden">Price</span>
        €
      </label>
      <input class="event__input  event__input--price" id="event-price-${iterator}" type="text" name="event-price" value="160">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>

    <input id="event-favorite-${iterator}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
    <label class="event__favorite-btn" for="event-favorite-${iterator}">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>

  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
          ${eventAvailableOffers}
      </div>
    </section>
  </section>
  </form>
    `
  );
};

export default class FormEditComponent extends SmartComponent {
  constructor(point, iterator) {
    super();
    this._iterator = iterator;
    this._point = point;

    this._editFormClickHandler = null;
    this._deleteClickHandler = null;
    this._favoriteFormClickHandler = null;
    this._editFormSubmitHandler = null;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return getFormEditEventTemplate(this._point, this._iterator);
  }
  // --??? как сделать правильный резет
  reset() {
    this.rerender();
  }

  setEditFormClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._editFormClickHandler = handler;
  }

  setFavoriteFormClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
    this._favoriteFormClickHandler = handler;
  }

  setDeleteClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);
    this._deleteClickHandler = handler;
  }

  setEditFormSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._editFormSubmitHandler = handler;
  }

  // выношу все слушатели которые изменяют форму отдельно
  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
      .addEventListener(`change`, (evt) => {
        // console.log(evt.target.textContent); - пустая  строка
        // -? почему не даёт текст ?

        // замена первой буквы на заглавную
        let smallCase = evt.target.value;
        this._point.eventPoint = smallCase[0].toUpperCase() + smallCase.slice(1);
        this._point.eventOffers = POINT_TYPE[this._point.eventPoint];
        this.rerender();
      });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {
        this._point.eventPointTown = evt.target.value;
        // --?? не могу понять как тут должно работать
        this.rerender();
      });
  }


  recoveryListeners() {
    this.setEditFormClickHandler(this._editFormClickHandler);
    this.setFavoriteFormClickHandler(this._favoriteFormClickHandler);
    this.setDeleteClickHandler(this._deleteClickHandler);
    this.setEditFormSubmitHandler(this._editFormSubmitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  _applyFlatpickr() {
    // искать имено так
    const dateEndElement = this.getElement().querySelector(`[name="event-end-time"]`);
    const dateStartElement = this.getElement().querySelector(`[name="event-start-time"]`);

    if (dateStartElement) {
      this._flatpickrStart = flatpickr(dateStartElement, {
        enableTime: true,
        altFormat: `d/m/y H:i`,
        altInput: true,
        [`time_24hr`]: true,
        defaultDate: Date.now()
      });
    }
    if (dateEndElement) {
      this._flatpickrEnd = flatpickr(dateEndElement, {
        enableTime: true,
        altFormat: `d/m/y H:i`,
        altInput: true,
        [`time_24hr`]: true,
      });
    }
  }

  // вынес отдельно удаление
  removeFlatpickrElement() {
    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }

    if (this._flatpickrEnd) {
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }

    super.removeElement();
  }

}
