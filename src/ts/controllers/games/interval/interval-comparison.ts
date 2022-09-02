import * as Tone from 'tone';
import { Frequency, Subdivision } from 'tone/build/esm/core/type/Units';
import Sound from '../../sound';
import { Pause, PianoNotations as Notations } from '../../../types/note-types';
import {
  IIntervalRound, Intervals, IQuestion, SequenceDirection as Direction,
} from '../../../types/game-types';
import AbstractGameQuiz from '../../game-cycle/abstract-game-quiz';
import Random from '../../../helpers/generator';

class IntervalComparison extends AbstractGameQuiz<IIntervalRound> {
  constructor(quiz: IIntervalRound, round: number, sound: Sound) {
    super(quiz, round, sound);

    this.generateQuestion(quiz);
  }

  public generateQuestion(quiz: IIntervalRound): IQuestion<IIntervalRound> {
    const { intervals, direction, answers } = quiz;

    direction.replace('melodic', [Direction.Ascending, Direction.Descending][Random.generateRandomNumber(0, 1)]);

    const [min, max] = [
      direction !== Direction.Ascending
        ? Tone.Frequency(Notations.C1).transpose(Math.max(...intervals)).toNote()
        : Tone.Frequency(Notations.C1).toNote(),
      direction !== Direction.Descending
        ? Tone.Frequency(Notations.C5).transpose(-Math.max(...intervals)).toNote()
        : Tone.Frequency(Notations.C5).toNote(),
    ];

    const baseNote = Random.generateRandomNote(min, max);
    const randomized = Random.getRandomFromArray(
      Random.randomizeArray(intervals),
      answers.length,
    );

    const sequence: [Pause | Frequency | Frequency[], Subdivision][] = randomized.reduce(
      (acc: [Frequency | Frequency[], Subdivision][], interval) => [
        ...acc,
        ...(direction === Direction.Harmonic
          ? ([
            [[baseNote, Tone.Frequency(baseNote).transpose(interval).toNote()], '2n'],
          ] as [Pause | Frequency | Frequency[], Subdivision][])
          : ([
            [baseNote, '4n'],
            [Tone.Frequency(baseNote).transpose(
              interval * (direction === Direction.Ascending ? 1 : -1),
            ).toNote(), '4n'],
          ] as [Pause | Frequency | Frequency[], Subdivision][])),
        ['pause', '2n'],
      ],
      [],
    );

    return {
      round: { ...quiz, terms: randomized.map((i) => Intervals[i]) },
      value: randomized.indexOf(Math.max(...randomized)),
      sequence,
    };
  }
}

export default IntervalComparison;
