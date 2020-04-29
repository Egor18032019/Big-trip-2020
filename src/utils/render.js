/**
 * вспомогательная функция для создания DOM-элемента
 * @param {*} template шаблон разметки
 * @return{html} шаблон превращеный в DOM элемент
 */
const createElement = (template) => {
  // создаем оболочку - вставляем шаблон - вытаскиваем из оболочкке уже DOM элемент
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
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
/**
 * функция для для замены одного DOM-элемента на другой
 * @param {*} parent папа
 * @param {*} newElement новый
 * @param {*} oldElement старый
 */
const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

export {
  createElement,
  newRender,
  RenderPosition,
  replace
};
