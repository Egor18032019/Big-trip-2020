// отрисовывает стоимость

import {
  createElement
} from '../utils.js';

/**
 *   Стоимость 1230
 * @return{html} возращает разметку
 */
export default class SiteCostTemplate {
  constructor(point) {
    this._point = point;

    this._element = null;
  }

  getTemplate() {
    let totalCost = 0;
    for (let eventDay = 0; eventDay < this._point.length; eventDay++) {
      for (let point = 0; point < this._point[eventDay].points.length; point++) {
        let priceOneEvent = this._point[eventDay].points[point].eventPrice;
        totalCost = totalCost + priceOneEvent;
      }
    }
    return (
      `
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
        </p>`
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
