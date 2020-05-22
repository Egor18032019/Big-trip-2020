import {
  getEventByFilter
} from "../utils/filter.js";
import {
  FilterType
} from "../mock/const.js";

import PointControllerObserver from '../observers/pointControler-observer.js';


export default class PointsModel {
  constructor() {
    this._activeFilterType = FilterType.EVERYTHING;
    this._filterChangeHandlers = [];
    this._points = [];
    /**
     * обсервер
     * п
     */
    this._dataChangeHandlers = new PointControllerObserver();

  }

  getTasks() {
    return getEventByFilter(this._points, this._activeFilterType);
  }

  getTasksAll() {
    return this._tasks;
  }

  setTasks(points) {
    this._points = Array.from(points);
    this._dataChangeHandlers.subscribe();
  }

  setFilterType(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateTask(id, point) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._tasks.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.subscribe(handler);
  }
  // -? Жора ю не могу понять как работает это
  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

}
