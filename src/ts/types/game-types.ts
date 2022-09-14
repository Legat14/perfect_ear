import { Frequency, Note, Subdivision } from 'tone/build/esm/core/type/Units';
import { Languages } from './data-types';
import { Pause } from './note-types';

export enum SequenceDirection {
  Ascending = 'восходящее',
  Descending = 'нисходящее',
  Harmonic = 'гармоническое',
  Melodic = 'мелодическое',
  Any = 'любое направление',
}

export enum Intervals {
  'унисон' = 0,
  'малая секунда',
  'большая секунда',
  'малая терция',
  'большая терция',
  'чистая кварта',
  'тритон',
  'чистая квинта',
}

export const Scales = {
  'натуральный минор': [0, 2, 3, 5, 7, 8, 10],
  'гармонический минор': [0, 2, 3, 5, 7, 8, 11],
  'мелодический минор': [0, 2, 3, 5, 7, 9, 11],
  'натуральный мажор': [0, 2, 4, 5, 7, 9, 11],
  дорийский: [0, 2, 3, 5, 7, 9, 10],
  лидийский: [0, 2, 4, 6, 7, 9, 11],
  миксолидийский: [0, 2, 4, 5, 7, 9, 10],
  фригийский: [0, 1, 3, 5, 7, 8, 10],
  локрийский: [0, 1, 3, 5, 6, 8, 10],
  'мажорная пентатоника': [0, 2, 4, 7, 9],
  'минорная пентатоника': [0, 3, 5, 7, 10],
  ионийский: [0, 2, 4, 5, 7, 9, 11],
  эолийский: [0, 2, 3, 5, 7, 8, 10],
};

export const Chords = {
  'мажорное трезвучие': [0, 4, 7],
  'минорное трезвучие': [0, 3, 7],
  'уменьшенное трезвучие': [0, 3, 6],
  'увеличенное трезвучие': [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
};

export type CategoryName = IGameCategory['categoryName'];
export type CategoryId = IGameCategory['categoryId'];

export interface IGamesData<QuizType extends IRound = IRound> {
  categories: Record<CategoryId, IGameCategory<QuizType>>
}

/**
 * @example
 * const Intervals: IGameCategory = {
 *   categoryId: 'intervals',
 *   categoryName: 'intervals',
 *   games: {},
 * };
 */
export type GameName = IQuizGame['gameName'];
export type GameId = IQuizGame['gameId'];

export interface IGameCategory<QuizType extends IRound = IRound> {
  categoryId: string;
  categoryName: Record<keyof typeof Languages, string>;
  games?: Record<GameId, IQuizGame<QuizType>>
}

/**
 * @example
 * const IntervalComparison: IQuizGame = {
 *   category: Intervals,
 *   gameId: 'intervals0',
 *   gameName: 'Interval Comparison',
 *   quizes: [],
 * };
 */
export interface IQuizGame<QuizType extends IRound = IRound> {
  category?: IGameCategory<QuizType>;
  gameId: string;
  gameName: Record<keyof typeof Languages, string>;
  quizes?: QuizType[];
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
export type RoundType = IIntervalRound | IScaleRound;

export type QuizId = IRound['quizId'];
export interface IRound {
  game: IQuizGame;
  quizId: string,
  quizName: Record<keyof typeof Languages, string>,
  quizStartDescription: Record<keyof typeof Languages, string[]>;
  direction: Extract<SequenceDirection[keyof SequenceDirection], string>,
  score: number,
  rounds: number,
  bonus: number,
  condition: Record<keyof typeof Languages, string>;
  answers: Record<keyof typeof Languages, string>[];
  terms: string[];
}

export interface IQuestion<T extends IRound> {
  round: T;
  sequence?: [Pause | Frequency | Frequency[], Subdivision][];
  value: keyof IRound['answers'];
  baseNote: Note;
  labels: Note[][];
}

export interface IIntervalRound extends IRound {
  game: IQuizGame;
  quizId: string,
  quizName: Record<keyof typeof Languages, string>,
  quizStartDescription: Record<keyof typeof Languages, string[]>;
  direction: Extract<SequenceDirection[keyof SequenceDirection], string>,
  score: number,
  rounds: number,
  bonus: number,
  condition: Record<keyof typeof Languages, string>;
  answers: Record<keyof typeof Languages, string>[];
  terms: string[];
  intervals: Extract<Intervals, number>[];
}

export interface IScaleRound extends IRound {
  game: IQuizGame;
  quizId: string,
  quizName: Record<keyof typeof Languages, string>,
  quizStartDescription: Record<keyof typeof Languages, string[]>;
  direction: Extract<SequenceDirection[keyof SequenceDirection], string>,
  score: number,
  rounds: number,
  bonus: number,
  condition: Record<keyof typeof Languages, string>;
  answers: { RUS: keyof typeof Scales; ENG: string }[];
  terms: (keyof typeof Scales)[];
}

export interface IChordRound extends IRound {
  game: IQuizGame;
  quizId: string,
  quizName: Record<keyof typeof Languages, string>,
  quizStartDescription: Record<keyof typeof Languages, string[]>;
  direction: Extract<SequenceDirection[keyof SequenceDirection], string>,
  score: number,
  rounds: number,
  bonus: number,
  condition: Record<keyof typeof Languages, string>;
  answers: { RUS: keyof typeof Chords; ENG: string }[];
  terms: (keyof typeof Chords)[];
}
