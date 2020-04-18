//  генерация разметки

import {
  POINT_TOWN,
  POINT_TYPE,
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
  createSitePriceTemplate,
  createHeaderContainerTemplate,
  createSitePathTemplate,
} from './components/path.js';

import {
  createSiteMenuTemplate
} from './components/menu.js';
import {
  createSiteFiltrTemplate
} from './components/filter.js';

import {
  createMainContent,
  // createPointContainer,
  Point
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
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
const newRender = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

if (runMainElement) {
  render(runMainElement, createHeaderContainerTemplate());
}
// отрисовали контайнер и  и теперь отрисовывем цену с маршрутом
const pathElement = document.querySelector(`.trip-info__main`);
if (pathElement) {
  render(pathElement, createSitePathTemplate(allEvent));
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
const vremenno = allEvent[0].points[0];

if (sortMainElement) {
  render(sortMainElement, createSiteAddNewEventTemplate(vremenno, POINT_TOWN, POINT_TYPE), `beforeend`);
}

if (sortMainElement) {
  render(sortMainElement, createMainContent(), `beforeend`);
}

const tripEventsList = document.querySelector(`.trip-days`);


const renderPoint = (listElement, task) => {

  // обработчики
  // const replaceTaskToEdit = () => {
  //   taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  // };

  // const replaceEditToTask = () => {
  //   taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  // };

  // const onEscKeyDown = (evt) => {
  //   const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

  //   if (isEscKey) {
  //     replaceEditToTask();
  //     document.removeEventListener(`keydown`, onEscKeyDown);
  //   }
  // };

  const taskComponent = new Point(task);


  // const taskEditComponent = new TaskEditComponent(task);
  // // слушатели обработчиков
  // const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  // editButton.addEventListener(`click`, () => {
  //   replaceTaskToEdit();
  //   document.addEventListener(`keydown`, onEscKeyDown);
  // });
  // const editForm = taskEditComponent.getElement().querySelector(`form`);
  // editForm.addEventListener(`submit`, () => {
  //   replaceEditToTask();
  //   document.removeEventListener(`keydown`, onEscKeyDown);
  // });
  // console.dir(taskComponent.getElement());
  newRender(listElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

// // В зависимости от allEvent.length отрисовываем кол-во точек путешествий
for (let eventDay = 0; eventDay < allEvent.length; eventDay++) {
  if (tripEventsList) {
    // render(tripEventsList, createPointContainer(eventDay, allEvent[eventDay]), `beforeend`);
    renderPoint(tripEventsList, allEvent[eventDay]);
  }
}
