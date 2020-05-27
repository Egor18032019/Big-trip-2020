import {
  getEventByFilter
} from "../utils/filter.js";
import {
  FilterType
} from "../mock/const.js";

import {

} from '../mock/content-mock';

export default class PointsModel {
  constructor() {
    this._activeFilterType = FilterType.EVERYTHING;
    this._points = [];
    /**
     * обсервер
     */
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];

  }

  getTasks() {
    return getEventByFilter(this._points, this._activeFilterType);
  }

  getTasksAll() {
    return this._points;
  }

  getFilter() {
    return this._activeFilterType;
  }

  setTasks(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterType(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removeTask(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateTask(id, point) {

    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addTask(task) {
    this._points = [].concat(task, this._points);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

}
