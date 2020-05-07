import AbstractComponent from "../components/abstract-component.js";

/**
 *  контайнер для  маршурта и стоимости
 * @return{html} возращает разметку
 */
export default class SiteHeaderContainerTemplate extends AbstractComponent {

  getTemplate() {
    return (
      `<section class="trip-main__trip-info  trip-info">
         <div class="trip-info__main">

         </div>

      </section>`
    );
  }
}


