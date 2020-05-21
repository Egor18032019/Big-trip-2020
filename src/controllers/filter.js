import SiteFiltrTemplate from "../components/filter.js";
import {
  FilterType
} from "../mock/const.js";
import {
  render,
  replace,
  RenderPosition
} from "../utils/render.js";
import {
  getPastEvent,
  getFutureEvent,
  getTasksInOneDay,
  getEventByFilter,
} from "../utils/filter.js";

export default class FilterController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._activeFilterType = FilterType.PAST;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._tasksModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        checked: filterType === this._activeFilterType,
      };
    });

    this._filterComponent = new SiteFiltrTemplate(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);

  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;

  }

  _onDataChange() {
    this.render();
  }
}

