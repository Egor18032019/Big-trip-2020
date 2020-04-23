// отрисовыает точки и даты маршрута
import {
  createElement
} from '../utils.js';


const getPathPointDate = (itemArray) => {
  return itemArray.eventDate;
};
/**
 *  Маршрут и  дата
 * @param {*} listEvent список ивентов
 * @return{html} возращает разметку
 */
const getSitePathTemplate = (listEvent) => {
  let pathDate = ``;
  if (listEvent) {
    pathDate = listEvent.map((it) => getPathPointDate(it)).join(` &mdash; `);
  }
  return (
    `
    <p class="trip-info__dates">${pathDate}</p>
    `
  );
};

export default class SiteDateTemplate {
  constructor(point) {
    this._point = point;

    this._element = null;
  }

  getTemplate() {
    return getSitePathTemplate(this._point);
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
