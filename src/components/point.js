// отрисовыает точки и даты маршрута
import {
  createElement
} from '../utils.js';

const getPathPointTown = (itemArray) => {
  let totalPath = ``;
  for (let eventDay = 0; eventDay < itemArray.points.length; eventDay++) {
    totalPath = totalPath + ` ` + itemArray.points[eventDay].eventPointTown;
  }
  return totalPath;
};
/**
 *  Маршрут и  дата
 * @param {*} listEvent список ивентов
 * @return{html} возращает разметку
 */
const getSitePathTemplate = (listEvent) => {
  const pathPoints = listEvent.map((it) => getPathPointTown(it)).join(` &mdash; `);
  return (
    `
    <h1 class="trip-info__title">${pathPoints}</h1>
    `
  );
};

export default class SitePathTemplate {
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
