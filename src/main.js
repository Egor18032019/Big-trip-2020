//  генерация разметки

import {
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

import FormEditComponent from './components/form-edit.js';

import {
  createHeaderContainerTemplate,
  createSitePathTemplate,
} from './components/path.js';

import {
  getSiteMenuTemplate
} from './components/menu.js';
import {
  getSiteFiltrTemplate
} from './components/filter.js';

import CreateMainContent from './components/content.js';
import PointComponent from './components/points.js';
import EventComponent from './components/events.js';

// import FormComponent from './components/form.js';

import {
  createSiteSortTemplate
} from './components/sort.js';
import {
  newRender,
  RenderPosition
} from './utils.js';

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
  render(pathElement, createSitePathTemplate(allEvent));
}

if (firstH2) {
  render(firstH2, getSiteMenuTemplate(), `afterend`);
}
if (tripControlsElement) {
  render(tripControlsElement, getSiteFiltrTemplate(), `beforeend`);
}
/**
 * trip-events
 */
const sortMainElement = document.querySelector(`.trip-events`);
if (sortMainElement) {
  render(sortMainElement, createSiteSortTemplate(creatSorting), `beforeend`);
}

/**
 * Отрисовка основы для контента
 * @param {*} listElement куда отрисовываем
 */
const renderMainContent = (listElement) => {
  const mainContent = new CreateMainContent();
  newRender(listElement, mainContent.getElement(), RenderPosition.BEFOREEND);
};

if (sortMainElement) {
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
    const editButton = eventPoint.querySelector(`.event__rollup-btn`);

    const editForm = formEditComponent.getElement();
    const closeFormButton = editForm.querySelector(`.event__reset-btn`);
    // сделать чтобы при нажатие на эту кнопку форма закрывалась
    // const editFormButton = editForm.querySelector(`.event__rollup-btn`);

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

    if (editButton) {
      editButton.addEventListener(`click`, () => {
        replacePointToEdit();
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    }

    // вешаем обработчик иммено на editForm который равен formEditComponent.getElement()
    editForm.addEventListener(`submit`, onSetupFormSubmit);
    // -?  почему он не удаляет то форму ??
    closeFormButton.addEventListener(`click`, () => {
      listElement.removeСhild(eventPoint);
    });

    newRender(listElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
  }
};

for (let eventDay = 0; eventDay < allEvent.length; eventDay++) {
  if (tripDaysItemArray[eventDay]) {
    renderEvent(tripDaysItemArray[eventDay], allEvent[eventDay]);
  }
}
