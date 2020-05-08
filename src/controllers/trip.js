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


const renderEvents = (array) => {
  const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
  const tripDaysItemArray = Array.from(tripDaysItem);
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
  array.forEach((it, iterator) => {
    getRenderEvent(tripDaysItemArray[iterator], it);
  });
};
/**
 * Сортировка ивентов
 * @param {*} array массив ивентов
 * @param {*} sortType тип сортировки
 * @return{html} возращает отсротированный массив
 */
const getSortedTasks = (array, sortType) => {

  const showingTasks = array.map((task) => {
    // создаем новый массив с рузультатом вызова этой функции для каждого элемента старого массива
    return Object.assign(
        {},
        task,
        {
          points: task.points.map((point) => Object.assign(
              // так как внутри массива есть еще обьекты то снова воспользовался Object.assign
              {},
              point
          )
          )
        });
  });
  let sortedTasks = [];
  switch (sortType) {
    case SortType.DATE:
      sortedTasks = showingTasks.map((it) => {
        // в it заменяем  массиве it.poins уже отсортированным массивом
        sortedTasks = Object.assign(it, it.points.sort((a, b) => {
          // считаем продолжительность в каждой точке
          const durationA = a.eventTimeEnd.getTime() - a.eventTimeStart.getTime();
          const durationB = b.eventTimeEnd.getTime() - b.eventTimeStart.getTime();
          return durationB - durationA;
        }));
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
      sortedTasks = array;
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


    renderEvents(tasks);

    this._sortComponent.setSortTypeChangeHandler(
        (sortType) => {
        // чистим
          tripEventsList.innerHTML = ``;
          // сортитруем приходящий массив
          const sortedTasks = getSortedTasks(tasks, sortType);
          // и отрисовывваем его
          sortedTasks.forEach((it, iterator) => {
            renderPoint(tripEventsList, it, iterator);
          });
          renderEvents(sortedTasks);
        }
    );
  }
}
