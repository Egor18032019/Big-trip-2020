import {
  getEventByFilter
} from "../utils/filter.js";
import {
  FilterType
} from "../mock/const.js";

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
    return this._tasks;
  }

  setTasks(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
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

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  // -?не могу понять как работает (())
  _callHandlers(handlers) {
    // console.log(handlers);
    handlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

}
