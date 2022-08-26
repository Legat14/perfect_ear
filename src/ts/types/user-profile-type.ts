import IExerciseResult from './exercise-result';

type IUserProfileType = {
  dayScore: number,
  dayTime: number,
  dayExercises: number,
  currentDay: Date,
  totalScore: number,
  totalTime: number,
  totalExercises: number,
  intervalGameScore: number,
  exercisesResult: Array<IExerciseResult>,
};

export default IUserProfileType;
