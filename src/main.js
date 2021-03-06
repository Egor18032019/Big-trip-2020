//  генерация разметки

/**
 * .trip-main
 */
const runMainElement = document.querySelector(`.trip-main`);
/**
 * `.trip-main__trip-controls в infoMainElement
 */
const tripControlsElement = runMainElement.querySelector(`.trip-controls`);

import API from './api.js';
// import LoadingComponent from './components/loading.js';
import SitePathTemplate from './components/site-path.js';
import SiteDateTemplate from './components/date.js';

import SiteHeaderContainerTemplate from './components/path.js';
import SiteMenuTemplate from './components/menu.js';
import FilterController from "./controllers/filter.js";

import SiteCostTemplate from './components/price.js';

import TripController from './controllers/trip.js';
import TripStatistics from './components/statistick.js';

import {
  render,
  RenderPosition
} from './utils/render.js';

import PointModel from "./models/pointModels.js";

const AUTHORIZATION = `Basic kakEtoRabotaet`;
const api = new API(AUTHORIZATION);


const HeaderContainer = new SiteHeaderContainerTemplate();
render(runMainElement, HeaderContainer, RenderPosition.AFTERBEGIN);

const pathElement = document.querySelector(`.trip-info__main`);
const costElement = document.querySelector(`.trip-info`);

const siteComponent = new SiteMenuTemplate();

render(tripControlsElement, siteComponent, RenderPosition.BEFOREEND);

const pointsModel = new PointModel();
const filterController = new FilterController(tripControlsElement, pointsModel);
filterController.render();

let renderTripEvent;
const sortMainElement = document.querySelector(`.trip-events`);
api.getData()
  .then((data) => {
    pointsModel.setPoints(data.tripEvents);
    pointsModel.setOffers(data.offers);
    pointsModel.setDestinations(data.destinations);
  })
  .then(() => {
    const tripInfoComponent = new SitePathTemplate(pointsModel.getPointsAll());
    const dateComponent = new SiteDateTemplate(pointsModel.getPointsAll());
    const costComponent = new SiteCostTemplate(pointsModel.getPointsAll());
    renderTripEvent = new TripController(sortMainElement, pointsModel, api);
    render(pathElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(pathElement, dateComponent, RenderPosition.BEFOREEND);
    render(costElement, costComponent, RenderPosition.BEFOREEND);
    renderTripEvent.render();
    // remove(loadingComponent);
  });


// отрисовка стастистки
const pageBodyContainer = document.querySelector(`main .page-body__container`);
const tripStatistics = new TripStatistics(pointsModel);
render(pageBodyContainer, tripStatistics, RenderPosition.AFTERBEGIN);
tripStatistics.hide();

// получаем куда тыкнули и взависимости от этого отрисовываем
siteComponent.setOnChange(
    (menuItem) => {

      switch (menuItem) {
        case `stats`:
          siteComponent.setActiveItem(menuItem);
          renderTripEvent.hide();
          tripStatistics.show();
          break;
        case `table`:
          siteComponent.setActiveItem(menuItem);
          tripStatistics.hide();
          renderTripEvent.show();
          break;
      }
    }
);
