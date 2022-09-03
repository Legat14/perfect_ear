import UserProfile from '../../models/user-profile';
import { IUserDayStatisticCounters } from '../../types/data-types';

class UserDayStatisticHandler {
  private userProfile: UserProfile;

  private exercisesCounter: HTMLElement;

  private scoreCounter: HTMLElement;

  private timeCounter: HTMLElement;

  private exercisesIndicator: HTMLElement;

  private scoreIndicator: HTMLElement;

  private timeIndicator: HTMLElement;

  constructor(userProfile: UserProfile, userDayStatisticCounters: IUserDayStatisticCounters) {
    this.userProfile = userProfile;
    this.exercisesCounter = userDayStatisticCounters.exercisesCounter;
    this.scoreCounter = userDayStatisticCounters.scoreCounter;
    this.timeCounter = userDayStatisticCounters.timeCounter;
    this.exercisesIndicator = userDayStatisticCounters.exercisesIndicator;
    this.scoreIndicator = userDayStatisticCounters.scoreIndicator;
    this.timeIndicator = userDayStatisticCounters.timeIndicator;
    this.refrashCounters();
    this.addRefreshEvent();
  }

  private refreshExercisesCounter() {
    this.exercisesCounter.innerHTML = this.userProfile.getDayExercises().toString();
  }

  private refreshScoreCounter() {
    this.scoreCounter.innerHTML = this.userProfile.getDayScore().toString();
  }

  private refreshTimeCounter() {
    this.timeCounter.innerHTML = this.userProfile.getDayTimeHR();
  }

  private refreshExercisesIndicator() {
    const dayGoal = 50; // TODO: Заменить хардкод на получение целей из настроек пользователя
    const complete = this.userProfile.getDayExercises();
    const completePercentage = (complete / dayGoal) * 100;
    this.exercisesIndicator.setAttribute('value', completePercentage.toString());
  }

  private refreshScoreIndicator() {
    const dayGoal = 50000; // TODO: Заменить хардкод на получение целей из настроек пользователя
    const complete = this.userProfile.getDayScore();
    const completePercentage = (complete / dayGoal) * 100;
    this.scoreIndicator.setAttribute('value', completePercentage.toString());
  }

  private refreshTimeIndicator() {
    const dayGoal = 500000; // TODO: Заменить хардкод на получение целей из настроек пользователя
    const complete = this.userProfile.getDayTime();
    const completePercentage = (complete / dayGoal) * 100;
    this.timeIndicator.setAttribute('value', completePercentage.toString());
  }

  public refrashCounters() {
    this.refreshExercisesCounter();
    this.refreshExercisesIndicator();
    this.refreshScoreCounter();
    this.refreshScoreIndicator();
    this.refreshTimeCounter();
    this.refreshTimeIndicator();
  }

  addRefreshEvent() {
    document.addEventListener('ongameend', () => this.refrashCounters());
  }
}

export default UserDayStatisticHandler;
