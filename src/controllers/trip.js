//  отрисовк точек
import PointController from '../controllers/point.js';
import PointControllerObserver from '../observers/pointControler-observer.js';
import {
  FirstFromTemplate,
  SortType
} from '../components/sort.js';
import CreateMainContent from '../components/content.js';
import PointComponent from '../components/points.js';

import {
  render,
  RenderPosition,
} from '../utils/render.js';

const renderPoint = (listElement, task, iterator) => {
  const pointComponent = new PointComponent(task, iterator);
  render(listElement, pointComponent, RenderPosition.BEFOREEND);
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
    return Object.assign({},
        task, {
          points: task.points.map((point) => Object.assign(
          // так как внутри массива есть еще обьекты то снова воспользовался Object.assign
              {},
              point
          ))
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
    this._tasks = [];
    // обсервер
    this.pointObserver = new PointControllerObserver();
    this._mainContent = new CreateMainContent();
    this._sortComponent = new FirstFromTemplate();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
  }

  render(tasks) {
    this._tasks = tasks;
    // отрисовываем сортировку
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
    // Отрисовка основы для контента
    if (this._tasks.length > 0 && this._container) {
      render(this._container, this._mainContent, RenderPosition.BEFOREEND);
    }

    const tripEventsList = document.querySelector(`.trip-days`);

    // --?? сделать два контролера на точки и на ивенты (плюс назвать соответствено)
    this._tasks.forEach((it, iterator) => {
      renderPoint(tripEventsList, it, iterator);
    });

    const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
    const tripDaysItemArray = Array.from(tripDaysItem);


    this._tasks.forEach((day, iterator) => {

      day.points.forEach((it) => {

        const pointController = new PointController(tripDaysItemArray[iterator], this._onDataChange, this.pointObserver);

        pointController.render(it);
        // инстансы евентов закидвываем в обсервер
        this.pointObserver.subscribe(
            pointController
        );
      });
    });

  }

  _onSortTypeChange(sortType) {
    const tripEventsList = document.querySelector(`.trip-days`);

    // чистим
    tripEventsList.innerHTML = ``;
    // сортитруем приходящий массив
    const sortedTasks = getSortedTasks(this._tasks, sortType);
    // и отрисовывваем его
    sortedTasks.forEach((it, iterator) => {
      renderPoint(tripEventsList, it, iterator);
    });
    sortedTasks.forEach((day, iterator) => {
      const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
      const tripDaysItemArray = Array.from(tripDaysItem);
      day.points.forEach((it) => {

        const pointController = new PointController(tripDaysItemArray[iterator], this._onDataChange);

        pointController.render(it);
        // инстансы евентов закидвываем в обсервер
        this.pointObserver.subscribe(
            pointController
        );
      });
    });

  }

  _onDataChange() {
    console.log(`добавил в избранное`);
  }
}
