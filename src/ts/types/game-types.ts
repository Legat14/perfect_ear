import { Frequency, Subdivision } from 'tone/build/esm/core/type/Units';
import { Pause } from './note-types';

export interface IGameResult {
  gameScore: number,
  rightAnswersScore: number,
  timeBonusScore: number,
  finesScore: number,
  rightAnswersCountToRoundCount: string,
  gameTime: number,
  gameTimeHR: string,
  averageTimeHR: string,
}

export enum SequenceDirection {
  Ascending = 'ascending',
  Descending = 'descending',
  Harmonic = 'harmonic',
  Any = 'any direction',
}

/**
 * @example
 * const Intervals: IGameCategory = {
 *   categoryId: 'intervals',
 *   categoryName: 'intervals',
 * };
 */
export interface IGameCategory {
  categoryId: string;
  categoryName: string;
}

/**
 * @example
 * const IntervalComparison: IQuizGame = {
 *   category: Intervals,
 *   gameId: 'intervals0',
 *   gameName: 'Interval Comparison',
 * };
 */
export interface IQuizGame {
  category: IGameCategory;
  gameId: string;
  gameName: string;
}

/**
 * @example
 * const IntervalComparison1: IRound = {
 *   game: IntervalComparison,
 *   quizId: 'intercomp0',
 *   quizName: 'Major and minor seconds',
 *   quizStartDescription: ['Lorem ipsum', 'Dolor sit amet'],
 *   direction: SequenceDirection.Ascending,
 *   score: 15,
 *   rounds: 10,
 *   bonus: 0,
 *   condition: 'Which interval is larger?',
 *   answers: ['first', 'second'],
 *   terms: ['minor second', 'major second'],
 * };
 */
export interface IRound {
  game: IQuizGame;
  quizId: string,
  quizName: string,
  quizStartDescription: string[];
  direction: SequenceDirection,
  score: number,
  rounds: number,
  bonus: number,
  condition: string;
  answers: readonly string[];
  terms: readonly string[];
}
export interface IQuestion {
  round: IRound;
  sequence?: [Pause | Frequency | Frequency[], Subdivision][];
  value: keyof IRound['answers'];
}
