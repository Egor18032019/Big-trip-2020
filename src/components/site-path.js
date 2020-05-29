// отрисовыает точки и даты маршрута
import AbstractComponent from "./abstract-component.js";

/**
 *  Маршрут и  дата
 * @param {*} listEvent список ивентов
 * @return{html} возращает разметку
 */
const getSitePathTemplate = (listEvent) => {
  let pathPoints = ``;
  if (listEvent) {
    pathPoints = listEvent.map((it) => it.eventPointTown).join(` &mdash; `);
  }
  return (
    `
    <h1 class="trip-info__title">${pathPoints}</h1>
    `
  );
};

export default class SitePathTemplate extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return getSitePathTemplate(this._point);
  }

}
