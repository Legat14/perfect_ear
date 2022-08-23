class UserProfile {

  private dayScore: number;
  private dayTime: number;
  private dayExercises: number;
  private currentDay: Date;
  private totalScore: number;
  private totalTime: number;
  private intervalGameScore: number;
  private exercisesResult: object; // TODO: создать специальный тип

  constructor ({
    dayScore: dayScore,
    dayTime: dayTime,
    dayExercises: dayExercises,
    currentDay: currentDay,
    totalScore: totalScore,
    totalTime: totalTime,
    intervalGameScore: intervalGameScore,
    exercisesResult: exercisesResult,
  }: {
    dayScore: number,
    dayTime: number,
    dayExercises: number,
    currentDay: Date,
    totalScore: number,
    totalTime: number,
    intervalGameScore: number,
    exercisesResult: object,
  }) {
    this.dayScore = dayScore;
    this.dayTime = dayTime;
    this.dayExercises = dayExercises;
    this.currentDay = currentDay;
    this.totalScore = totalScore;
    this.totalTime = totalTime;
    this.intervalGameScore = intervalGameScore;
    this.exercisesResult = exercisesResult;
  }

  getCounter(counter: UserProfileVars) {
    return this[counter];
  }

  setCounter(counter: UserProfileVars, newValue: UserProfileTypes) {
    this[counter] = newValue;
  }
}

type UserProfileVars = keyof UserProfile;
type UserProfileTypes = keyof UserProfile; // Этот тип работает не так, как нужно

export default UserProfile;
