//  генерация разметки

import {
  POINT_TOWN,
  allEvent
} from './mock/const.js';

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

import {
  createHeaderContainerTemplate
} from './components/path.js';
import {
  createSitePriceTemplate
} from './components/path.js';
import {
  createSitePathTemplate
} from './components/path.js';

import {
  createSiteMenuTemplate
} from './components/menu.js';
import {
  createSiteFiltrTemplate
} from './components/filter.js';

import {
  createMainContent
} from './components/content.js';
import {
  createPointContainer
} from './components/content.js';

import {
  createSiteAddNewEventTemplate
} from './components/form.js';

import {
  createSiteSortTemplate
} from './components/sort.js';
import {
  creatSorting
} from './mock/sort.js';

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
// пока времено. Обудамать или Обсудить  как сюда передавать
// и для POINT_TOWN
const vremenno = allEvent[1];

if (sortMainElement) {
  render(sortMainElement, createSiteAddNewEventTemplate(vremenno, POINT_TOWN), `beforeend`);
}

if (sortMainElement) {
  render(sortMainElement, createMainContent(), `beforeend`);
}

const tripEventsList = document.querySelector(`.trip-days`);


// // В зависимости от allEvent.length отрисовываем кол-во точек
for (let eventDay = 0; eventDay < allEvent.length; eventDay++) {
  if (tripEventsList) {
    render(tripEventsList, createPointContainer(eventDay, allEvent[eventDay]), `beforeend`);
  }
}
