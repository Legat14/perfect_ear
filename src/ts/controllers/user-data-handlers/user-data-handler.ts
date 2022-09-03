import UserConfig from '../../models/user-config';
import UserProfile from '../../models/user-profile';
import {
  IDate,
  IDayGoals,
  IGameResult,
  IUserProfileType,
} from '../../types/data-types';

class UserDataHandler {
  userProfile: UserProfile;

  userConfig: UserConfig;

  constructor() { // TODO: после добавления сервера,
    // добавить метод получения данных и получать данные
    // в зависимости от него
    const guestUserProfile = this.getProfileDataFromLocalStorage();
    if (guestUserProfile) {
      this.userProfile = new UserProfile({
        dayScore: guestUserProfile.dayScore,
        dayTime: guestUserProfile.dayTime,
        dayTimeHR: guestUserProfile.dayTimeHR,
        dayExercises: guestUserProfile.dayExercises,
        profileDate: guestUserProfile.profileDate,
        totalScore: guestUserProfile.totalScore,
        totalTime: guestUserProfile.totalTime,
        totalTimeHR: guestUserProfile.totalTimeHR,
        totalExercises: guestUserProfile.totalExercises,
        intervalGameScore: guestUserProfile.intervalGameScore,
        exercisesResult: guestUserProfile.exercisesResult,
      });
    } else {
      this.userProfile = new UserProfile({
        dayScore: 0,
        dayTime: 0,
        dayTimeHR: '0 мин 0.0 сек.',
        dayExercises: 0,
        profileDate: this.getCurrentDate(),
        totalScore: 0,
        totalTime: 0,
        totalTimeHR: '0 мин 0.0 сек.',
        totalExercises: 0,
        intervalGameScore: 0,
        exercisesResult: [],
      });
    }

    const guestUserConfig = this.getConfigDataFromLocalStorage();
    if (guestUserConfig) {
      this.userConfig = new UserConfig({
        dayExercisesGoal: guestUserConfig.dayExercisesGoal,
        dayScoreGoal: guestUserConfig.dayScoreGoal,
        dayTimeGoal: guestUserConfig.dayTimeGoal,
      });
    } else {
      this.userConfig = new UserConfig({
        dayExercisesGoal: 10,
        dayScoreGoal: 25000,
        dayTimeGoal: 30,
      });
    }
    this.addPageCloseEvent();
    this.addGameEndEvent();
    this.setDayCheckInterval();
  }

  private getProfileDataFromLocalStorage(): IUserProfileType {
    const guestUserProfileJSON = localStorage.getItem('guestUserProfile');
    let guestUserProfile;
    if (guestUserProfileJSON) {
      guestUserProfile = JSON.parse(guestUserProfileJSON);
    }
    return guestUserProfile;
  }

  private getConfigDataFromLocalStorage(): IDayGoals {
    const guestUserConfigJSON = localStorage.getItem('guestUserConfig');
    let guestUserConfig;
    if (guestUserConfigJSON) {
      guestUserConfig = JSON.parse(guestUserConfigJSON);
    }
    return guestUserConfig;
  }

  private saveProfileDataToLocalStorage(): void {
    const guestUserProfile: IUserProfileType = {
      dayScore: this.userProfile.getDayScore(),
      dayTime: this.userProfile.getDayTime(),
      dayTimeHR: this.userProfile.getDayTimeHR(),
      dayExercises: this.userProfile.getDayExercises(),
      profileDate: this.userProfile.getProfileDate(),
      totalScore: this.userProfile.getTotalScore(),
      totalTime: this.userProfile.getTotalTime(),
      totalTimeHR: this.userProfile.getTotalTimeHR(),
      totalExercises: this.userProfile.getTotalExercises(),
      intervalGameScore: this.userProfile.getIntervalGameScore(),
      exercisesResult: this.userProfile.getExercisesResult(),
    };
    localStorage.setItem('guestUserProfile', JSON.stringify(guestUserProfile));
  }

