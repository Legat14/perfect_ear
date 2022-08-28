import UserProfile from '../../models/user-profile';
import { IUserDayStatisticCounters } from '../../types/data-types';

class UserDayStatisticHandler {
  private userProfile: UserProfile;

  private exercisesCounter: HTMLElement;

  private scoreCounter: HTMLElement;

  private timeCounter: HTMLElement;

  constructor(userProfile: UserProfile, userDayStatisticCounters: IUserDayStatisticCounters) {
    this.userProfile = userProfile;
    this.exercisesCounter = userDayStatisticCounters.exercisesCounter;
    this.scoreCounter = userDayStatisticCounters.scoreCounter;
    this.timeCounter = userDayStatisticCounters.timeCounter;
    this.refrashCounters();
  }

  private refrashExercisesCounter() {
    this.exercisesCounter.innerHTML = this.userProfile.getDayExercises().toString();
  }

  private refrashScoreCounter() {
    this.scoreCounter.innerHTML = this.userProfile.getDayScore().toString();
  }

  private refrashTimeCounter() {
    this.timeCounter.innerHTML = this.userProfile.getDayTime().toString();
  }

  public refrashCounters() {
    this.refrashExercisesCounter();
    this.refrashScoreCounter();
    this.refrashTimeCounter();
  }
}

export default UserDayStatisticHandler;
