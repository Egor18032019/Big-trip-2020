// отрисовыает даты маршрута
import AbstractComponent from "../components/abstract-component.js";
import moment from "moment";

const getPathPointDate = (itemArray) => {
  const dayEventDate = moment(itemArray.eventDate).format(`MMM do DD`).substring(0, 5);

  return dayEventDate;
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

export default class SiteDateTemplate extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return getSitePathTemplate(this._point);
  }

}
