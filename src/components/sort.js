// отрисовывает кнопки сортировки Event/Time/Price

import {
  creatSorting
} from '../mock/sort.js'; // может это сюда перенести ?
import AbstractComponent from "../components/abstract-component.js";

const SortType = {
  DEFAULT: `sort-event`,
  DATE: `sort-time`,
  PRICE: `sort-price`,
};


/**
 * @param {*} name имя фильтра
 * @param {*} isChecked чекнут или нет
 * @return{html} возращает разметку одного фильтра
 */
const creatSort = (name, isChecked) => {

  return (`
  <div class="trip-sort__item  trip-sort__item--${name.slice(5)}">
  <input id="${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${name}"
  ${isChecked ? `checked=""` : ``}>
  <label class="trip-sort__btn" for="${name}">${name.slice(5)}</label>
</div>
`);
};

const getCheked = (it, array) => {
  let cheked = false;
  if (array === it.name) {
    cheked = true;
  }
  return creatSort(it.name, cheked);
};
/**
 *   Сортировка
 * @param {*} typeFilter тип фильтра по умалчанию sort-event
 * @return{html} возращает разметку всех фильтров
 */
const createSiteSortTemplate = (typeFilter = SortType.DEFAULT) => {
  const creatSortMarkup = creatSorting.map((it) => getCheked(it, typeFilter)).join(``);
  // const creatSortMarkup = creatSorting.map((it) => creatSort(it.name, it.check)).join(``);

  return (
    `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>
${creatSortMarkup}
        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>
    `
  );
};

class FirstFromTemplate extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSiteSortTemplate(this._currenSortType);
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortType(sortingType) {
    this._currenSortType = sortingType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {

      if (evt.target.tagName !== `LABEL`) {
        return;
      }

      const sortType = evt.target.htmlFor;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
export {
  FirstFromTemplate,
  SortType,
};
