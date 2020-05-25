// отрисовка одного ивента
import EventComponent from '../components/events.js';
import FormEditComponent from '../components/form-edit.js';

import {
  render,
  RenderPosition,
  replace,
  remove,
} from '../utils/render.js';
import PointsModel from '../models/pointModels.js';

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};
export const EmptyTask = {};

export default class PointController {
  constructor(container, onDataChange, eventObserver, iterator) {
    this._container = container;
    this._iterator = iterator;
    this._eventObserver = eventObserver;

    this._onDataChange = onDataChange;

    this._eventComponent = null;
    this._formEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._replacePointToEdit = this._replacePointToEdit.bind(this);
    this._replaceEditToPoint = this._replaceEditToPoint.bind(this);
  }

  render(event, mode = Mode.DEFAULT) {
    this._mode = mode
    this._eventComponent = new EventComponent(event);
    this._formEditComponent = new FormEditComponent(event, this._mode);
    // Замена форма на ивент
    this._formEditComponent.setEditFormClickHandler(
      () => {
        this._replaceEditToPoint();
        this._formEditComponent.getElement().reset();
      }
    );
    this._formEditComponent.setDeleteClickHandler(() => {
        this._onDataChange(this, event, null);
    });
  // замена ивента на форму редактрирования
  this._eventComponent.setEditPointClickHandler(() => {
    this._replacePointToEdit();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  });
  // добавление в избранное
  this._formEditComponent.setFavoriteFormClickHandler(
    (evt) => {
      let newEvent = {
        ...event,
        favorite: evt.target.checked
        // !event.favorite
      };
      this._onDataChange(this._formEditComponent, event, newEvent);
    });


  // вешаем обработчик иммено на отправку(пока так, до настройки XHR)
  //    биндим на контекст
  this._formEditComponent.setEditFormSubmitHandler(this._onSetupFormSubmit.bind(this));
  this._formEditComponent._subscribeOnEvents();

  render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
}

/**
 * Заменяет  event на форму редактирования
 */
_replacePointToEdit() {
  // обсервер кричит всем закройся(перебирает масиив и  вызывает у каждого элемента setDefaultView)
  this._eventObserver.callClose();
  // заменяем элемент
  replace(this._formEditComponent, this._eventComponent);
  // и именно у этого элемента меняем флаг
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

// прописываем закрытие формы если открыта другая
setDefaultView() {
  if (this._mode !== Mode.DEFAULT) {
    this._replaceEditToPoint();
  }
}

_onSetupFormSubmit(evt) {
  evt.preventDefault();
  const newFormSubmit = this._formEditComponent.getData();
  this._replaceEditToPoint()
  this._onDataChange(this._formEditComponent, newFormSubmit, newFormSubmit);
  // console.log(newFormSubmit)
  document.removeEventListener(`keydown`, this._onEscKeyDown);
}

destroy() {
  remove(this._formEditComponent);
  remove(this._eventComponent);
  document.removeEventListener(`keydown`, this._onEscKeyDown);
}

}
