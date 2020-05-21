import {isPast, isOneDay, isFuture} from "./common.js";
import {FilterType} from "../mock/const.js";

/**
 * Прошедшие ивенты
 * @param {*} tasks
 * @param {*} date
 * @return {*} отфильтрованый массив
 */
const getPastEvent = (tasks, date) => {
  return tasks.filter((task) => {
    const dueDate = task.dueDate;

    if (!dueDate) {
      return false;
    }

    return isPast(dueDate, date);
  });
};

/**
 * Прошедшие ивенты
 * @param {*} tasks массив с данными
 * @param {*} date сегодняшная дата
 * @return {*} отфильтрованый массив
 */
const getFutureEvent = (tasks, date) => {

  return tasks.filter((task) => {
    const dueDate = task.eventDate;
    if (!dueDate) {
      return false;
    }

    return isFuture(dueDate, date);
  });
};

/**
 * Получение задач за сегодняшний день
 * @param {*} tasks
 * @param {*} date
 * @return {*} отфильтрованый массив
 */
const getTasksInOneDay = (tasks, date) => {
  return tasks.filter((task) => isOneDay(task.dueDate, date));
};


const getEventByFilter = (tasks, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return tasks;
    case FilterType.FUTURE:
      return getFutureEvent(tasks, nowDate);
    case FilterType.PAST:
      return getPastEvent(tasks, nowDate);
  }

  return tasks;
};

export {
  getPastEvent,
  getFutureEvent,
  getTasksInOneDay,
  getEventByFilter,
};
