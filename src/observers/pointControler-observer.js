export default class PointControllerObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  callClose() {
    this.observers.forEach((it) => it.setDefaultView());
  }


}
