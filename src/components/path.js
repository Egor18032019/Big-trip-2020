import {
  PATH_DAYS
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
/**
 *  Маршрут и  дата
 * @return{html} возращает разметку
 */
export const createSitePathTemplate = () => {
  return (
    `
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

     <p class="trip-info__dates">${PATH_DAYS}</p>
       </div>
    `
  );
};
