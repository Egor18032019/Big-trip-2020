// отрисовывает фильтры Everything/Future/Past

import AbstractComponent from "../components/abstract-component.js";
import {
  FilterType
} from "../mock/const.js";

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  // отрезаем лишнее чтобы получить тип фильтра
  return id.substring(FILTER_ID_PREFIX.length);
};

const getOneFilterTemplate = (it) => {
  return (
    `
    <div class="trip-filters__filter">
    <input id="filter-${it}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${it}" checked>
    <label class="trip-filters__filter-label" for="filter-${it}">${it}</label>
    </div>
  `
  );
};

const getFiltersTemplate = () => {
  let pathDate = Object.values(FilterType).map((filterType) => getOneFilterTemplate(filterType)).join(` `);
  return pathDate;
};

/**
 *   Фильтры Everything/Future/Past
 * @return{html} возращает разметку
 */
export default class SiteFiltrTemplate extends AbstractComponent {

  getTemplate() {
    return (
      ` <form class="trip-filters" action="#" method="get">

      ${getFiltersTemplate()}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
    );
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
      console.log(`нажал на флитр`);
    });
  }
}
