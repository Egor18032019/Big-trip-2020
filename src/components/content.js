import AbstractComponent from "../components/abstract-component.js";

/**
 * Главный контейнер для контента
 * @return{html} возращает разметку
 */
export default class CreateMainContent extends AbstractComponent {

  getTemplate() {
    return (
      `
        <ul class="trip-days">
        </ul>
      `
    );
  }

}
