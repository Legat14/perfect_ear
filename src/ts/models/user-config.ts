import { IDayGoals, Languages } from '../types/data-types';

class UserConfig {
  private dayExercisesGoal: number;

  private dayScoreGoal: number;

  private dayTimeGoal: number;

  private language: Languages;

  private volume: number;
  constructor(
    {
      dayExercisesGoal,
      dayScoreGoal,
      dayTimeGoal,
    }: IDayGoals,
    language: Languages,
    volume: number,
  ) {
    this.dayExercisesGoal = dayExercisesGoal;
    this.dayScoreGoal = dayScoreGoal;
    this.dayTimeGoal = dayTimeGoal;
    this.language = language;
    this.volume = volume;
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

  public getLanguage(): Languages {
    return this.language;
  }

  public getVolume(): number {
    return this.volume;
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

  public setLanguge(value: Languages): void {
    this.language = value;
  }

  public setVolume(value: number): void {
    this.volume = value;
  }
}

export default UserConfig;
