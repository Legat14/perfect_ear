/**
 * class MyUpdatingClass {
 *   constructor(_data: IData) {
 *     this._data = _data;
 *     this.onUpdate = new Signal<IData>();
 *   }
 *   get data() {
 *     return this._data;
 *   }
 *   set data(value: IData) {
 *     this._data = value;
 *     this.onUpdate.emit(this._data);
 *   }
 * }
 * class MyController {
 *   constructor(_data: IData) {
 *     this.updating = new MyUpdatingClass(_data);
 *     this.updating.onUpdate.add(somehandler);
 *   }
 * }
 */

class Emitter<ObserverType> {
  private observers: Array<(data: ObserverType) => void>;

  constructor() {
    this.observers = [];
  }

  add(observer: (data: ObserverType) => void) {
    this.observers.push(observer);
  }

  remove(observer: (data: ObserverType) => void) {
    this.observers = this.observers.filter((e) => e !== observer);
  }

  emit(data: ObserverType) {
    this.observers.forEach((observer) => observer(data));
  }
}

export default Emitter;
