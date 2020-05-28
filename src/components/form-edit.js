import SmartComponent from "../components/smart-component.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import moment from 'moment';
import {
  POINT_TYPE,
  styleOffers,
} from '../mock/const.js';

import {
  Mode
} from '../controllers/point.js';


const getEventAvailableOffer = (array, id, cheked) => {
  let keyStyleOffers = array.eventOfferTitle;
  return (
    `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${styleOffers[keyStyleOffers]}-${id}" type="checkbox"
       name="event-offer-luggage" ${cheked ? `checked=""` : ``}>
      <label class="event__offer-label" for="event-offer-${styleOffers[keyStyleOffers]}-${id}">
      <span class="event__offer-title">${array.eventOfferTitle}</span>
           +€&nbsp;
       <span class="event__offer-price">${array.evenOfferPrice}</span>
       </label>
     </div>
    `
  );
};

const getCheked = (array, it, id) => {
  let cheked = array.includes(it);
  return getEventAvailableOffer(it, id, cheked);
};

/**
 * Новая форма
 * @param {*}  eventOneDay масив с данными;
 * @param {*}  mode какой режим;
 * @return{html} возращает разметку
 */
const getFormEditEventTemplate = (eventOneDay, mode) => {
  const eventType = eventOneDay.eventPoint;
  const id = eventOneDay.id || new Date().getTime();
  const pointEventList = eventOneDay.eventPointTown;
  let offersForType = eventOneDay.eventOffers;
  const eventOffers = POINT_TYPE[eventType];
  const eventAvailableOffers = eventOffers.map((it) => getCheked(offersForType, it, id)).join(`\n`);
  const isFavorite = `${eventOneDay.favorite ? `checked=""` : ``}`;
  const eventStartTime = moment().format();
  const eventEndTime = moment().format();
  return (
    `
    <form class="event event--edit ${mode === Mode.ADDING ? ` trip-events__item` : ` `}
    " action="#" method="post">
    <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon" width="17" height="17">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${id}">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-${id}">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-${id}">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-${id}">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-${id}">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-${id}">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-${id}">Flight</label>
          </div>
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          <div class="event__type-item">
            <input id="event-type-check-in-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${id}">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${id}">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${id}">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${id}">
      ${eventType} to
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${pointEventList}" list="destination-list-${id}">
      <datalist id="destination-list-${id}">
      ${pointEventList}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${eventStartTime}">
      —
      <label class="visually-hidden" for="event-end-time-${id}">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${eventEndTime}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        €
      </label>
      <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${eventOneDay.eventPrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">

    ${mode === Mode.DEFAULT ? `Delete` : ` Cancel`}
    </button>

    <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
    <label class="event__favorite-btn" for="event-favorite-${id}">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </label>

    ${mode !== Mode.ADDING ? ` <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
   </button>` : ` `}

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
    `);
};

const NewFormDataId = {
  eventPoint: `Flight`,
  eventTitle: ``,
  eventOffers: [{
    eventOfferTitle: `add luggage`,
    evenOfferPrice: ` 20`
  }, {
    eventOfferTitle: `add meal`,
    evenOfferPrice: `  21`
  }, {
    eventOfferTitle: `Choose seats`,
    evenOfferPrice: `5 $ `
  }],
  eventPrice: ``,
  eventPointTown: ``,
  favorite: false,
};

export default class FormEditComponent extends SmartComponent {
  constructor(point, mode) {
    super();
    this._point = point || NewFormDataId;
    this._mode = mode;

    this._editFormClickHandler = null;
    this._deleteClickHandler = null;
    this._deleteButtonClickHandler = null;
    this._favoriteFormClickHandler = null;
    this._editFormSubmitHandler = null;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._endDate = this._point.eventTimeEnd;
    this._startDate = this._point.eventTimeStart;
    this._applyFlatpickr();
    this._subscribeOnEvents();
    this._getSelectedOffers();
    this._getFavoriteStatus();
    // тут получаем данные -> потом меняем в слушателях и передаем в getData() в новый обьект
    this._point.eventPoint = this._point.eventPoint;
    this._point.eventOffers = this._point.eventOffers;
    this._point.eventPointTown = this._point.eventPointTown;
    this._point.eventPrice = this._point.eventPrice;
    this._tripEventActiveOffers = this._point.eventOffers;
  }

  getItem() {
    return this._point;
  }


  getTemplate() {
    return getFormEditEventTemplate(this._point, this._mode);
  }
  reset() {
    this.rerender();
  }

