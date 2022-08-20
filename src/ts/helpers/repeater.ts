import { Callback } from '../types/common';

class Repeater {
  static repeate<T>(
    callback: Callback<T>,
    data: T[],
    iterations: number,
  ) {
    if (!iterations) return;
    callback(...data);
    Repeater.repeate(callback, data, iterations - 1);
  }
}

export default Repeater;
