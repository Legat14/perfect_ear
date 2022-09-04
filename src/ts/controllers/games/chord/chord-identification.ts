import * as Tone from 'tone';
import {
  Frequency,
  Subdivision,
} from 'tone/build/esm/core/type/Units';
import Sound from '../../sound';
import {
  PianoNotations as Notations,
} from '../../../types/note-types';
import {
  IChordRound,
  Chords,
  IQuestion,
  SequenceDirection as Direction,
} from '../../../types/game-types';
import AbstractGameQuiz from '../../game-cycle/abstract-game-quiz';
import Random from '../../../helpers/generator';

class ChordIdentification extends AbstractGameQuiz<IChordRound> {
  constructor(quiz: IChordRound, round: number, sound: Sound) {
    super(quiz, round, sound);
    this.generateQuestion(quiz);
  }

  public generateQuestion(
    quiz: IChordRound,
  ): IQuestion<IChordRound> {
    const { direction, answers } = quiz;

    const [min, max] = [
      direction !== Direction.Ascending
        ? Tone.Frequency(Notations.C1).transpose(12).toNote()
        : Tone.Frequency(Notations.C1).toNote(),
      direction !== Direction.Descending
        ? Tone.Frequency(Notations.C5).transpose(-12).toNote()
        : Tone.Frequency(Notations.C5).toNote(),
    ];

    const baseNote = Random.generateRandomNote(min, max);
    const value = Random.generateRandomNumber(
      0,
      answers.length - 1,
    );

    const sequence: [
      Frequency | Frequency[],
      Subdivision,
    ][] = direction !== Direction.Harmonic
      ? Tone.Frequency(baseNote)
        .harmonize(Chords[answers[value]])
        .map((note) => [note.toNote(), '4n'])
      : [[Tone.Frequency(baseNote)
        .harmonize(Chords[answers[value]])
        .map((note) => note.toNote()), '2n']];

    return {
      round: quiz,
      value,
      sequence,
      baseNote,
      labels: answers.map(
        (answer) => Tone.Frequency(baseNote).harmonize(Chords[answer]).map((note) => note.toNote()),
      ),
    };
  }
}

export default ChordIdentification;
