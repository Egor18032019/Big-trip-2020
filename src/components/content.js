import {
  createElement
} from '../utils.js';

/**
 * Главный контейнер для контента
 * @return{html} возращает разметку
 */
export default class CreateMainContent {
  constructor(point) {
    this._point = point;

    this._element = null;
  }

  getTemplate() {
    return (
      `
        <ul class="trip-days">
        </ul>
      `
    );
  }

  getElement() {
    if (!this._element) {
      // возвращает только первый элемент
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
