export interface IDate {
  day: number,
  year: number,
}

export interface IUserProfileType {
  dayScore: number,
  dayTime: number,
  dayExercises: number,
  profileDate: IDate,
  totalScore: number,
  totalTime: number,
  totalExercises: number,
  intervalGameScore: number,
  scaleGameScore: number,
  chordsGameScore: number,
  exercisesResult: Array<IExerciseResult>,
  achievements: Array<IAchievements>,
}

export interface IExerciseResult {
  exercise: string,
  score: number,
}

export interface IAchievements {
  achievement: string,
  complete: boolean,
}

export interface IGameResult {
  gameName: string,
  gameScore: number,
  rightAnswersScore: number,
  timeBonusScore: number,
  finesScore: number,
  rightAnswersCountToRoundCount: string,
  gameTime: number,
  gameTimeHR: string,
  averageTimeHR: string,
}

export interface IUserDayStatisticCounters {
  exercisesCounter: HTMLElement,
  exercisesIndicator: HTMLInputElement,
  scoreCounter: HTMLElement,
  scoreIndicator: HTMLInputElement,
  timeCounter: HTMLElement,
  timeIndicator: HTMLInputElement,
}

export interface IUserStatisticCounters {
  dayExercisesCounter: HTMLElement,
  dayScoreCounter: HTMLElement,
  dayTimeCounter: HTMLElement,
  totalExercisesCounter: HTMLElement,
  totalScoreCounter: HTMLElement,
  totalTimeCounter: HTMLElement,
  totalIntervalGameScoreCounter: HTMLElement,
  totalScaleGameScoreCounter: HTMLElement,
  totalChordsGameScoreCounter: HTMLElement,
}

export interface IDayGoalsInputs {
  dayGoalExercisesInput: HTMLInputElement,
  dayGoalScoreInput: HTMLInputElement,
  dayGoalTimeInput: HTMLInputElement,
}

export interface IDayGoals {
  dayExercisesGoal: number,
  dayScoreGoal: number,
  dayTimeGoal: number,
}

export interface IUserConfig {
  tempo: number;
  volume: number;
  dayGoals: IDayGoals,
  language: keyof typeof Languages,
}

export interface IAchievementImgs {
  firstOfMany: HTMLElement,
  beginner: HTMLElement,
  student: HTMLElement,
  serious: HTMLElement,
  obsessed: HTMLElement,
}

export enum Languages {
  RUS = 0,
  ENG = 1,
}
