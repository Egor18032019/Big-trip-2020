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

  getPoints() {
    return getEventByFilter(this._points, this._activeFilterType);
  }

  getPointsAll() {
    return this._points;
  }

  getFilter() {
    return this._activeFilterType;
  }

  setPoints(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterType(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }
  setOffers(offers) {
    this._offers = offers;
  }
  setDestinations(destinations) {
    this._destinations = destinations;
  }
  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updatePoints(id, point) {

    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addPoint(point) {
    this._points = [].concat(point, this._points);
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
