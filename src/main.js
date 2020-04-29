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

import FormEditComponent from './components/form-edit.js';

import SitePathTemplate from './components/point.js';
import SiteDateTemplate from './components/date.js';

import SiteHeaderContainerTemplate from './components/path.js';
import SiteMenuTemplate from './components/menu.js';
import SiteFiltrTemplate from './components/filter.js';
import SiteCostTemplate from './components/price.js';
import FormFirstEditComponent from './components/form-first.js';

import CreateMainContent from './components/content.js';
import PointComponent from './components/points.js';
import EventComponent from './components/events.js';

import SiteSortTemplate from './components/sort.js';
import {
  newRender,
  RenderPosition
} from './utils/render.js';

if (runMainElement) {
  const HeaderContainer = new SiteHeaderContainerTemplate();
  newRender(runMainElement, HeaderContainer.getElement(), RenderPosition.AFTERBEGIN);
}

// отрисовали контайнер и  и теперь отрисовывем цену с маршрутом
const renderPath = (array) => {
  const tripInfoComponent = new SitePathTemplate(array);
  newRender(pathElement, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  const dateComponent = new SiteDateTemplate(array);
  newRender(pathElement, dateComponent.getElement(), RenderPosition.BEFOREEND);
};
const pathElement = document.querySelector(`.trip-info__main`);
if (pathElement) {
  renderPath(allEvent);
}

const renderCost = (array) => {
  const costComponent = new SiteCostTemplate(array);
  newRender(costElement, costComponent.getElement(), RenderPosition.BEFOREEND);
};
const costElement = document.querySelector(`.trip-info`);
if (costElement) {
  renderCost(allEvent);
}
const renderMenu = () => {
  const siteComponent = new SiteMenuTemplate();
  newRender(tripControlsElement, siteComponent.getElement(), RenderPosition.BEFOREEND);
};
if (tripControlsElement) {
  renderMenu();
}

const renderFilter = () => {
  const siteFilter = new SiteFiltrTemplate();
  newRender(tripControlsElement, siteFilter.getElement(), RenderPosition.BEFOREEND);
};
if (tripControlsElement) {
  renderFilter();
}

const renderSorting = () => {
  const tripSort = new SiteSortTemplate();
  newRender(sortMainElement, tripSort.getElement(), RenderPosition.BEFOREEND);
};
const sortMainElement = document.querySelector(`.trip-events`);
if (allEvent.length > 0 && sortMainElement) {
  renderSorting();
}
// если нет точек то рисуем форму приглашение
const renderFirstForm = (listElement) => {
  const tripFirstEventsForm = new FormFirstEditComponent();
  newRender(listElement, tripFirstEventsForm.getElement(), RenderPosition.BEFOREEND);
};
if (!allEvent.length) {
  renderFirstForm(sortMainElement);
  // дисаблем кнопку для создание новых ивентов
  firstButtonNewEvent.disabled = true;
}

/**
 * Отрисовка основы для контента
 * @param {*} listElement куда отрисовываем
 */
const renderMainContent = (listElement) => {
  const mainContent = new CreateMainContent();
  newRender(listElement, mainContent.getElement(), RenderPosition.BEFOREEND);
};
if (allEvent.length > 0 && sortMainElement) {
  renderMainContent(sortMainElement);
}

const tripEventsList = document.querySelector(`.trip-days`);

const renderPoint = (listElement, task, iterator) => {

  const pointComponent = new PointComponent(task, iterator);

  newRender(listElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};
for (let eventDay = 0; eventDay < allEvent.length; eventDay++) {
  if (tripEventsList) {
    renderPoint(tripEventsList, allEvent[eventDay], eventDay);
  }
}

const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
const tripDaysItemArray = Array.from(tripDaysItem);

const renderEvent = (listElement, allEventOneDay) => {
  const {
    points: eventOneDay,
  } = allEventOneDay;

  for (let eventDay = 0; eventDay < eventOneDay.length; eventDay++) {
    const eventComponent = new EventComponent(eventOneDay[eventDay]);
    const formEditComponent = new FormEditComponent(eventOneDay[eventDay]);

    const eventPoint = eventComponent.getElement();
    const openPointButton = eventPoint.querySelector(`.event__rollup-btn`);

    const editForm = formEditComponent.getElement();
    const closeFormButton = editForm.querySelector(`.event__rollup-btn`);
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

    const onSetupFormSubmit = function (evt) {
      evt.preventDefault();
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    closeFormButton.addEventListener(`click`, () => {
      replaceEditToPoint();
      editForm.reset();
    });

    openPointButton.addEventListener(`click`, () => {
      replacePointToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    // вешаем обработчик иммено на editForm который равен formEditComponent.getElement()
    editForm.addEventListener(`submit`, onSetupFormSubmit);

    newRender(listElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
  }
};

for (let eventDay = 0; eventDay < allEvent.length; eventDay++) {
  if (tripDaysItemArray[eventDay]) {
    renderEvent(tripDaysItemArray[eventDay], allEvent[eventDay]);
  }
}
