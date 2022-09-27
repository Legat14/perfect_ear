class Iterator {
  static createArrayIterator() {
    return function* generator<T>(array: T[], index?: number): Generator<T, undefined, undefined> {
      return yield* array.slice(index);
    };
  }
}

export default Iterator;
