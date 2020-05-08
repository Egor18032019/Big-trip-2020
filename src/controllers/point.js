// делаем для MVC
// переносим отрисовку
import EventComponent from '../components/events.js';
import PointComponent from '../components/points.js';
import FormEditComponent from '../components/form-edit.js';
import {
  FirstFromTemplate,
  SortType
} from '../components/sort.js';

import {
  render,
  RenderPosition,
  replace,
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
      replace(formEditComponent, eventComponent);
    };
    /**
     * заменяет форму редактирования на  точку маршрута
     */
    const replaceEditToPoint = () => {
      replace(eventComponent, formEditComponent);
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
    formEditComponent.setDeleteClickHandler(() => {
      listElement.removeChild(formEditComponent.getElement());
      const node = eventComponent.getElement();
      node.remove();
    });

    eventComponent.setEditPointClickHandler(() => {
      replacePointToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    // вешаем обработчик иммено на отправку(пока так, до настройки XHR)
    formEditComponent.setEditFormSubmitHandler(onSetupFormSubmit);

    render(listElement, eventComponent, RenderPosition.BEFOREEND);
  }

};

export default class PointController {
  constructor(container) {}

  render(tasks) {
    const renderEvents = (array) => {
      const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
      const tripDaysItemArray = Array.from(tripDaysItem);

      array.forEach((it, iterator) => {
        getRenderEvent(tripDaysItemArray[iterator], it);
      });
    };
    renderEvents(tasks);
  }
}
