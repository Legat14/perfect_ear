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

  private refreshExercisesCounter() {
    this.exercisesCounter.innerHTML = this.userProfile.getDayExercises().toString();
  }

  private refreshScoreCounter() {
    this.scoreCounter.innerHTML = this.userProfile.getDayScore().toString();
  }

  private refreshTimeCounter() {
    this.timeCounter.innerHTML = this.userProfile.getDayTime().toString();
  }

  public refrashCounters() {
    this.refreshExercisesCounter();
    this.refreshScoreCounter();
    this.refreshTimeCounter();
  }
}

export default UserDayStatisticHandler;
