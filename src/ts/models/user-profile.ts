import HumanReadableData from '../helpers/human-readable-data';
import {
  IAchievements,
  IDate,
  IExerciseResult,
  IUserProfileType,
} from '../types/data-types';

class UserProfile {
  private conversionHelper: HumanReadableData;

  private dayScore: number;

  private dayTime: number;

  private dayTimeHR: string;

  private dayExercises: number;

  private profileDate: IDate;

  private totalScore: number;

  private totalTime: number;

  private totalTimeHR: string;

  private totalExercises: number;

  private intervalGameScore: number;

  private scaleGameScore: number;

  private chordsGameScore: number;

  private exercisesResult: Array<IExerciseResult>;

  private achievements: Array<IAchievements>;

  constructor({
    dayScore,
    dayTime,
    dayExercises,
    totalScore,
    totalTime,
    totalExercises,
    profileDate,
    intervalGameScore,
    scaleGameScore,
    chordsGameScore,
    exercisesResult,
    achievements,
  }: IUserProfileType) {
    this.conversionHelper = new HumanReadableData();
    this.dayScore = dayScore;
    this.dayTime = dayTime;
    this.dayTimeHR = this.conversionHelper.getTimeHumanReadableStr(dayTime);
    this.dayExercises = dayExercises;
    this.profileDate = profileDate;
    this.totalScore = totalScore;
    this.totalTime = totalTime;
    this.totalTimeHR = this.conversionHelper.getTimeHumanReadableStr(totalTime);
    this.totalExercises = totalExercises;
    this.intervalGameScore = intervalGameScore;
    this.scaleGameScore = scaleGameScore;
    this.chordsGameScore = chordsGameScore;
    this.exercisesResult = exercisesResult;
    this.achievements = achievements;
  }

  public getDayScore(): number {
    return this.dayScore;
  }

  public getDayTime(): number {
    return this.dayTime;
  }

  public getDayTimeHR(): string {
    return this.dayTimeHR;
  }

  public getDayExercises(): number {
    return this.dayExercises;
  }

  public getProfileDate(): IDate {
    return this.profileDate;
  }

  public getTotalScore(): number {
    return this.totalScore;
  }

  public getTotalTime(): number {
    return this.totalTime;
  }

  public getTotalTimeHR(): string {
    return this.totalTimeHR;
  }

  public getTotalExercises(): number {
    return this.totalExercises;
  }

  public getIntervalGameScore(): number {
    return this.intervalGameScore;
  }

  public getScaleGameScore(): number {
    return this.scaleGameScore;
  }

  public getChordsGameScore(): number {
    return this.chordsGameScore;
  }

  public getExercisesResult(): Array<IExerciseResult> {
    return this.exercisesResult;
  }

  public getAchievements(): Array<IAchievements> {
    return this.achievements;
  }

  public setDayScore(value: number): void {
    this.dayScore = value;
  }

  public setDayTime(value: number): void {
    this.dayTime = value;
    this.dayTimeHR = this.conversionHelper.getTimeHumanReadableStr(value);
  }

  public setDayExercises(value: number): void {
    this.dayExercises = value;
  }

  public setProfileDate(value: IDate): void {
    this.profileDate = value;
  }

  public setTotalScore(value: number): void {
    this.totalScore = value;
  }

  public setTotalTime(value: number): void {
    this.totalTime = value;
    this.totalTimeHR = this.conversionHelper.getTimeHumanReadableStr(value);
  }

  public setTotalExercises(value: number): void {
    this.totalExercises = value;
  }

  public setIntervalGameScore(value: number): void {
    this.intervalGameScore = value;
  }

  public setScaleGameScore(value: number): void {
    this.scaleGameScore = value;
  }

  public setChordsGameScore(value: number): void {
    this.chordsGameScore = value;
  }

  public clearExercisesResult(): void {
    this.exercisesResult = [];
  }

  public clearAchievements(): void {
    this.achievements = [
      { achievement: 'First of many', complete: false },
      { achievement: 'Student', complete: false },
      { achievement: 'Serious', complete: false },
      { achievement: 'Obsessed', complete: false },
    ];
    // this.achievements.forEach((achievement): void => {
    //   const currentAchievement = achievement;
    //   currentAchievement.complete = false;
    // });
  }

  public addExercisesResult(newExerciseResult: IExerciseResult): void {
    let pastResultIndex = 0;
    const pastExerciseResult = this.exercisesResult.find((item, index) => {
      pastResultIndex = index;
      return item.exercise === newExerciseResult.exercise;
    });
    if (pastExerciseResult) {
      if (newExerciseResult.score > pastExerciseResult.score) {
        console.log(`New best score at ${newExerciseResult.exercise}!`); // TODO: Передать сведения
        // о новом лучшем результате на экран победителя
        this.exercisesResult[pastResultIndex].score = newExerciseResult.score;
      }
    } else {
      this.exercisesResult.push(newExerciseResult);
    }
  }

  public setAchievementCompletion(achievement: string): void {
    const currentAchievement = this
      .achievements.find((item): boolean => item.achievement === achievement);
    if (currentAchievement) {
      currentAchievement.complete = true;
    }
  }

  public increaseDayScore(value: number): void {
    this.dayScore = this.getDayScore() + value;
  }

  public increaseDayTime(value: number): void {
    this.dayTime = this.getDayTime() + value;
    this.dayTimeHR = this.conversionHelper.getTimeHumanReadableStr(this.dayTime);
  }

  public increaseDayExercises(value: number): void {
    this.dayExercises = this.getDayExercises() + value;
  }

  public increaseTotalScore(value: number): void {
    this.totalScore = this.getTotalScore() + value;
  }

  public increaseTotalTime(value: number): void {
    this.totalTime = this.getTotalTime() + value;
    this.totalTimeHR = this.conversionHelper.getTimeHumanReadableStr(this.totalTime);
  }

  public increaseTotalExercises(value: number): void {
    this.totalExercises = this.getTotalExercises() + value;
  }

  public increaseIntervalGameScore(value: number): void {
    this.intervalGameScore = this.getIntervalGameScore() + value;
  }

  public increaseScaleGameScore(value: number): void {
    this.scaleGameScore = this.getScaleGameScore() + value;
  }

  public increaseChordsGameScore(value: number): void {
    this.chordsGameScore = this.getChordsGameScore() + value;
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
