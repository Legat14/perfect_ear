import * as Tone from 'tone';
import { Note } from 'tone/build/esm/core/type/NoteUnits';

class RandomGenerator {
  static generateRandomNumber(min: number, max: number): number {
    const round = (number: number): number => Math.round(number);
    const random = (number = 1): number => Math.random() * number;

    return min + round(random(max - min));
  }

  static generateRandomNote(min: Note, max: Note): Note {
    return (Tone.Midi(
      RandomGenerator.generateRandomNumber(
        Tone.Frequency(min).toMidi(),
        Tone.Frequency(max).toMidi(),
      ),
    ).toNote());
  }

  static randomizeArray<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  static getRandomFromArray<T>(array: T[], count: number): T[] {
    const { length } = array;
    const index = RandomGenerator.generateRandomNumber(0, length - count);
    return array.slice(index, index + count);
  }
}

export default RandomGenerator;
