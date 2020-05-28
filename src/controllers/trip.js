//  отрисовк точек
import PointController from '../controllers/point.js';
import PointControllerObserver from '../observers/pointControler-observer.js';
import {
  FirstFromTemplate,
  SortType
} from '../components/sort.js';
import FormFirstEditComponent from '../components/form-first';
import CreateMainContent from '../components/content.js';
import DayController from '../controllers/day.js';

import {
  render,
  RenderPosition,
} from '../utils/render.js';

const getSortedEventsByDate = (events) => {
  const eventsByDate = new Map();

  events.forEach((event) => {
    const {
      eventTimeStart
    } = event;
    console.log(event);

    const date = new Date(
        eventTimeStart.getFullYear(),
        eventTimeStart.getMonth(),
        eventTimeStart.getDate()
    );
    const ids = date.getTime();

    if (eventsByDate.has(ids)) {
      const data = eventsByDate.get(ids);
      data.points.push(event);
      eventsByDate.set(ids, data);
    } else {
      eventsByDate.set(ids, {
        eventDate: date,
        points: [event]
      });
    }
  });

  const eventWithDate = [];

  for (const [, value] of eventsByDate) {
    eventWithDate.push(value);
  }

  return eventWithDate.sort((a, b) => a.eventDate - b.eventDate);
};


/**
 * Сортировка ивентов
 * @param {*} array массив ивентов
 * @param {*} sortType тип сортировки
 * @return{html} возращает отсротированный массив
 */
const getSortedEvents = (array, sortType) => {

  const showingTasks = array.map((task) => {
    return Object.assign({}, task);
  });
  let sortedTasks = [];
  switch (sortType) {
    case SortType.DATE:
      sortedTasks = showingTasks.sort((a, b) => {
        // считаем продолжительность в каждой точке
        const durationA = a.eventTimeEnd.getTime() - a.eventTimeStart.getTime();
        const durationB = b.eventTimeEnd.getTime() - b.eventTimeStart.getTime();
        return durationB - durationA;
      });
      break;
    case SortType.PRICE:
      sortedTasks = showingTasks.sort((a, b) => b.eventPrice - a.eventPrice);
      break;
    case SortType.DEFAULT:
      sortedTasks = getSortedEventsByDate(showingTasks);
      break;
  }
  return sortedTasks.slice();
};

export default class TripController {
  constructor(container, tasksModel) {
    this._container = container;
    this._PointModel = tasksModel;
    /**
     * обсревер на точки маршурта
     */
    this.pointObserver = new PointControllerObserver();
    /**
     * обсервер на дни
     */
    this.dayObserver = new PointControllerObserver();
    this._tripFirstEventsForm = new FormFirstEditComponent();
    this._mainContent = new CreateMainContent();
    this._sortComponent = new FirstFromTemplate();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._PointModel.setFilterChangeHandler(this._onFilterChange);

    this._PointModel.setDataChangeHandler(this._updatePoints.bind(this));

    this.firstButtonNewEvent = document.querySelector(`.trip-main__event-add-btn`);

    // добавление нового ивента
    this.firstButtonNewEvent.addEventListener(`click`, () => {
      this._PointModel.setFilterType(`everything`);
      // надо поставить setSortTypeChangeHandler чтобы поменял тип фильтра
      let containerForFirst = document.querySelector(`.trip-events__trip-sort`);
      this.firstButtonNewEvent.disabled = true;
      const firstPointController = new PointController(containerForFirst, this._onDataChange, this.pointObserver);
      this.pointObserver.callClose();
      this.pointObserver.subscribe(
          firstPointController
      );

      firstPointController.render(null, `adding`, RenderPosition.AFTERNODE);
    });
  }

  render() {
    const tasks = this._PointModel.getPoints();
    const filter = this._PointModel.getFilter();
    if (tasks.length === 0 && filter === `everything`) {
      const pointController = new PointController(this._container, this._onDataChange, this.pointObserver);
      pointController.render(null, `adding`);

      this.firstButtonNewEvent.disabled = true;
      return;
    }


    this.firstButtonNewEvent.disabled = false;
    // отрисовываем сортировку
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
    // Отрисовка основы для контента
    if (tasks.length > 0 && this._container) {
      render(this._container, this._mainContent, RenderPosition.BEFOREEND);
    }
    this._renderPoints(getSortedEvents(tasks, SortType.DEFAULT), SortType.DEFAULT);
  }

  _renderByDate(container, sortedEventByDate) {
    sortedEventByDate.forEach((it, iterator) => {
      const dayControler = new DayController(container, iterator);
      dayControler.render(it);
      // закидываем инстансы в обсервер
      this.dayObserver.subscribe(dayControler);
    });

    const tripDaysItem = document.querySelectorAll(`.trip-events__list`);
    const tripDaysItemArray = Array.from(tripDaysItem);

    sortedEventByDate.forEach((day, iterator) => {
      day.points.forEach((it) => {

        const pointController = new PointController(tripDaysItemArray[iterator], this._onDataChange, this.pointObserver, iterator);

        pointController.render(it);
        // инстансы евентов закидвываем в обсервер
        this.pointObserver.subscribe(
            pointController
        );
      });
    });
  }

  _renderPoints(tasks, sortType = SortType.DEFAULT) {

    const tripDays = document.querySelector(`.trip-days`);

    if (sortType === SortType.DEFAULT) {
      this._renderByDate(tripDays, tasks);
      return;
    }
    // Отрисовка основы для точек маршрута
    const dayControler = new DayController(tripDays);
    dayControler.render();
    this.dayObserver.subscribe(dayControler);

    const tripDaysItem = document.querySelector(`.trip-events__list`);
    tasks.forEach((task) => {
      const pointController = new PointController(tripDaysItem, this._onDataChange, this.pointObserver);

      pointController.render(task);
      this.pointObserver.subscribe(
          pointController
      );
    });
  }

  _onSortTypeChange(sortType) {
    // чистим
    this._removePoints();
    // сортитруем приходящий массив
    const sortedTasks = getSortedEvents(this._PointModel.getPoints(), sortType);
    this._renderPoints(sortedTasks, sortType);
  }

  _onDataChange(pointController, oldForm, newForm) {
    if (oldForm === null) {
      this._PointModel.addPoint(newForm);
      console.log(`1`);
      return;
    }

    if (newForm === null) {
      this._PointModel.removePoint(oldForm.id);
      console.log(`2`);

      return;
    }
    console.log(`3`);

    this._PointModel.updatePoints(oldForm.id, newForm);
  }

  _removePoints() {
    this.pointObserver.observers.forEach(
        (point) => point.destroy()
    );
    this.pointObserver.observers = [];
    this.dayObserver.observers.forEach(
        (dayControler) => dayControler.destroy()
    );
    this.dayObserver.observers = [];

  }

  _updatePoints() {
    //  брекпоинт ставить debugger;
    this._removePoints();
    this.render();
  }

  _onFilterChange() {
    this._sortComponent.setSortType(SortType.DEFAULT);

    this._updatePoints();
  }
}
