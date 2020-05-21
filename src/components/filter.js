// отрисовывает фильтры Everything/Future/Past

import AbstractComponent from "../components/abstract-component.js";

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  // отрезаем лишнее чтобы получить тип фильтра
  return id.substring(FILTER_ID_PREFIX.length);
};

const getOneFilterTemplate = (it) => {
  const {
    name,
    checked
  } = it;
  return (
    `
    <div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${it}"
    ${checked ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>
  `
  );
};

const getFiltersTemplate = (filters) => {
  let pathDate = filters.map((filterType) => getOneFilterTemplate(filterType)).join(` `);
  return pathDate;
};

/**
 *   Фильтры Everything/Future/Past
 * @return{html} возращает разметку
 */
export default class SiteFiltrTemplate extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return (
      ` <form class="trip-filters" action="#" method="get">

      ${getFiltersTemplate(this._filters)}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
    );
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
