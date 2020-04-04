'use strict';
//  генерация разметки
(function () {

  const POINT_PATH = 3;
  /**
   * .trip-main
   */
  const runMainElement = document.querySelector(`.trip-main`);
  /**
   * `.trip-main__trip-controls в infoMainElement
   */
  const tripControlsElement = runMainElement.querySelector(`.trip-controls`);
  const tripControlH2 = tripControlsElement.querySelectorAll(`h2`);
  // в переменую firstH2 записываем первый элемент псевдо массива tripControlH2
  const [firstH2] = tripControlH2;

  /**
   *  контайнер для  маршурта и стоимости
   * @return{html} возращает разметку
   */
  const createHeaderContainerTemplate = () => {
    return (
      `<section class="trip-main__trip-info  trip-info">
       <div class="trip-info__main">

       </div>

    </section>`
    );
  };
  /**
   *   Стоимость
   * @return{html} возращает разметку
   */
  const createSitePriceTemplate = () => {
    return (
      `
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>`
    );
  };
  /**
   *  Маршрут и  дата
   * @return{html} возращает разметку
   */
  const createSitePathTemplate = () => {
    return (
      `
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

     <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
       </div>
    `
    );
  };

  /**
   *  меню
   * @return{html} возращает разметку
   */
  const createSiteMenuTemplate = () => {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
       <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
       <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
    );
  };
  /**
   *   Фильтры
   * @return{html} возращает разметку
   */
  const createSiteFiltrTemplate = () => {
    return (
      ` <form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
    );
  };
  /**
   *    контейнер для контента
   * @return{html} возращает разметку
   */
  const createContentTemplate = () => {
    return (
      `
      <ul class="trip-days">

      </ul>
    `
    );
  };
  /**
   *    контейнер для даты
   * @return{html} возращает разметку
   */
  const createContentDayTemplate = () => {
    return (
      `
      <li class="trip-days__item  day">
      <div class="day__info">

      </div>

      <ul class="trip-events__list">

      </ul>
    </li>
    `
    );
  };
  /**
   * День и дата
   * @return{html} возращает разметку
   */
  const createDayTemplate = () => {
    return (
      `
         <span class="day__counter">1</span>
         <time class="day__date" datetime="2019-03-18">MAR 18</time>
      `
    );
  };
  /**
   * точка маршрута и остальное
   * @return{html} возращает разметку
   */
  const createPointTemplate = () => {
    return (
      `
      <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Taxi to Amsterdam</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
          </p>
          <p class="event__duration">30M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">20</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Order Uber</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">20</span>
           </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
      `
    );
  };

  /**
   *   Новая форма
   * @return{html} возращает разметку
   */
  const createSiteAddNewEventTemplate = () => {
    return (
      `
<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" src="img/icons/flight.png" alt="Event type icon" width="17" height="17">
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
                      <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                      <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
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
                  Flight to
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
                <datalist id="destination-list-1">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                  <option value="Saint Petersburg"></option>
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
                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
                    <label class="event__offer-label" for="event-offer-luggage-1">
                      <span class="event__offer-title">Add luggage</span>
                      +
                      €&nbsp;<span class="event__offer-price">30</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked="">
                    <label class="event__offer-label" for="event-offer-comfort-1">
                      <span class="event__offer-title">Switch to comfort class</span>
                      +
                      €&nbsp;<span class="event__offer-price">100</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                    <label class="event__offer-label" for="event-offer-meal-1">
                      <span class="event__offer-title">Add meal</span>
                      +
                      €&nbsp;<span class="event__offer-price">15</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                    <label class="event__offer-label" for="event-offer-seats-1">
                      <span class="event__offer-title">Choose seats</span>
                      +
                      €&nbsp;<span class="event__offer-price">5</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                    <label class="event__offer-label" for="event-offer-train-1">
                      <span class="event__offer-title">Travel by train</span>
                      +
                      €&nbsp;<span class="event__offer-price">40</span>
                    </label>
                  </div>
                </div>
              </section>
            </section>
          </form>
    `
    );
  };
  /**
   *   Сортировка
   * @return{html} возращает разметку
   */
  const createSiteSortTemplate = () => {
    return (
      `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>

        <div class="trip-sort__item  trip-sort__item--event">
          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
          <label class="trip-sort__btn" for="sort-event">Event</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--time">
          <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
          <label class="trip-sort__btn" for="sort-time">
            Time
            <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
            </svg>
          </label>
        </div>

        <div class="trip-sort__item  trip-sort__item--price">
          <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
          <label class="trip-sort__btn" for="sort-price">
            Price
            <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
            </svg>
          </label>
        </div>

        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>
    `
    );
  };


  /**
   * функция рендеринга изображений
   * @param {*} container  - куда будет всталвяться
   * @param {*} template шаблон разметки
   * @param {*} place позицию добавляемого элемента (`beforebegin`,`beforeend`,`afterbegin`,`afterend`)
   */
  const render = (container, template, place = `afterbegin`) => {
    container.insertAdjacentHTML(place, template);
  };


  if (runMainElement) {
    render(runMainElement, createHeaderContainerTemplate());
  }
  // отрисовали контайнер и  и теперь отрисовывем цену с маршрутом
  const pathElement = document.querySelector(`.trip-info__main`);
  if (pathElement) {
    render(pathElement, createSitePathTemplate());
  }
  const priceElement = document.querySelector(`.trip-info`);
  if (priceElement) {
    render(priceElement, createSitePriceTemplate(), `beforeend`);
  }

  if (firstH2) {
    render(firstH2, createSiteMenuTemplate(), `afterend`);
  }
  if (tripControlsElement) {
    render(tripControlsElement, createSiteFiltrTemplate(), `beforeend`);
  }
  /**
   * trip-events
   */
  const sortMainElement = document.querySelector(`.trip-events`);
  if (sortMainElement) {
    render(sortMainElement, createSiteSortTemplate(), `beforeend`);
  }
  if (sortMainElement) {
    render(sortMainElement, createSiteAddNewEventTemplate(), `beforeend`);
  }
  if (sortMainElement) {
    render(sortMainElement, createContentTemplate(), `beforeend`);
  }
  // после отрисовки контейнера контента отрисовываем контейнер для даты
  const tripDays = document.querySelector(`.trip-days`);

  if (tripDays) {
    render(tripDays, createContentDayTemplate(), `beforeend`);
  }
  // и дату
  const dayInfo = document.querySelector(`.day__info`);
  if (dayInfo) {
    render(dayInfo, createDayTemplate(), `beforeend`);
  }
  // и точку маршрута
  const tripEventsList = document.querySelector(`.trip-events__list`);

  for (let i = 0; i < POINT_PATH; i++) {
    if (tripEventsList) {
      render(tripEventsList, createPointTemplate(), `beforeend`);
    }
  }

})();
