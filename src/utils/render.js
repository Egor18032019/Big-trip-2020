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
  BEFOREEND: `beforeend`
};
/**
 * отрисовка
 * @param {*} container куда отрисовывать
 * @param {*} component класс который  нужно отрисовать и у которого обязан быть метод getElement
 * @param {*} place где именно отрисовываем
 */
const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};
/**
 * функция для для замены одного DOM-элемента на другой
 * @param {*} newComponent новый
 * @param {*} oldComponent старый
 */
const replace = (newComponent, oldComponent) => {
  // с помощью метода класса находим ДОМ элемент - а потом от него с помощью свойства
  // parentElement находим его родителя
  const parentElement = oldComponent.getElement().parentElement;

  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  // два !! проверяет правда ли это
  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {
  createElement,
  render,
  RenderPosition,
  replace,
  remove,
};
