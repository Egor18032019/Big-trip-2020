//  отрисовки основы для контента
import EventComponent from '../components/events.js';
import FormEditComponent from '../components/form-edit.js';

import {
  newRender,
  RenderPosition
} from '../utils/render.js';
const getRenderEvent = (listElement, allEventOneDay) => {
  const {
    points: eventOneDay,
  } = allEventOneDay;

  for (let eventDay = 0; eventDay < eventOneDay.length; eventDay++) {
    const eventComponent = new EventComponent(eventOneDay[eventDay]);
    const formEditComponent = new FormEditComponent(eventOneDay[eventDay]);

    /**
     * Заменяет  event на форму редактирования
     */
    const replacePointToEdit = () => {
      listElement.replaceChild(formEditComponent.getElement(), eventComponent.getElement());
    };
    /**
     * заменяет форму редактирования на  точку маршрута
     */
    const replaceEditToPoint = () => {
      listElement.replaceChild(eventComponent.getElement(), formEditComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        replaceEditToPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onSetupFormSubmit = function (evt) {
      evt.preventDefault();
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    formEditComponent.setEditFormClickHandler(() => {
      replaceEditToPoint();
      formEditComponent.getElement().reset();
    });

    eventComponent.setEditPointClickHandler(() => {
      replacePointToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    // вешаем обработчик иммено на отправку(пока так, до настройки XHR)
    formEditComponent.setEditFormSubmitHandler(onSetupFormSubmit);

    newRender(listElement, eventComponent, RenderPosition.BEFOREEND);
  }
};


export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(tasks) {

    for (let eventDay = 0; eventDay < tasks.length; eventDay++) {
      if (this._container[eventDay]) {
        getRenderEvent(this._container[eventDay], tasks[eventDay]);
      }
    }
  }
}
