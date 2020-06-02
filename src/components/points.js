// отрисовка дней маршрута
import AbstractComponent from "../components/abstract-component.js";
import moment from "moment";


export default class PointComponent extends AbstractComponent {
  constructor(point = 0, iterator = 0) {
    super();

    this._iterator = iterator;
    this._point = point;
  }

  getTemplate() {
    const {
      eventDate,
    } = this._point;

    let dayEventDate;
    let iterator = this._iterator;
    if (eventDate) {
      dayEventDate = moment(eventDate).format(`D MMM`);
      iterator = iterator + 1;
    } else {
      dayEventDate = ``;
      iterator = ``;
    }
    return (`
    <li class="trip-days__item day ">
      <div class="day__info">
      <span class="day__counter">${iterator}</span>
      <time class="day__date" datetime="${dayEventDate}">${dayEventDate}</time>
      </div>
     <ul class="trip-events__list">
     </ul>
    </li>
      `);
  }

  setDeleteClickHandler() {
    // console.log(handler);
  }

}
