// делаем для MVC
// переносим отрисовку
import EventComponent from '../components/events.js';
import FormEditComponent from '../components/form-edit.js';

import {
  render,
  RenderPosition,
  replace,
} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, eventObserver) {
    this._container = container;
    this._eventObserver = eventObserver;
    this._onDataChange = onDataChange;

    this._eventComponent = null;
    this._formEditComponent = null;
    // флаг
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    // не помогло
    this._replacePointToEdit = this._replacePointToEdit.bind(this);
    this._replaceEditToPoint = this._replaceEditToPoint.bind(this);
  }

  render(event) {

    this._eventComponent = new EventComponent(event);
    this._formEditComponent = new FormEditComponent(event);

    this._formEditComponent.setEditFormClickHandler(() => {
      this._replaceEditToPoint();
      this._formEditComponent.getElement().reset();
    });
    this._formEditComponent.setDeleteClickHandler(() => {
      this._container.removeChild(this._formEditComponent.getElement());
      const node = this._eventComponent.getElement();
      node.remove();
    });
    // открытие по нажтию на галочку
    this._eventComponent.setEditPointClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });
    // добавление в избранное
    this._formEditComponent.setFavoriteFormClickHandler(() => {
      this._onDataChange();
    });


    // вешаем обработчик иммено на отправку(пока так, до настройки XHR)
    //    биндим на контекст
    this._formEditComponent.setEditFormSubmitHandler(this._onSetupFormSubmit.bind(this));

    render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
  }

  /**
   * Заменяет  event на форму редактирования
   */
  _replacePointToEdit() {
    this._eventObserver.callClose();
    replace(this._formEditComponent, this._eventComponent);
    // флаг
    this._mode = Mode.EDIT;

  }
  /**
   * заменяет форму редактирования на  точку маршрута
   */
  _replaceEditToPoint() {
    replace(this._eventComponent, this._formEditComponent);
    this._mode = Mode.DEFAULT;

  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }
  _onSetupFormSubmit(evt) {
    evt.preventDefault();
    // this._formEditComponent.getElement().reset();
    replace(this._eventComponent, this._formEditComponent);

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

}
