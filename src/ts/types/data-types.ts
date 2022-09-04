export interface IDate {
  day: number,
  year: number,
}

export interface IUserProfileType {
  dayScore: number,
  dayTime: number,
  dayTimeHR: string,
  dayExercises: number,
  profileDate: IDate,
  totalScore: number,
  totalTime: number,
  totalTimeHR: string,
  totalExercises: number,
  intervalGameScore: number,
  scaleGameScore: number,
  chordsGameScore: number,
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
