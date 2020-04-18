/**
 * @param {*} name имя фильтра
 * @param {*} svg есть ли свг
 * @param {*} isChecked чекнут или нет
 * @return{html} возращает разметку одного фильтра
 */
const creatSort = (name, svg = ``, isChecked) => {
  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
  <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio"
  name="trip-sort"
  ${isChecked ? `checked` : ``}
  value="sort-${name}">
  <label class="trip-sort__btn" for="sort-${name}">
    ${name}
    ${svg}
  </label>
</div>`);
};

/**
 *   Сортировка
 * @param {*} mockSort  - данные в виде массива ключ*значение
 * @return{html} возращает разметку всех фильтров
 */
export const createSiteSortTemplate = (mockSort) => {
  const creatSortMarkup = mockSort.map((it) => creatSort(it.name, it.icon, it.check)).join(``);

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
