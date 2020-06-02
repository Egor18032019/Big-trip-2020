// отрисовка одного ивента
import EventComponent from '../components/events.js';
import FormEditComponent from '../components/form-edit.js';
import TripEventAdapter from '../models/EventAdapter.js';

import {
  render,
  RenderPosition,
  replace,
  remove,
} from '../utils/render.js';

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export default class PointController {
  constructor(container, onDataChange, eventObserver, iterator) {
    this._container = container;
    this._iterator = iterator;
    this._eventObserver = eventObserver;

    this._onDataChange = onDataChange;

    this._eventComponent = null;
    this._formEditComponent = null;
    this._creatingTask = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._replacePointToEdit = this._replacePointToEdit.bind(this);
    this._replaceEditToPoint = this._replaceEditToPoint.bind(this);
  }

  render(event, mode = Mode.DEFAULT, renderposition = RenderPosition.AFTERBEGIN) {
    this._mode = mode;
    this.renderposition = renderposition;

    this._initForm(event);

    if (!event) {
      render(this._container, this._formEditComponent, this.renderposition);
      return;
    }

    this._eventComponent = new EventComponent(event);
    // замена ивента на форму редактрирования
    this._eventComponent.setEditPointClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });


    render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _initForm(event) {

    this._formEditComponent = new FormEditComponent(event, this._mode);
    // Замена формы на ивент
    this._formEditComponent.setEditFormClickHandler(
        () => {
          this._replaceEditToPoint();
          this._formEditComponent.reset();
        }
    );
    this._formEditComponent.setDeleteClickHandler(() => {
      if (event) {
        this._onDataChange(this, event, null);
      } else {
        let firstButtonNewEvent = document.querySelector(`.trip-main__event-add-btn`);
        firstButtonNewEvent.disabled = false;
        remove(this._formEditComponent);
      }
    });

    // вешаем обработчик иммено на отправку(пока так, до настройки XHR)
    // биндим на контекст
    this._formEditComponent.setEditFormSubmitHandler(this._onSetupFormSubmit.bind(this));
    this._formEditComponent._subscribeOnEvents();
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
    if (document.contains(this._formEditComponent.getElement())) {
      replace(this._eventComponent, this._formEditComponent);
    }
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
    // если режим редактирования -именно у этой формы то закрываем
    if (this._mode === Mode.EDIT) {
      this._replaceEditToPoint();
    }
    if (this._mode === Mode.ADDING) {
      // если у именно у этой формы режим добавления = то закрываем
      this.firstButtonNewEvent = document.querySelector(`.trip-main__event-add-btn`);
      this.firstButtonNewEvent.disabled = false;
      remove(this._formEditComponent);

    }
  }

  _onSetupFormSubmit(evt) {
    evt.preventDefault();
    const oldFormData = this._formEditComponent.getItem().id ? this._formEditComponent.getItem() : null;
    const newFormSubmit = this._formEditComponent.getData();
    const data = this._prepareData(newFormSubmit);
    this._onDataChange(this._formEditComponent, oldFormData, data);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    if (!this._eventComponent) {
      remove(this._formEditComponent);
      return;
    }
    this._replaceEditToPoint();
  }
  _prepareData(formData) {
    console.log(formData);
    const tripEventAdapter = new TripEventAdapter(formData);
    const data = tripEventAdapter.toRAW(formData);

    return data;
  }
  destroy() {
    remove(this._formEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
