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

export interface IGameCategory {
  categoryId: string;
  categoryName: string;
}
export interface IQuizGame {
  category: IGameCategory;
  gameId: string;
  gameName: string;
}
export interface IQuestion {
  game: IQuizGame;
  quizId: string,
  quizName: string,
  direction: SequenceDirection,
  score: number,
  rounds: number,
  bonus: number,
  condition: string;
  answers: readonly string[];
  descriptions?: readonly string[];
  sequence?: readonly [Pause | Frequency | Frequency[], Subdivision][];
  value: keyof IQuestion['answers'];
}

export enum SequenceDirection {
  Ascending = 'ascending',
  Descending = 'descending',
  Harmonic = 'harmonic',
  Any = 'any direction',
}
