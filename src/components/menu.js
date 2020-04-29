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
         <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
         <a class="trip-tabs__btn" href="#">Stats</a>
      </nav>`
    );
  }

}
