// отрисовка меню
import {
  createElement
} from '../utils.js';
/**
 *  Table и Stats
 * @return{html} возращает разметку
 */
export default class SiteMenuTemplate {
  constructor(point) {
    this._point = point;

    this._element = null;
  }

  getTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
         <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
         <a class="trip-tabs__btn" href="#">Stats</a>
      </nav>`
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
