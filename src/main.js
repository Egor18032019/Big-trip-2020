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


import SitePathTemplate from './components/point.js';
import SiteDateTemplate from './components/date.js';

import SiteHeaderContainerTemplate from './components/path.js';
import SiteMenuTemplate from './components/menu.js';
import SiteFiltrTemplate from './components/filter.js';
import SiteCostTemplate from './components/price.js';
import FormFirstEditComponent from './components/form-first.js';

import CreateMainContent from './components/content.js';
import PointComponent from './components/points.js';

import TripController from './controllers/board.js';

import SiteSortTemplate from './components/sort.js';
import {
  newRender,
  RenderPosition
} from './utils/render.js';

if (runMainElement) {
  const HeaderContainer = new SiteHeaderContainerTemplate();
  newRender(runMainElement, HeaderContainer, RenderPosition.AFTERBEGIN);
}

// отрисовали контайнер и  и теперь отрисовывем цену с маршрутом
const renderPath = (array) => {
  const tripInfoComponent = new SitePathTemplate(array);
  newRender(pathElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
  const dateComponent = new SiteDateTemplate(array);
  newRender(pathElement, dateComponent, RenderPosition.BEFOREEND);
};
const pathElement = document.querySelector(`.trip-info__main`);
if (pathElement) {
  renderPath(allEvent);
}

const renderCost = (array) => {
  const costComponent = new SiteCostTemplate(array);
  newRender(costElement, costComponent, RenderPosition.BEFOREEND);
};
const costElement = document.querySelector(`.trip-info`);
if (costElement) {
  renderCost(allEvent);
}
const renderMenu = () => {
  const siteComponent = new SiteMenuTemplate();
  newRender(tripControlsElement, siteComponent, RenderPosition.BEFOREEND);
};
if (tripControlsElement) {
  renderMenu();
}

const renderFilter = () => {
  const siteFilter = new SiteFiltrTemplate();
  newRender(tripControlsElement, siteFilter, RenderPosition.BEFOREEND);
};
if (tripControlsElement) {
  renderFilter();
}

const renderSorting = () => {
  const tripSort = new SiteSortTemplate();
  newRender(sortMainElement, tripSort, RenderPosition.BEFOREEND);
};
const sortMainElement = document.querySelector(`.trip-events`);
if (allEvent.length > 0 && sortMainElement) {
  renderSorting();
}
// если нет точек то рисуем форму приглашение
const renderFirstForm = (listElement) => {
  const tripFirstEventsForm = new FormFirstEditComponent();
  newRender(listElement, tripFirstEventsForm, RenderPosition.BEFOREEND);
};
if (!allEvent.length) {
  renderFirstForm(sortMainElement);
  // дисаблем кнопку для создание новых ивентов
  firstButtonNewEvent.disabled = true;
}
// /////////////////
/**
 * Отрисовка основы для контента
 * @param {*} listElement куда отрисовываем
 */
const renderMainContent = (listElement) => {
  const mainContent = new CreateMainContent();
  newRender(listElement, mainContent, RenderPosition.BEFOREEND);
};
if (allEvent.length > 0 && sortMainElement) {
  renderMainContent(sortMainElement);
}

const tripEventsList = document.querySelector(`.trip-days`);

const renderPoint = (listElement, task, iterator) => {

  const pointComponent = new PointComponent(task, iterator);

  newRender(listElement, pointComponent, RenderPosition.BEFOREEND);
};
for (let eventDay = 0; eventDay < allEvent.length; eventDay++) {
  if (tripEventsList) {
    renderPoint(tripEventsList, allEvent[eventDay], eventDay);
  }
}
const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
const tripDaysItemArray = Array.from(tripDaysItem);
const renderEvent = new TripController(tripDaysItemArray);
renderEvent.render(allEvent);

