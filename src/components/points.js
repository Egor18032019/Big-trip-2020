// отрисовка дней маршрута
import AbstractComponent from "../components/abstract-component.js";
import moment from "moment";


export default class PointComponent extends AbstractComponent {
  constructor(point, iterator = 0) {
    super();

    this._iterator = iterator;
    this._point = point;
  }

  getTemplate() {
    const {
      eventDate,
    } = this._point;
    const dayEventDate = moment(eventDate).format(`MMM Do YY`).substring(0, 5);
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

}
