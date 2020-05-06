//  отрисовк точек
import EventComponent from '../components/events.js';
import FormEditComponent from '../components/form-edit.js';
import {
  FirstFromTemplate,
  SortType
} from '../components/sort.js';
import CreateMainContent from '../components/content.js';
import PointComponent from '../components/points.js';

import {
  render,
  RenderPosition,
  replace,
} from '../utils/render.js';
import {
  deepAssign
} from '../utils/common.js';

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

/**
 * Сортировка ивентов
 * @param {*} tasks массив ивентов
 * @param {*} sortType тип сортировки
 * @return{html} возращает отсротированный массив
 */
const getSortedTasks = (tasks, sortType) => {
  // console.log(tasks);
  const showingTasks = deepAssign([], tasks);
  let sortedTasks = [];
  switch (sortType) {
    case SortType.DATE:
      sortedTasks = showingTasks.map((it) => {
        // в it заменяем  массиве it.poins уже отсортированным массивом
        // --,,?? только время  не сортируюется
        sortedTasks = Object.assign(it, it.points.sort((a, b) => a.eventTimeStart.getTime() - b.eventTimeStart.getTime()));
        return sortedTasks;
      });
      break;
    case SortType.PRICE:
      sortedTasks = showingTasks.map((it) => {
        sortedTasks = Object.assign(it, it.points.sort((a, b) => b.eventPrice - a.eventPrice));
        return sortedTasks;
      });
      break;
    case SortType.DEFAULT:
      sortedTasks = tasks;
      break;
  }
  return sortedTasks.slice();
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new FirstFromTemplate();
    this._mainContent = new CreateMainContent();
  }

  render(tasks) {
    // отрисовываем сортировку
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
    // Отрисовка основы для контента
    if (tasks.length > 0 && this._container) {
      render(this._container, this._mainContent, RenderPosition.BEFOREEND);
    }

    const tripEventsList = document.querySelector(`.trip-days`);

    const renderPoint = (listElement, task, iterator) => {
      const pointComponent = new PointComponent(task, iterator);
      render(listElement, pointComponent, RenderPosition.BEFOREEND);
    };

    tasks.forEach((it, iterator) => {
      renderPoint(tripEventsList, it, iterator);
    });


    const renderEvents = (array) => {
      const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
      const tripDaysItemArray = Array.from(tripDaysItem);

      array.forEach((it, iterator) => {
        getRenderEvent(tripDaysItemArray[iterator], it);
      });
    };
    renderEvents(tasks);

    this._sortComponent.setSortTypeChangeHandler(
        (sortType) => {
        // чистим
          tripEventsList.innerHTML = ``;
          // сортитруем приходящий массив
          const sortedTasks = getSortedTasks(tasks, sortType);
          // console.log(`сорт?`);
          // и отрисовывваем его
          sortedTasks.forEach((it, iterator) => {
            renderPoint(tripEventsList, it, iterator);
          });
          renderEvents(sortedTasks);
        }
    );
  }
}
