import * as Tone from 'tone';
import { Frequency, Subdivision } from 'tone/build/esm/core/type/Units';
import Sound from '../../sound';
import { Pause, PianoNotations as Notations } from '../../../types/note-types';
import {
  IGameCategory, IIntervalRound, Intervals, IQuestion, IQuizGame, SequenceDirection,
} from '../../../types/game-types';
import AbstractGameQuiz from '../../game-cycle/abstract-game-quiz';
import RandomGenerator from '../../../helpers/generator';

/**
 * @example
 */

class IntervalComparison extends AbstractGameQuiz<IIntervalRound> implements IQuizGame {
  public category: IGameCategory;

  public gameId: string;

  public gameName: string;

  constructor(quiz: IIntervalRound, round: number, sound: Sound) {
    super(quiz, round, sound);

    this.category = quiz.game.category;
    this.gameId = quiz.game.gameId;
    this.gameName = quiz.game.gameName;

    this.generateQuestion(quiz);
  }

  public generateQuestion(quiz: IIntervalRound): IQuestion<IIntervalRound> {
    const { intervals, direction } = quiz;

    const [min, max] = [
      direction === SequenceDirection.Ascending
        ? Tone.Frequency(Notations.C1).transpose(Math.max(...intervals)).toNote()
        : Tone.Frequency(Notations.C1).toNote(),
      direction !== SequenceDirection.Descending
        ? Tone.Frequency(Notations.C5).transpose(-Math.max(...intervals)).toNote()
        : Tone.Frequency(Notations.C5).toNote(),
    ];

    const baseNote = RandomGenerator.generateRandomNote(min, max);
    const randomized = RandomGenerator.randomizeArray(intervals);

    const sequence: [Pause | Frequency | Frequency[], Subdivision][] = randomized.reduce(
      (acc: [Frequency | Frequency[], Subdivision][], interval) => [
        ...acc,
        [baseNote, '4n'],
        [Tone.Frequency(baseNote).transpose(interval).toNote(), '4n'],
        ['pause', '2n']],
      [],
    );

    return {
      round: { ...quiz, terms: randomized.map((i) => Intervals[i]) },
      value: randomized.indexOf(Math.max(...intervals)),
      sequence,
    };
  }
}

export default IntervalComparison;
