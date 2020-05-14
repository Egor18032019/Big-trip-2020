import SmartComponent from "../components/smart-component.js";

const styleOffers = {
  "Rent a car": `luggage`,
  "Order Uber": `comfort`,
  "Поймать попопутку": `meal`,
  "Rent a vagon": `luggage`,
  "Order traindriver": `comfort`,
  "Выйти покурить": `meal`,
  "Rent a Ship": `luggage`,
  "Order Ship": `comfort`,
  "Пропиратить шхуну": `meal`,
  "add luggage": `luggage`,
  "add meal": `comfort`,
  "Choose seats": `meal`,
  "Швеский стол": `luggage`,
  "Больше мясо": `comfort`,
  "Choose table": `meal`,

};

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
  const isFavorite = `${eventOneDay.favorite ? `checked` : ``}`;
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
      <input class="event__input  event__input--time" id="event-start-time-${iterator}" type="text" name="event-start-time" value="18/03/19 12:25">
      —
      <label class="visually-hidden" for="event-end-time-${iterator}">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-${iterator}" type="text" name="event-end-time" value="18/03/19 13:35">
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
// для тестов
// const getChoiseFormEditTemplate = () => {
//   return (
//     `

//     <header class="event__header">
//     <div class="event__type-wrapper">
//       <label class="event__type  event__type-btn" for="event-type-toggle-${iterator}">
//         <span class="visually-hidden">Choose event type</span>
//         <img class="event__type-icon" src="img/icons/ship.png" alt="Event type icon" width="17" height="17">
//       </label>
//       <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${iterator}" type="checkbox">

//       <div class="event__type-list">
//         <fieldset class="event__type-group">
//           <legend class="visually-hidden">Transfer</legend>

//           <div class="event__type-item">
//             <input id="event-type-taxi-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
//             <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${iterator}">Taxi</label>
//           </div>

//           <div class="event__type-item">
//             <input id="event-type-bus-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
//             <label class="event__type-label  event__type-label--bus" for="event-type-bus-${iterator}">Bus</label>
//           </div>

//           <div class="event__type-item">
//             <input id="event-type-train-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
//             <label class="event__type-label  event__type-label--train" for="event-type-train-${iterator}">Train</label>
//           </div>

//           <div class="event__type-item">
//             <input id="event-type-ship-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
//             <label class="event__type-label  event__type-label--ship" for="event-type-ship-${iterator}">Ship</label>
//           </div>

//           <div class="event__type-item">
//             <input id="event-type-transport-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
//             <label class="event__type-label  event__type-label--transport" for="event-type-transport-${iterator}">Transport</label>
//           </div>

//           <div class="event__type-item">
//             <input id="event-type-drive-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
//             <label class="event__type-label  event__type-label--drive" for="event-type-drive-${iterator}">Drive</label>
//           </div>

//           <div class="event__type-item">
//             <input id="event-type-flight-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
//             <label class="event__type-label  event__type-label--flight" for="event-type-flight-${iterator}">Flight</label>
//           </div>
//         </fieldset>

//         <fieldset class="event__type-group">
//           <legend class="visually-hidden">Activity</legend>

//           <div class="event__type-item">
//             <input id="event-type-check-in-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
//             <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${iterator}">Check-in</label>
//           </div>

//           <div class="event__type-item">
//             <input id="event-type-sightseeing-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
//             <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${iterator}">Sightseeing</label>
//           </div>

//           <div class="event__type-item">
//             <input id="event-type-restaurant-${iterator}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
//             <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${iterator}">Restaurant</label>
//           </div>
//         </fieldset>
//       </div>
//     </div>

//     <div class="event__field-group  event__field-group--destination">
//       <label class="event__label  event__type-output" for="event-destination-${iterator}">
//       Ship to
//       </label>
//       <input class="event__input  event__input--destination" id="event-destination-${iterator}" type="text" name="event-destination" value="Amsterdam" list="destination-list-${iterator}">
//       <datalist id="destination-list-${iterator}">
//       Amsterdam
//       </datalist>
//     </div>

//     <div class="event__field-group  event__field-group--time">
//       <label class="visually-hidden" for="event-start-time-${iterator}">
//         From
//       </label>
//       <input class="event__input  event__input--time" id="event-start-time-${iterator}" type="text" name="event-start-time" value="18/03/19 12:25">
//       —
//       <label class="visually-hidden" for="event-end-time-${iterator}">
//         To
//       </label>
//       <input class="event__input  event__input--time" id="event-end-time-${iterator}" type="text" name="event-end-time" value="18/03/19 13:35">
//     </div>

//     <div class="event__field-group  event__field-group--price">
//       <label class="event__label" for="event-price-${iterator}">
//         <span class="visually-hidden">Price</span>
//         €
//       </label>
//       <input class="event__input  event__input--price" id="event-price-${iterator}" type="text" name="event-price" value="160">
//     </div>

//     <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
//     <button class="event__reset-btn" type="reset">Delete</button>

//     <input id="event-favorite-${iterator}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="">
//     <label class="event__favorite-btn" for="event-favorite-${iterator}">
//       <span class="visually-hidden">Add to favorite</span>
//       <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
//         <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
//       </svg>
//     </label>

//     <button class="event__rollup-btn" type="button">
//       <span class="visually-hidden">Open event</span>
//     </button>
//   </header>

//   <section class="event__details">
//     <section class="event__section  event__section--offers">
//       <h3 class="event__section-title  event__section-title--offers">Offers</h3>

//       <div class="event__available-offers">

//     <div class="event__offer-selector">
//       <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${iterator}" type="checkbox" name="event-offer-luggage" checked="">
//       <label class="event__offer-label" for="event-offer-luggage-${iterator}">
//       <span class="event__offer-title">Rent a Ship</span>
//            +€&nbsp;
//        <span class="event__offer-price"> 200</span>
//        </label>
//      </div>


//     <div class="event__offer-selector">
//       <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${iterator}" type="checkbox" name="event-offer-luggage" checked="">
//       <label class="event__offer-label" for="event-offer-comfort-${iterator}">
//       <span class="event__offer-title">Order Ship</span>
//            +€&nbsp;
//        <span class="event__offer-price"> 20</span>
//        </label>
//      </div>


//     <div class="event__offer-selector">
//       <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-${iterator}" type="checkbox" name="event-offer-luggage" checked="">
//       <label class="event__offer-label" for="event-offer-meal-${iterator}">
//       <span class="event__offer-title">Пропиратить шхуну</span>
//            +€&nbsp;
//        <span class="event__offer-price">Виселица</span>
//        </label>
//      </div>

//       </div>
//     </section>
//   </section>

//     `
//   );

// };

export default class FormEditComponent extends SmartComponent {
  constructor(point, iterator) {
    super();
    this._iterator = iterator;
    this._point = point;

    this._editFormClickHandler = null;
    this._deleteClickHandler = null;
    this._favoriteFormClickHandler = null;
    this._editFormSubmitHandler = null;
  }

  getTemplate() {
    return getFormEditEventTemplate(this._point, this._iterator);
  }

  reset() {
    this.getElement().reset();
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

  setChoiseClickHandler() {
    this.rerender();
  }


  recoveryListeners() {
    this.setEditFormClickHandler(this._editFormClickHandler);
    this.setFavoriteFormClickHandler(this._favoriteFormClickHandler);
    this.setDeleteClickHandler(this._deleteClickHandler);
    this.setEditFormSubmitHandler(this._editFormSubmitHandler);
    // this._subscribeOnEvents();
  }
}
