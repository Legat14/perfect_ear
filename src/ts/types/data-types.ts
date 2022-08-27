export interface IDate {
  day: number,
  year: number,
}

export interface IUserProfileType {
  dayScore: number,
  dayTime: number,
  dayExercises: number,
  currentDate: IDate,
  totalScore: number,
  totalTime: number,
  totalExercises: number,
  intervalGameScore: number,
  exercisesResult: Array<IExerciseResult>,
}

export interface IExerciseResult {
  exercise: string,
  score: number,
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
  scoreCounter: HTMLElement,
  timeCounter: HTMLElement,
}