  setEditFormClickHandler(handler) {
    if (this.getElement().querySelector(`.event__rollup-btn`)) {
      this.getElement().querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, handler);
      this._editFormClickHandler = handler;
    }
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
    // изменения иконки и затем удобств
    element.querySelector(`.event__type-list`)
      .addEventListener(`change`, (evt) => {
        // замена первой буквы на заглавную
        let smallCase = evt.target.value;
        this._point.eventPoint = smallCase[0].toUpperCase() + smallCase.slice(1);
        this._point.eventTitle = this._point.eventPoint;
        this._point.eventOffers = POINT_TYPE[this._point.eventPoint];
        this.render();
      });
    // изменение города назначения
    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {
        this._point.eventPointTown = evt.target.value;
      });
    // изменение цены
    element.querySelector(`.event__input--price`)
      .addEventListener(`change`, (evt) => {
        this._point.eventPrice = evt.target.value;
      });
    // определение даты
    element.querySelector(`[name="event-end-time"]`)
      .addEventListener(`change`, (evt) => {
        this._endDate = new Date(evt.target.value);
      });
    element.querySelector(`[name="event-start-time"]`)
      .addEventListener(`change`, (evt) => {
        this._startDate = new Date(evt.target.value);
      });
  }

  _getSelectedOffers() {
    let selectedOffers = [];
    const offers = this.getElement().querySelectorAll(`.event__offer-checkbox:checked`);
    offers.forEach((item) => {
      const eventOfferTitle = item.parentElement.querySelector(`.event__offer-title`).textContent;
      const evenOfferPrice = item.parentElement.querySelector(`.event__offer-price`).textContent;
      let offerElement = {
        eventOfferTitle,
        evenOfferPrice,
      };
      selectedOffers.push(offerElement);
    });
    return selectedOffers;
  }
  _getFavoriteStatus() {
    return this.getElement().querySelector(`.event__favorite-checkbox`).checked;
    // return (this.getElement().querySelector(`.event__favorite-checkbox:checked`)) ? true : false;
  }

  recoveryListeners() {
    this.setEditFormClickHandler(this._editFormClickHandler);
    this.setDeleteClickHandler(this._deleteClickHandler);
    this.setEditFormSubmitHandler(this._editFormSubmitHandler);
    this._subscribeOnEvents();
  }
  rerender() {
    this.removeFlatpickrElement();
    super.render();
    this._applyFlatpickr();
  }
  _applyFlatpickr() {
    // искать имено так
    const dateEndElement = this.getElement().querySelector(`[name="event-end-time"]`);
    const dateStartElement = this.getElement().querySelector(`[name="event-start-time"]`);
    let timeForstart;
    if (this._point.eventTimeStart) {
      timeForstart = new Date(moment(this._point.eventTimeStart, `DD/MM/YY HH:mm`).format());
    } else {
      timeForstart = new Date();
    }
    let timeForEnd;
    if (this._point.eventTimeStart) {
      timeForEnd = new Date(moment(this._point.eventTimeEnd, `DD/MM/YY HH:mm`).format());
    } else {
      timeForEnd = new Date();
    }
    if (dateStartElement) {
      this._flatpickrStart = flatpickr(
          dateStartElement, {
            enableTime: true,
            dateFormat: `d/m/y H:i`,
            altFormat: `d/m/y H:i`,
            altInput: true,
            [`time_24hr`]: true,
            defaultDate: timeForstart,
          }
      );
    }
    if (dateEndElement) {
      this._flatpickrEnd = flatpickr(dateEndElement, {
        enableTime: true,
        altFormat: `d/m/y H:i`,
        altInput: true,
        [`time_24hr`]: true,
        defaultDate: timeForEnd,
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
  // создать функциию которая выдаст нам оббьект(в нужной нам структуре)
  //  который надо передать в модель
  getData() {
    const tripEvent = {
      id: this._point.id,
      eventPoint: this._point.eventPoint,
      eventTitle: this._point.eventPoint + ` ` + this._point.eventPointTown,
      eventOffers: this._getSelectedOffers(),
      eventTimeStart: this._startDate,
      eventTimeEnd: this._endDate,
      eventPrice: this._point.eventPrice,
      eventDuration: 11,
      eventPointTown: this._point.eventPointTown,
      eventPointDestination: {
        pathDestination: `тестовысе слова`,
        destinationImg: `  <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">`,
      },
      favorite: this._getFavoriteStatus(),
    };

    return tripEvent;
  }

}
