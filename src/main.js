//  генерация разметки

import {
  allEvent
} from './mock/const.js';
// const allEvent = 0;

/**
 * .trip-main
 */
const runMainElement = document.querySelector(`.trip-main`);
const firstButtonNewEvent = runMainElement.querySelector(`.btn--yellow`);
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
import FormFirstEditComponent from './components/form-first.js';

import TripController from './controllers/trip.js';

import {
  render,
  RenderPosition
} from './utils/render.js';

import PointModel from "./models/pointModels.js";

const HeaderContainer = new SiteHeaderContainerTemplate();
render(runMainElement, HeaderContainer, RenderPosition.AFTERBEGIN);
const PointsModel = new PointModel();
PointsModel.setTasks(allEvent);
// отрисовали контайнер и  и теперь отрисовывем цену с маршрутом
const renderPath = (array) => {
  const tripInfoComponent = new SitePathTemplate(array);
  render(pathElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
  const dateComponent = new SiteDateTemplate(array);
  render(pathElement, dateComponent, RenderPosition.BEFOREEND);
};
const pathElement = document.querySelector(`.trip-info__main`);
if (pathElement) {
  renderPath(allEvent);
}

const renderCost = (array) => {
  const costComponent = new SiteCostTemplate(array);
  render(costElement, costComponent, RenderPosition.BEFOREEND);
};
const costElement = document.querySelector(`.trip-info`);
if (costElement) {
  renderCost(allEvent);
}
const renderMenu = () => {
  const siteComponent = new SiteMenuTemplate();
  render(tripControlsElement, siteComponent, RenderPosition.BEFOREEND);
};
if (tripControlsElement) {
  renderMenu();
}

const filterController = new FilterController(tripControlsElement, PointsModel);
filterController.render();

const sortMainElement = document.querySelector(`.trip-events`);
// если нет точек то рисуем форму приглашение
const renderFirstForm = (listElement) => {
  const tripFirstEventsForm = new FormFirstEditComponent();
  render(listElement, tripFirstEventsForm, RenderPosition.BEFOREEND);
};
if (!allEvent.length) {
  renderFirstForm(sortMainElement);
  // дисаблем кнопку для создание новых ивентов
  firstButtonNewEvent.disabled = true;
}

const renderTripEvent = new TripController(sortMainElement, PointsModel);
renderTripEvent.render(allEvent);


