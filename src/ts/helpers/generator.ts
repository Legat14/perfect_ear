import { Note } from 'tone/build/esm/core/type/NoteUnits';
import { PitchNotations as Notations } from '../types/note-types';

class RandomGenerator {
  static generateRandomNumber(min: number, max: number): number {
    const round = (number: number): number => Math.round(number);
    const random = (number = 1): number => Math.random() * number;

    return min + round(random(max - min));
  }

  static generateRandomNote(min: Note, max: Note): Note {
    const randomKey = RandomGenerator.generateRandomNumber(
      Notations[min as keyof typeof Notations],
      Notations[max as keyof typeof Notations],
    );

    return <Note>Notations[randomKey];
  }
}

export default RandomGenerator;
