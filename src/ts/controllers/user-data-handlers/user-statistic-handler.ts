import UserProfile from '../../models/user-profile';
import { IUserStatisticCounters } from '../../types/data-types';

class UserStatisticHandler {
  private userProfile: UserProfile;

  private dayExercisesCounter: HTMLElement;

  private dayScoreCounter: HTMLElement;

  private dayTimeCounter: HTMLElement;

  private totalExercisesCounter: HTMLElement;

  private totalScoreCounter: HTMLElement;

  private totalTimeCounter: HTMLElement;

  private totalIntervalGameScoreCounter: HTMLElement;

  private totalScaleGameScoreCounter: HTMLElement;

  private totalChordsGameScoreCounter: HTMLElement;

  constructor(userProfile: UserProfile, userDayStatisticCounters: IUserStatisticCounters) {
    this.userProfile = userProfile;
    this.dayExercisesCounter = userDayStatisticCounters.dayExercisesCounter;
    this.dayScoreCounter = userDayStatisticCounters.dayScoreCounter;
    this.dayTimeCounter = userDayStatisticCounters.dayTimeCounter;
    this.totalExercisesCounter = userDayStatisticCounters.totalExercisesCounter;
    this.totalScoreCounter = userDayStatisticCounters.totalScoreCounter;
    this.totalTimeCounter = userDayStatisticCounters.totalTimeCounter;
    this.totalIntervalGameScoreCounter = userDayStatisticCounters.totalIntervalGameScoreCounter;
    this.totalScaleGameScoreCounter = userDayStatisticCounters.totalScaleGameScoreCounter;
    this.totalChordsGameScoreCounter = userDayStatisticCounters.totalChordsGameScoreCounter;
    this.refreshCounters();
    this.addRefreshEvent();
  }

  private refreshDayExercisesCounter() {
    this.dayExercisesCounter.innerHTML = this.userProfile.getDayExercises().toString();
  }

  private refreshDayScoreCounter() {
    this.dayScoreCounter.innerHTML = this.userProfile.getDayScore().toString();
  }

  private refreshDayTimeCounter() {
    this.dayTimeCounter.innerHTML = this.userProfile.getDayTimeHR();
  }

  private refreshTotalExercisesCounter() {
    this.totalExercisesCounter.innerHTML = this.userProfile.getTotalExercises().toString();
  }

  private refreshTotalScoreCounter() {
    this.totalScoreCounter.innerHTML = this.userProfile.getTotalScore().toString();
  }

  private refreshTotalTimeCounter() {
    this.totalTimeCounter.innerHTML = this.userProfile.getTotalTimeHR();
  }

  private refreshTotalIntervalGameScoreCount() {
    this.totalIntervalGameScoreCounter.innerHTML = this.userProfile.getIntervalGameScore()
      .toString();
  }

  private refreshTotalScaleGameScoreCount() {
    this.totalScaleGameScoreCounter.innerHTML = this.userProfile.getScaleGameScore()
      .toString();
  }

  private refreshTotalChordsGameScoreCount() {
    this.totalChordsGameScoreCounter.innerHTML = this.userProfile.getChordsGameScore()
      .toString();
  }

  public refreshCounters() {
    this.refreshDayExercisesCounter();
    this.refreshDayScoreCounter();
    this.refreshDayTimeCounter();
    this.refreshTotalExercisesCounter();
    this.refreshTotalScoreCounter();
    this.refreshTotalTimeCounter();
    this.refreshTotalIntervalGameScoreCount();
    this.refreshTotalScaleGameScoreCount();
    this.refreshTotalChordsGameScoreCount();
  }

  addRefreshEvent() {
    document.addEventListener('ongameend', () => this.refreshCounters());
  }
}

export default UserStatisticHandler;
