import AbstractComponent from "./abstract-component.js";

export default class SmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  render() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }

  show() {
    if (this._element) {
      this._element.classList.remove(`visually-hidden`);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(`visually-hidden`);
    }
  }

}
