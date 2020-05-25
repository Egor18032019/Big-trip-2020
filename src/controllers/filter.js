import SiteFiltrTemplate from "../components/filter.js";
import {
  FilterType
} from "../mock/const.js";
import {
  render,
  RenderPosition
} from "../utils/render.js";


export default class FilterController {
  constructor(container, pointModel) {
    this._container = container;
    this._pointModel = pointModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointModel.setDataChangeHandler(this._onDataChange);
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
    this._pointModel.setFilterType(filterType);
  }

  _onDataChange() {
    // this.render();
  }
}

