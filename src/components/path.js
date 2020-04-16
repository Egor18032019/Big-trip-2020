import {
  allEvent
} from '../mock/const.js';

/**
 *  контайнер для  маршурта и стоимости
 * @return{html} возращает разметку
 */
export const createHeaderContainerTemplate = () => {
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
export const createSitePriceTemplate = () => {
  return (
    `
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>`
  );
};


const createPathPointTown = (itemArray) => {
  return itemArray.eventPointTown;
};
const createPathPointDate = (itemArray) => {
  return itemArray.eventDate;
};
/**
 *  Маршрут и  дата
 * @return{html} возращает разметку
 */
export const createSitePathTemplate = () => {
  const pathPoints = allEvent.map((it) => createPathPointTown(it)).join(` &mdash; `);
  const pathDate = allEvent.map((it) => createPathPointDate(it)).join(` &mdash; `);

  return (
    `
      <h1 class="trip-info__title">${pathPoints}</h1>

     <p class="trip-info__dates">${pathDate}</p>
       </div>
    `
  );
};

