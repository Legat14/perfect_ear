import { IDayGoals } from '../types/data-types';

class UserConfig {
  private dayExercisesGoal: number;

  private dayScoreGoal: number;

  private dayTimeGoal: number;

  constructor({
    dayExercisesGoal,
    dayScoreGoal,
    dayTimeGoal,
  }: IDayGoals) {
    this.dayExercisesGoal = dayExercisesGoal;
    this.dayScoreGoal = dayScoreGoal;
    this.dayTimeGoal = dayTimeGoal;
  }

  public getDayExercisesGoal(): number {
    return this.dayExercisesGoal;
  }

  public getDayScoreGoal(): number {
    return this.dayScoreGoal;
  }

  public getDayTimeGoal(): number {
    return this.dayTimeGoal;
  }

  public setDayExercisesGoal(value: number): void {
    this.dayExercisesGoal = value;
  }

  public setDayScoreGoal(value: number): void {
    this.dayScoreGoal = value;
  }

  public setDayTimeGoal(value: number): void {
    this.dayTimeGoal = value;
  }
}

export default UserConfig;
