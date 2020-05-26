//  генерация разметки

import {
  allEvent
} from './mock/const.js';

import {
  getEvents
} from './mock/content-mock';

/**
 * .trip-main
 */
const runMainElement = document.querySelector(`.trip-main`);
const firstButtonNewEvent = runMainElement.querySelector(`.trip-main__event-add-btn`);
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
import FormEditComponent from './components/form-edit.js';

import TripController from './controllers/trip.js';

import {
  render,
  RenderPosition
} from './utils/render.js';
import {
  NewFormDataId
} from './mock/content-mock.js';

import PointModel from "./models/pointModels.js";

const EVENTS = getEvents();

const HeaderContainer = new SiteHeaderContainerTemplate();
render(runMainElement, HeaderContainer, RenderPosition.AFTERBEGIN);

// отрисовали контайнер и  и теперь отрисовывем цену с маршрутом
const renderPath = (array) => {
  const tripInfoComponent = new SitePathTemplate(array);
  render(pathElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
  const dateComponent = new SiteDateTemplate(array);
  render(pathElement, dateComponent, RenderPosition.BEFOREEND);
};
const pathElement = document.querySelector(`.trip-info__main`);
if (pathElement) {
  renderPath(EVENTS);
}
const renderCost = (array) => {
  const costComponent = new SiteCostTemplate(array);
  render(costElement, costComponent, RenderPosition.BEFOREEND);
};
const costElement = document.querySelector(`.trip-info`);
if (costElement) {
  renderCost(EVENTS);
}
const renderMenu = () => {
  const siteComponent = new SiteMenuTemplate();
  render(tripControlsElement, siteComponent, RenderPosition.BEFOREEND);
};
if (tripControlsElement) {
  renderMenu();
}
const PointsModel = new PointModel();
PointsModel.setTasks(EVENTS);
const filterController = new FilterController(tripControlsElement, PointsModel);
filterController.render();

const sortMainElement = document.querySelector(`.trip-events`);
// если нет точек то рисуем форму приглашение
const renderFirstForm = (listElement) => {
  const tripFirstEventsForm = new FormFirstEditComponent();
  render(listElement, tripFirstEventsForm, RenderPosition.BEFOREEND);
};
if (!EVENTS.length) {
  renderFirstForm(sortMainElement);
  // дисаблем кнопку для создание новых ивентов
  firstButtonNewEvent.disabled = true;
}

const renderTripEvent = new TripController(sortMainElement, PointsModel);
renderTripEvent.render();


// добавление нового ивента
firstButtonNewEvent.addEventListener(`click`, () => {
  firstButtonNewEvent.disabled = true;
  let newEventForm = new FormEditComponent(NewFormDataId);
  render(sortMainElement, newEventForm, RenderPosition.AFTERBEGIN);
});
