//  генерация разметки

import {
  getEvents
} from './mock/content-mock';

/**
 * .trip-main
 */
const runMainElement = document.querySelector(`.trip-main`);
/**
 * `.trip-main__trip-controls в infoMainElement
 */
const tripControlsElement = runMainElement.querySelector(`.trip-controls`);


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

const pointsModel = new PointModel();
pointsModel.setPoints(getEvents());
const allEvents = pointsModel.getPointsAll();

const HeaderContainer = new SiteHeaderContainerTemplate();
render(runMainElement, HeaderContainer, RenderPosition.AFTERBEGIN);

const pathElement = document.querySelector(`.trip-info__main`);
const costElement = document.querySelector(`.trip-info`);

const tripInfoComponent = new SitePathTemplate(allEvents);
const dateComponent = new SiteDateTemplate(allEvents);
const costComponent = new SiteCostTemplate(allEvents);
const siteComponent = new SiteMenuTemplate();

render(pathElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(pathElement, dateComponent, RenderPosition.BEFOREEND);
render(costElement, costComponent, RenderPosition.BEFOREEND);
render(tripControlsElement, siteComponent, RenderPosition.BEFOREEND);

const filterController = new FilterController(tripControlsElement, pointsModel);
filterController.render();


const sortMainElement = document.querySelector(`.trip-events`);

const renderTripEvent = new TripController(sortMainElement, pointsModel);
renderTripEvent.render();

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
        case `table` :
          siteComponent.setActiveItem(menuItem);
          tripStatistics.hide();
          renderTripEvent.show();
          break;
      }
    }
);
