// делаем для MVC
// переносим отрисовку
import EventComponent from '../components/events.js';
import FormEditComponent from '../components/form-edit.js';

import {
  render,
  RenderPosition,
  replace,
} from '../utils/render.js';


export default class PointController {
  constructor(container) {
    this._container = container;

    this._eventComponent = null;
    this._formEditComponent = null;


    // this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(tasks) {
    const tripDaysItemArray = Array.from(this._container);

    const getRenderEvent = (listElement, allEventOneDay) => {
      const {
        points: eventOneDay,
      } = allEventOneDay;

      for (let eventDay = 0; eventDay < eventOneDay.length; eventDay++) {
        this._eventComponent = new EventComponent(eventOneDay[eventDay]);
        this._formEditComponent = new FormEditComponent(eventOneDay[eventDay]);
        /**
         * Заменяет  event на форму редактирования
         */
        const _replacePointToEdit = () => {
          replace(this._formEditComponent, this._eventComponent);
        };
        /**
         * заменяет форму редактирования на  точку маршрута
         */
        const _replaceEditToPoint = () => {
          replace(this._eventComponent, this._formEditComponent);
        };

        const _onEscKeyDown = (evt) => {
          const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
          if (isEscKey) {
            _replaceEditToPoint();
            document.removeEventListener(`keydown`, _onEscKeyDown);
          }
        };

        const onSetupFormSubmit = function (evt) {
          evt.preventDefault();
          _replaceEditToPoint();
          document.removeEventListener(`keydown`, _onEscKeyDown);
        };

        this._formEditComponent.setEditFormClickHandler(() => {
          _replaceEditToPoint();
          this._formEditComponent.getElement().reset();
        });
        this._formEditComponent.setDeleteClickHandler(() => {
          listElement.removeChild(this._formEditComponent.getElement());
          const node = this._eventComponent.getElement();
          node.remove();
        });
        this._eventComponent.setEditPointClickHandler(() => {
          _replacePointToEdit();
          document.addEventListener(`keydown`, _onEscKeyDown);
        });

        // вешаем обработчик иммено на отправку(пока так, до настройки XHR)
        this._formEditComponent.setEditFormSubmitHandler(onSetupFormSubmit);

        render(listElement, this._eventComponent, RenderPosition.BEFOREEND);
      }
    };

    tasks.forEach((it, iterator) => {
      getRenderEvent(tripDaysItemArray[iterator], it);
    });
  }
}
