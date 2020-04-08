//  генерация разметки


const POINT_PATH = 3;
/**
 * .trip-main
 */
const runMainElement = document.querySelector(`.trip-main`);
/**
 * `.trip-main__trip-controls в infoMainElement
 */
const tripControlsElement = runMainElement.querySelector(`.trip-controls`);
const tripControlH2 = tripControlsElement.querySelectorAll(`h2`);
// в переменую firstH2 записываем первый элемент псевдо массива tripControlH2
const [firstH2] = tripControlH2;

import {createHeaderContainerTemplate} from './components/path.js';
import {createSitePriceTemplate} from './components/path.js';
import {createSitePathTemplate} from './components/path.js';

import {createSiteMenuTemplate} from './components/menu.js';
import {createSiteFiltrTemplate} from './components/filter.js';

import {createMainContent} from './components/content.js';
import {createContentDayTemplate} from './components/content.js';
import {createDayTemplate} from './components/content.js';
import {createPointTemplate} from './components/content.js';

import {createSiteAddNewEventTemplate} from './components/form.js';

import {createSiteSortTemplate} from './components/sort.js';
import {creatSorting} from './mock/sort.js';

/**
 * функция рендеринга изображений
 * @param {*} container  - куда будет всталвяться
 * @param {*} template шаблон разметки
 * @param {*} place позицию добавляемого элемента (`beforebegin`,`beforeend`,`afterbegin`,`afterend`)
 */
const render = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
};


if (runMainElement) {
  render(runMainElement, createHeaderContainerTemplate());
}
// отрисовали контайнер и  и теперь отрисовывем цену с маршрутом
const pathElement = document.querySelector(`.trip-info__main`);
if (pathElement) {
  render(pathElement, createSitePathTemplate());
}
const priceElement = document.querySelector(`.trip-info`);
if (priceElement) {
  render(priceElement, createSitePriceTemplate(), `beforeend`);
}

if (firstH2) {
  render(firstH2, createSiteMenuTemplate(), `afterend`);
}
if (tripControlsElement) {
  render(tripControlsElement, createSiteFiltrTemplate(), `beforeend`);
}
/**
 * trip-events
 */
const sortMainElement = document.querySelector(`.trip-events`);
if (sortMainElement) {
  render(sortMainElement, createSiteSortTemplate(creatSorting), `beforeend`);
}
if (sortMainElement) {
  render(sortMainElement, createSiteAddNewEventTemplate(), `beforeend`);
}
if (sortMainElement) {
  render(sortMainElement, createMainContent(), `beforeend`);
}

const tripEventsList = document.querySelector(`.trip-days`);

for (let i = 0; i < POINT_PATH; i++) {
  if (tripEventsList) {
    render(tripEventsList, createPointTemplate(), `beforeend`);
  }
}
