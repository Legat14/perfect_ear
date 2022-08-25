import IExerciseResult from '../types/exercise-result';

class UserProfile {
  private dayScore: number;

  private dayTime: number;

  private dayExercises: number;

  private currentDay: Date;

  private totalScore: number;

  private totalTime: number;

  private totalExercises: number;

  private intervalGameScore: number;

  private exercisesResult: Array<IExerciseResult>;

  constructor({
    dayScore,
    dayTime,
    dayExercises,
    currentDay,
    totalScore,
    totalTime,
    totalExercises,
    intervalGameScore,
    exercisesResult,
  }: {
    dayScore: number,
    dayTime: number,
    dayExercises: number,
    currentDay: Date,
    totalScore: number,
    totalTime: number,
    totalExercises: number,
    intervalGameScore: number,
    exercisesResult: Array<IExerciseResult>,
  }) {
    this.dayScore = dayScore;
    this.dayTime = dayTime;
    this.dayExercises = dayExercises;
    this.currentDay = currentDay;
    this.totalScore = totalScore;
    this.totalTime = totalTime;
    this.totalExercises = totalExercises;
    this.intervalGameScore = intervalGameScore;
    this.exercisesResult = exercisesResult;
  }

  public getDayScore(): number {
    return this.dayScore;
  }

  public getDayTime(): number {
    return this.dayTime;
  }

  public getDayExercises(): number {
    return this.dayExercises;
  }

  public getCurrentDay(): Date {
    return this.currentDay;
  }

  public getTotalScore(): number {
    return this.totalScore;
  }

  public getTotalTime(): number {
    return this.totalTime;
  }

  public getTotalExercises(): number {
    return this.totalExercises;
  }

  public getIntervalGameScore(): number {
    return this.intervalGameScore;
  }

  public getExercisesResult(): Array<IExerciseResult> {
    return this.exercisesResult;
  }

  public setDayScore(value: number) {
    this.dayScore = value;
  }

  public setDayTime(value: number) {
    this.dayTime = value;
  }

  public setDayExercises(value: number) {
    this.dayExercises = value;
  }

  public setCurrentDay(value: Date) {
    this.currentDay = value;
  }

  public setTotalScore(value: number) {
    this.totalScore = value;
  }

  public setTotalTime(value: number) {
    this.totalTime = value;
  }

  public setTotalExercises(value: number) {
    this.totalExercises = value;
  }

  public setIntervalGameScore(value: number) {
    this.intervalGameScore = value;
  }

  public addExercisesResult(newExerciseResult: IExerciseResult) { // TODO: Заменить этот
    // метод на тот,
    // который будет сравнивать входящие значения с уже присутствующими в
    // объекте. Добавлять несуществующие и обновлять результаты, если они
    // улучшились
    let pastResultIndex = 0;
    const pastExerciseResult = this.exercisesResult.find((item, index) => {
      pastResultIndex = index;
      return item.exercise === newExerciseResult.exercise;
    });
    if (pastExerciseResult) {
      if (newExerciseResult.result > pastExerciseResult.result) {
        console.log(`New best score at ${newExerciseResult.exercise}!`); // TODO: Передать сведения
        // о новом лучшем результате на экран победителя
        this.exercisesResult[pastResultIndex].result = newExerciseResult.result;
      }
    } else {
      this.exercisesResult.push(newExerciseResult);
    }
  }

  public increaseDayScore(value: number) {
    this.dayScore = this.getDayScore() + value;
  }

  public increaseDayTime(value: number) {
    this.dayTime = this.getDayTime() + value;
  }

  public increaseDayExercises(value: number) {
    this.dayExercises = this.getDayExercises() + value;
  }

  public increaseTotalScore(value: number) {
    this.totalScore = this.getTotalScore() + value;
  }

  public increaseTotalTime(value: number) {
    this.totalTime = this.getTotalTime() + value;
  }

  public increaseTotalExercises(value: number) {
    this.totalExercises = this.getTotalExercises() + value;
  }

  public increaseIntervalGameScore(value: number) {
    this.intervalGameScore = this.getIntervalGameScore() + value;
  }
}

export default UserProfile;

// const userProfile = new UserProfile({
//   dayScore: 10,
//   dayTime: 10,
//   dayExercises: 10,
//   currentDay: new Date(),
//   totalScore: 10,
//   totalTime: 10,
//   totalExercises: 10,
//   intervalGameScore: 10,
//   exercisesResult: [
//     { exercise: 'Ex.1', result: 20 },
//     { exercise: 'Ex.3', result: 100 },
//     { exercise: 'Ex.4', result: 50 }],
// });

// console.log(userProfile);
// userProfile.addExercisesResult({ exercise: 'Ex.2', result: 10 });
// userProfile.addExercisesResult({ exercise: 'Ex.1', result: 10 });
// userProfile.addExercisesResult({ exercise: 'Ex.4', result: 60 });
// userProfile.addExercisesResult({ exercise: 'Ex.5', result: 10 });
// userProfile.addExercisesResult({ exercise: 'Ex.5', result: 20 });
// userProfile.addExercisesResult({ exercise: 'Ex.5', result: 5 });
// userProfile.addExercisesResult({ exercise: 'Ex.5', result: 36 });
// userProfile.addExercisesResult({ exercise: 'Ex.5', result: 35 });
// userProfile.addExercisesResult({ exercise: 'Ex.5', result: 30 });
// userProfile.addExercisesResult({ exercise: 'Ex.1', result: 60.8 });
// userProfile.addExercisesResult({ exercise: 'Ex.1', result: 0.8 });
// console.log(userProfile.getExercisesResult());
