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
  FormEditComponent
} from './components/form-edit.js';

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
  PointComponent,
  EventComponent
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

  const pointComponent = new PointComponent(task);

  newRender(listElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let eventDay = 0; eventDay < allEvent.length; eventDay++) {
  if (tripEventsList) {
    renderPoint(tripEventsList, allEvent[eventDay]);
  }
}


const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
const tripDaysItemArray = Array.from(tripDaysItem);

const renderEvent = (listElement, allEventOneDay) => {


  const {
    points: eventOneDay,
  } = allEventOneDay;

  for (let eventDay = 0; eventDay < eventOneDay.length; eventDay++) {
    let eventComponent = new EventComponent(eventOneDay[eventDay]);
    const formEditComponent = new FormEditComponent(eventOneDay[eventDay]);

    const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
    /**
     * Заменяет  event на форму редактирования
     */
    const replacePointToEdit = () => {
      listElement.replaceChild(formEditComponent.getElement(), eventComponent.getElement());
    };
    /**
     * заменяет форму редактирования на  точку маршрута
     */
    const replaceEditToPoint = () => {
      listElement.replaceChild(eventComponent.getElement(), formEditComponent.getElement());
    };
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        replaceEditToPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    if (editButton) {
      editButton.addEventListener(`click`, () => {
        replacePointToEdit();
        document.addEventListener(`keydown`, onEscKeyDown);
        const editForm = formEditComponent.getElement().querySelector(`.event`);

        editForm.addEventListener(`submit`, onSetupFormSubmit);

        const onSetupFormSubmit = function (evt) {
          evt.preventDefault();
          replaceEditToPoint();
          document.removeEventListener(`keydown`, onEscKeyDown);
        };
      });
    }


    newRender(listElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
  }
};

for (let eventDay = 0; eventDay < allEvent.length; eventDay++) {
  if (tripDaysItemArray[eventDay]) {
    renderEvent(tripDaysItemArray[eventDay], allEvent[eventDay]);
  }
}
