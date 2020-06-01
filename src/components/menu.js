// отрисовка меню
import AbstractComponent from "../components/abstract-component.js";

/**
 *  Table и Stats
 * @return{html} возращает разметку
 */
export default class SiteMenuTemplate extends AbstractComponent {

  getTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
       <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-tab="table">Table</a>
       <a class="trip-tabs__btn" href="#" data-tab="stats">Stats</a>
               </nav>`
    );
  }
  setActiveItem(menuItem) {
    const activeItem = this.getElement().querySelector(`.trip-tabs__btn--active`);
    const checkedItem = this.getElement().querySelector(`[data-tab="${menuItem}"]`);

    activeItem.classList.remove(`trip-tabs__btn--active`);
    checkedItem.classList.add(`trip-tabs__btn--active`);
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const menuItem = evt.target.dataset.tab;
      handler(menuItem);
    });
  }
}
