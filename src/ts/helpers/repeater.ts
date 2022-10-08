import { Callback } from '../types/common';

class Repeater {
  static repeat<T>(
    callback: Callback<T>,
    iterations: number,
    ...data: T[]
  ) {
    if (!iterations) return;
    callback(...data);
    Repeater.repeat(callback, iterations - 1, ...data);
  }
}

export default Repeater;
