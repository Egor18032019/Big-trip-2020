//  отрисовк точек
import PointController, {
  Mode as TaskControllerMode,
  EmptyTask
} from '../controllers/point.js';
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

const getSortedEventsByDate = (events) => {
  const eventsByDate = new Map();

  events.forEach((event) => {
    const {
      eventTimeStart
    } = event;
    const date = new Date(
        eventTimeStart.getFullYear(),
        eventTimeStart.getMonth(),
        eventTimeStart.getDate()
    );
    const ids = date.getTime();

    if (eventsByDate.has(ids)) {
      const data = eventsByDate.get(ids);
      data.points.push(event);
      eventsByDate.set(ids, data);
    } else {
      eventsByDate.set(ids, {
        eventDate: date,
        points: [event]
      });
    }
  });

  const eventWithDate = [];

  for (const [key, value] of eventsByDate) {
    eventWithDate.push(value);
  }

  return eventWithDate.sort((a, b) => a.eventDate - b.eventDate);
};

/**
 * Сортировка ивентов
 * @param {*} array массив ивентов
 * @param {*} sortType тип сортировки
 * @return{html} возращает отсротированный массив
 */
const getSortedTasks = (array, sortType) => {

  const showingTasks = array.map((task) => {
    return Object.assign({}, task);
  });
  let sortedTasks = [];
  switch (sortType) {
    case SortType.DATE:
      sortedTasks = showingTasks.sort((a, b) => {
        // считаем продолжительность в каждой точке
        const durationA = a.eventTimeEnd.getTime() - a.eventTimeStart.getTime();
        const durationB = b.eventTimeEnd.getTime() - b.eventTimeStart.getTime();
        return durationB - durationA;
      });
      break;
    case SortType.PRICE:
      sortedTasks = showingTasks.sort((a, b) => b.eventPrice - a.eventPrice);
      break;
    case SortType.DEFAULT:
      sortedTasks = getSortedEventsByDate(showingTasks);
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
    this._renderPoints(getSortedTasks(tasks, SortType.DEFAULT), SortType.DEFAULT);
  }

  _renderByDate(container, sortedEventByDate) {
    sortedEventByDate.forEach((it, iterator) => {
      const dayControler = new DayController(container, iterator);
      dayControler.render(it);
      // закидываем инстансы в обсервер
      this.dayObserver.subscribe(dayControler);
    });

    const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
    const tripDaysItemArray = Array.from(tripDaysItem);

    sortedEventByDate.forEach((day, iterator) => {

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

  _renderPoints(tasks, sortType) {

    const tripDays = document.querySelector(`.trip-days`);

    if (sortType === SortType.DEFAULT) {
      this._renderByDate(tripDays, tasks);
      return;
    }

    // Отрисовка основы для точек маршрута
    const dayControler = new DayController(tripDays);
    dayControler.render();
    this.dayObserver.subscribe(dayControler);

    const tripDaysItem = document.querySelector(`.trip-events__list`);
    tasks.forEach((task) => {
      const pointController = new PointController(tripDaysItem, this._onDataChange, this.pointObserver);

      pointController.render(task);
      this.pointObserver.subscribe(
          pointController
      );
    });
  }

  _onSortTypeChange(sortType) {
    // чистим
    this._removePoints();
    // сортитруем приходящий массив
    const sortedTasks = getSortedTasks(this._tasksModel.getTasks(), sortType);
    this._renderPoints(sortedTasks, sortType);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyTask) {
      // флаг
      this._creatingTask = null;
      if (newData === null) {
        pointController.destroy();
        this._updateTasks();
      } else {
        this._tasksModel.addTask(newData);
        this.pointController.render(newData, TaskControllerMode.DEFAULT);
      }
    } else if (newData === null) {
      this._tasksModel.removeTask(oldData.id);
      this._updateTasks();
    } else {
      const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

      if (isSuccess) {
        this.pointController.render(newData, TaskControllerMode.DEFAULT);
      }
    }
  }

  _removePoints() {
    this.pointObserver.observers.forEach(
        (point) => point.destroy()
    );
    this.pointObserver.observers = [];
    this.dayObserver.observers.forEach(
        (dayControler) => dayControler.destroy()
    );
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
