// отрисовка формы добавление нового эвента
import {
  getRandomArrayItem,
  createElement
} from '../utils.js';

/**
 * Делает datalist выборки городов
 * @param {*} town
 * @return{html} разметку
 */
const getPointTownEventList = (town) => {
  return (
    `
 <option value="${town}"></option>
    `
  );
};

/**
 * Выдает разметку  для offers
 * @param {*} array массив где лежит ключ:значение
 * @return{html} возращает разметку
 */
const getEventAvailableOffer = (array) => {
  return (
    `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
      <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${array.eventOfferTitle}</span>
           +€&nbsp;
       <span class="event__offer-price">${array.evenOfferPrice}</span>
       </label>
     </div>
    `
  );
};

/**
 * отрисовывает описание(description)
 * @param {*} description
 * @param {*} descriptionImg
 * @return{html} возращает разметку
 */
const getPointDestination = (description, descriptionImg) => {
  const pathDestination = description;
  const destinationImg = descriptionImg;
  return (
    `
   <p class="event__destination-description">${pathDestination}</p>
   <div class="event__photos-container">
    <div class="event__photos-tape">
    ${destinationImg}
    </div>
  </div>
`
  );
};

/**
 * Новая форма
 * @param {*} vremennoOpisanie
 * @param {*} vremennoTown
 * @param {*} pointType
 * @return{html} возращает разметку
 */
export const getSiteAddNewEventTemplate = (vremennoOpisanie, vremennoTown, pointType) => {
  const {
    eventPointDestination
  } = vremennoOpisanie;

  const keysPointType = Object.keys(pointType);
  const eventType = getRandomArrayItem(keysPointType);

  const pointEventList = vremennoTown.map((it) => getPointTownEventList(it)).join(`\n`);

  let offersForType = pointType[eventType];
  const eventAvailableOffers = offersForType.map((it) => getEventAvailableOffer(it)).join(`\n`);
  const pointDestination = getPointDestination(eventPointDestination.pathDestination, eventPointDestination.destinationImg);
  return (
    `
<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon" width="17" height="17">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>

                    <div class="event__type-item">
                      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                      <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                      <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                      <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                      <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" checked="">
                      <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                      <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                    </div>
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>

                    <div class="event__type-item">
                      <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                      <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                      <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                ${eventType} to
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">

                  <datalist id="destination-list-1">
                  ${pointEventList}
                  </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
                —
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  €
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                ${eventAvailableOffers}
                </div>
              </section>

              <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${pointDestination}
            </section>
            </section>
          </form>
    `
  );
};

export default class FormComponent {
  constructor(point) {
    this._point = point;

    this._element = null;
  }

  getTemplate() {
    return getSiteAddNewEventTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
