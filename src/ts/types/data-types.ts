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
  exercisesIndicator: HTMLElement,
  scoreCounter: HTMLElement,
  scoreIndicator: HTMLElement,
  timeCounter: HTMLElement,
  timeIndicator: HTMLElement,
}

export interface IUserStatisticCounters {
  dayExercisesCounter: HTMLElement,
  dayScoreCounter: HTMLElement,
  dayTimeCounter: HTMLElement,
  totalExercisesCounter: HTMLElement,
  totalScoreCounter: HTMLElement,
  totalTimeCounter: HTMLElement,
  totalIntervalGameScoreCount: HTMLElement,
}

export interface IDayGoalsInputs {
  dayGoalExercisesInput: HTMLElement,
  dayGoalScoreInput: HTMLElement,
  dayGoalTimeInput: HTMLElement,
}

export interface IDayGoals {
  dayExercisesGoal: number,
  dayScoreGoal: number,
  dayTimeGoal: number,
}
