// отрисовывает стоимость
import AbstractComponent from "../components/abstract-component.js";

/**
 *   Стоимость 1230
 * @return{html} возращает разметку
 */
export default class SiteCostTemplate extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    let totalCost = 0;
    if (this._point) {
      for (let eventDay = 0; eventDay < this._point.length; eventDay++) {
        for (let point = 0; point < this._point[eventDay].points.length; point++) {
          let priceOneEvent = this._point[eventDay].points[point].eventPrice;
          totalCost = totalCost + priceOneEvent;
        }
      }
    }
    return (
      `
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
        </p>`
    );
  }


}
