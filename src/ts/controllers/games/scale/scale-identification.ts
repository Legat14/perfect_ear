import * as Tone from 'tone';
import {
  Frequency,
  Subdivision,
} from 'tone/build/esm/core/type/Units';
import Sound from '../../sound';
import {
  Pause,
  PianoNotations as Notations,
} from '../../../types/note-types';
import {
  IScaleRound,
  Scales,
  IQuestion,
  SequenceDirection as Direction,
} from '../../../types/game-types';
import AbstractGameQuiz from '../../game-cycle/abstract-game-quiz';
import Random from '../../../helpers/generator';

class ScaleIdentification extends AbstractGameQuiz {
  constructor(quiz: IScaleRound, round: number, sound: Sound) {
    super(quiz, round, sound);
    this.generateQuestion(quiz);
  }

  public generateQuestion(
    quiz: IScaleRound,
  ): IQuestion<IScaleRound> {
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
      Pause | Frequency | Frequency[],
      Subdivision,
    ][] = Tone.Frequency(baseNote)
      .harmonize(Scales[answers[value]])
      .map((note) => [note.toNote(), '4n']);

    return {
      round: quiz,
      value,
      sequence,
    };
  }
}

export default ScaleIdentification;
