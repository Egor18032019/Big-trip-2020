//  отрисовк точек
import PointController from '../controllers/point.js';
import PointControllerObserver from '../observers/pointControler-observer.js';
import {
  FirstFromTemplate,
  SortType
} from '../components/sort.js';
import CreateMainContent from '../components/content.js';
import DayController from '../controllers/day.js';

import {
  render,
  RenderPosition,
} from '../utils/render.js';

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
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;
    /**
   * обсревер на точки маршурта
   */
    this.pointObserver = new PointControllerObserver();
    /**
     * обсервер на дни
     */
    this.dayObserver = new PointControllerObserver();
    this._mainContent = new CreateMainContent();
    this._sortComponent = new FirstFromTemplate();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const tasks = this._tasksModel.getTasks();
    // отрисовываем сортировку
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
    // Отрисовка основы для контента
    if (tasks.length > 0 && this._container) {
      render(this._container, this._mainContent, RenderPosition.BEFOREEND);
    }

    this._renderPoints(tasks);
  }

  _renderPoints(tasks) {
    const tripEventsList = document.querySelector(`.trip-days`);

    // --?? сделать два контролера на точки и на ивенты (плюс назвать соответствено)
    tasks.forEach((it, iterator) => {
      const dayControler = new DayController(tripEventsList, iterator);
      dayControler.render(it);
      // закидываем инстансы в обсервер
      this.dayObserver.subscribe(dayControler);
    });

    const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
    const tripDaysItemArray = Array.from(tripDaysItem);

    tasks.forEach((day, iterator) => {

      day.points.forEach((it) => {

        const pointController = new PointController(tripDaysItemArray[iterator], this._onDataChange, this.pointObserver, iterator);

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
    this._removePoints();
    // сортитруем приходящий массив
    const sortedTasks = getSortedTasks(this._tasksModel.getTasks(), sortType);
    // и отрисовывваем его
    sortedTasks.forEach((it, iterator) => {
      const dayControler = new DayController(tripEventsList, iterator);
      dayControler.render(it);
      this.dayObserver.subscribe(dayControler);
    });

    sortedTasks.forEach((day, iterator) => {
      const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
      const tripDaysItemArray = Array.from(tripDaysItem);

      day.points.forEach((it) => {

        const pointController = new PointController(tripDaysItemArray[iterator], this._onDataChange, this.pointObserver);

        pointController.render(it);
        // убираем в обсервере старые инстансы
        this.pointObserver.unsubscribe(pointController);
      });
    });
  }

  _onDataChange(pointController, oldData, newData) {
    // console.log(`добавил в избранное`);
    const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

    if (isSuccess) {
      pointController.render(newData);
    }
  }

  _removePoints() {
    this.pointObserver.observers.forEach(
        (point) => point.destroy()
    );
    this.dayObserver.observers.forEach(
        (dayControler) => dayControler.destroy()
    );
    this.pointObserver.observers = [];
    this.dayObserver.observers = [];

  }

  _updateTasks() {
    this._removePoints();
    this._renderPoints(this._tasksModel.getTasks());
  }

  _onFilterChange() {
    this._updateTasks();
  }


}
