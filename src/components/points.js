// отрисовка дней маршрута
import {
  createElement
} from '../utils.js';

export default class PointComponent {
  constructor(point, iterator) {
    this._iterator = iterator;
    this._point = point;

    this._element = null;
  }

  getTemplate() {
    const {
      eventDate: dayEventDate,
    } = this._point;

    return (`
    <li class="trip-days__item  day">
      <div class="day__info">
      <span class="day__counter">${this._iterator + 1}</span>
      <time class="day__date" datetime="2019-03-18">${dayEventDate}</time>
      </div>
     <ul class="trip-events__list">
     </ul>
    </li>
      `);
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
