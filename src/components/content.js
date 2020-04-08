/**
 * Главный контейнер для контента
 * @return{html} возращает разметку
 */
export const createMainContent = () => {
  return (
    `
      <ul class="trip-days">

      </ul>
    `
  );
};
/**
 * Контейнер для точки маршрута
 * @param {*} task
 * @return{html} возращает разметку
 */
export const createPointTemplate = (task) => {
  // const {} = task;
  const date = `APR 08`;
  // автоисправление даты ?
  const eventIcon = `<img class="event__type-icon" src="img/icons/taxi.png" alt="Event type icon" width="42" height="42">
  `;
  const eventTitle = `Taxi to Amsterdam`;
  const eventTimeStart = `10:30`;
  const eventTimeEnd = `11:00`;
  const eventPrice = `20`;
  // сделать разницу между старт и енд
  const eventDuration = `30M`;
  const eventOffer = `Order Uber`;
  const eventOfferPrice = `20`;

  return (
    `
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">1</span>
      <time class="day__date" datetime="2019-03-18">${date}</time>
    </div>

    <ul class="trip-events__list">
      <li class="trip-events__item">
        <div class="event">
          <div class="event__type">
          ${eventIcon}
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
            <li class="event__offer">
              <span class="event__offer-title">${eventOffer}</span>
              +
              €&nbsp;<span class="event__offer-price">${eventOfferPrice}</span>
             </li>
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    </ul>

  </li>
      `
  );
};
