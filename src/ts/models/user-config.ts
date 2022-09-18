import { IDayGoals, Languages } from '../types/data-types';

class UserConfig {
  private dayExercisesGoal: number;

  private dayScoreGoal: number;

  private dayTimeGoal: number;

  private language: keyof typeof Languages;

  private volume: number;

  private tempo: number;

  constructor(
    {
      dayExercisesGoal,
      dayScoreGoal,
      dayTimeGoal,
    }: IDayGoals,
    language: keyof typeof Languages,
    volume: number,
    tempo: number,
  ) {
    this.dayExercisesGoal = dayExercisesGoal;
    this.dayScoreGoal = dayScoreGoal;
    this.dayTimeGoal = dayTimeGoal;
    this.language = language;
    this.volume = volume;
    this.tempo = tempo;
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

  public getLanguage(): keyof typeof Languages {
    console.log(this.language);
    return this.language;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getTempo(): number {
    return this.tempo;
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

  public setLanguge(value: keyof typeof Languages): void {
    this.language = value;
  }

  public setVolume(value: number): void {
    this.volume = value;
  }

  public setTempo(value: number): void {
    this.tempo = value;
  }
}

export default UserConfig;
