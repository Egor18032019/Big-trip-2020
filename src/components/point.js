// отрисовыает точки и даты маршрута
import AbstractComponent from "../components/abstract-component.js";

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
  let pathPoints = ``;
  if (listEvent) {
    pathPoints = listEvent.map((it) => getPathPointTown(it)).join(` &mdash; `);
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
