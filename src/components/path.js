import {
  createElement
} from '../utils.js';
/**
 *  контайнер для  маршурта и стоимости
 * @return{html} возращает разметку
 */
export default class SiteHeaderContainerTemplate {
  constructor(point) {
    this._point = point;

    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="trip-main__trip-info  trip-info">
         <div class="trip-info__main">

         </div>

      </section>`
    );
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


