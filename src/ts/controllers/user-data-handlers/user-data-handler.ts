import UserProfile from '../../models/user-profile';
import IDate from '../../types/date';
import IGameResult from '../../types/game-results';
import IUserProfileType from '../../types/user-profile-type';

class UserDataHandler {
  userProfile: UserProfile;

  constructor() { // TODO: после добавления сервера,
    // добавить метод получения данных и получать данные
    // в зависимости от него
    const guestUserData = this.getDataFromLocalStorage();
    if (guestUserData) {
      this.userProfile = new UserProfile({
        dayScore: guestUserData.dayScore,
        dayTime: guestUserData.dayTime,
        dayExercises: guestUserData.dayExercises,
        currentDate: guestUserData.currentDate,
        totalScore: guestUserData.totalScore,
        totalTime: guestUserData.totalTime,
        totalExercises: guestUserData.totalExercises,
        intervalGameScore: guestUserData.intervalGameScore,
        exercisesResult: guestUserData.exercisesResult,
      });
    } else {
      this.userProfile = new UserProfile({
        dayScore: 0,
        dayTime: 0,
        dayExercises: 0,
        currentDate: this.getCurrentDate(),
        totalScore: 0,
        totalTime: 0,
        totalExercises: 0,
        intervalGameScore: 0,
        exercisesResult: [],
      });
    }
    this.addPageCloseEvent();
    this.addGameEndEvent();
    this.setDayCheckInterval();
    const tempResult = {}; // Эта переменная добавлена для проверки TODO: потом удалить
    Object.assign(tempResult, this.userProfile);
    console.log(tempResult);
  }

  private getDataFromLocalStorage(): IUserProfileType {
    const guestUserDataJSON = localStorage.getItem('guestUserData');
    let guestUserData;
    if (guestUserDataJSON) {
      guestUserData = JSON.parse(guestUserDataJSON);
    }
    return guestUserData;
  }

  private saveDataToLocalStorage(): void {
    const guestUserData: IUserProfileType = {
      dayScore: this.userProfile.getDayScore(),
      dayTime: this.userProfile.getDayTime(),
      dayExercises: this.userProfile.getDayExercises(),
      currentDate: this.userProfile.getCurrentDate(),
      totalScore: this.userProfile.getTotalScore(),
      totalTime: this.userProfile.getTotalTime(),
      totalExercises: this.userProfile.getTotalExercises(),
      intervalGameScore: this.userProfile.getIntervalGameScore(),
      exercisesResult: this.userProfile.getExercisesResult(),
    };
    localStorage.setItem('guestUserData', JSON.stringify(guestUserData));
  }

  private addPageCloseEvent(): void {
    window.addEventListener('beforeunload', (): void => {
      this.saveDataToLocalStorage();
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

  private clearDayScore(): void {
    this.userProfile.setDayScore(0);
    this.userProfile.setDayTime(0);
    this.userProfile.setDayExercises(0);
    this.userProfile.setCurrentDate(this.userProfile.getCurrentDate());
  }

  private clearUserProfileData(): void {
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
      const userProfileDate = this.userProfile.getCurrentDate();
      console.log('currentDate: ', currentDate);
      console.log('userProfileDate: ', userProfileDate);
      if (currentDate.day !== userProfileDate.day || currentDate.year !== userProfileDate.year) {
        this.clearDayScore();
        console.log('reset day progress');
      }
    }, 60000);
  }
}

const userDataHandler = new UserDataHandler();
// расскоментировать для обнуления профиля в LocalStorage
// userDataHandler.clearUserProfileData();

export default userDataHandler;

// Для проверки скопировать приведенный ниже код в index.ts

// import userDataHandler from './ts/controllers/user-data-handlers/user-data-handler';
// import GameIndicators from './ts/controllers/game-cycle/game-indicators';

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

// console.log(userDataHandler);
