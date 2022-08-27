import IDate from './date';
import IExerciseResult from './exercise-result';

type IUserProfileType = {
  dayScore: number,
  dayTime: number,
  dayExercises: number,
  currentDate: IDate,
  totalScore: number,
  totalTime: number,
  totalExercises: number,
  intervalGameScore: number,
  exercisesResult: Array<IExerciseResult>,
};

export default IUserProfileType;