  private saveConfigDataToLocalStorage(): void {
    const guestUserConfig: IDayGoals = { // TODO: При появлении конфигураций
      // других категорий, заменить тип на более общий тип Config,
      // включающий и IDayGoals
      dayExercisesGoal: this.userConfig.getDayExercisesGoal(),
      dayScoreGoal: this.userConfig.getDayScoreGoal(),
      dayTimeGoal: this.userConfig.getDayTimeGoal(),
    };
    localStorage.setItem('guestUserConfig', JSON.stringify(guestUserConfig));
  }

  private addPageCloseEvent(): void {
    window.addEventListener('beforeunload', (): void => {
      this.saveProfileDataToLocalStorage();
      this.saveConfigDataToLocalStorage();
    });
  }

  private addGameEndEvent(): void {
    document.addEventListener('ongameend', (event: CustomEvent | Event): void => {
      const gameResult = (event as CustomEvent).detail;
      this.decomposeGameResult(gameResult);
      console.log('Game Result: ', gameResult);
    });
  }

  private getCurrentDate(): IDate {
    const date = new Date(Date.now());
    const currentDay = date.getDate();
    const currentYear = date.getFullYear();
    const currentDate = {
      day: currentDay,
      year: currentYear,
    };
    return currentDate;
  }

  public clearDayScore(): void {
    this.userProfile.setDayScore(0);
    this.userProfile.setDayTime(0);
    this.userProfile.setDayExercises(0);
    this.userProfile.setProfileDate(this.getCurrentDate());
  }

  public clearUserProfileData(): void {
    this.clearDayScore();
    this.userProfile.setTotalScore(0);
    this.userProfile.setTotalTime(0);
    this.userProfile.setTotalExercises(0);
    this.userProfile.setIntervalGameScore(0);
    this.userProfile.clearExercisesResult();
  }

  private decomposeGameResult(gameResult: IGameResult): void {
    this.userProfile.increaseDayScore(gameResult.gameScore);
    this.userProfile.increaseDayTime(gameResult.gameTime);
    this.userProfile.increaseDayExercises(1);
    this.userProfile.increaseTotalScore(gameResult.gameScore);
    this.userProfile.increaseTotalTime(gameResult.gameTime);
    this.userProfile.increaseTotalExercises(1);
    console.log('Game type: ', gameResult.gameName.slice(0, gameResult.gameName.length - 3));
    if (gameResult.gameName.slice(0, gameResult.gameName.length - 3) === 'IntervalGame') {
      this.userProfile.increaseIntervalGameScore(gameResult.gameScore);
    } // TODO: добавлять варианты для других игр
    const newExerciseResult = {
      exercise: gameResult.gameName,
      score: gameResult.gameScore,
    };
    this.userProfile.addExercisesResult(newExerciseResult);
    console.log('User Profile after game end: ', this.userProfile);
  }

  private setDayCheckInterval(): void {
    setInterval(() => {
      const currentDate = this.getCurrentDate();
      const userProfileDate = this.userProfile.getProfileDate();
      if (currentDate.day !== userProfileDate.day || currentDate.year !== userProfileDate.year) {
        this.clearDayScore();
        console.log('reset day progress');
      }
    }, 60000);
  }
}

export default UserDataHandler;

// Для проверки скопировать приведенный ниже код в index.ts

// import GameIndicators from './ts/controllers/game-cycle/game-indicators';
// import appLoader from './ts/controllers/app-loader';

// const gameIndicators = new GameIndicators({
//   gameName: 'IntervalGame-01',
//   scoreForRightAnswer: 300,
//   roundsCount: 10,
//   bonusTime: 10000,
// });

// const stopGame = (): void => {
//   console.log('Timer is set');
//   setTimeout((): void => {
//     console.log('Timer is stoped');
//     gameIndicators.finishGame();
//     appLoader.userDayStatisticHandler.refrashCounters();
//     appLoader.userStatisticHandler.refrashCounters();
//   }, 2000);
// };

// stopGame();

// gameIndicators.increaseRightAnswersCounter();
// gameIndicators.increaseRightAnswersCounter();
// gameIndicators.increaseRightAnswersCounter();
// gameIndicators.increaseRightAnswersCounter();
// gameIndicators.increaseRightAnswersCounter();
// gameIndicators.increaseFinesCounter();
// gameIndicators.increaseFinesCounter();
