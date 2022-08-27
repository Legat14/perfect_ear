import UserProfile from '../../models/user-profile';
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
        currentDay: guestUserData.currentDay,
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
        currentDay: new Date(),
        totalScore: 0,
        totalTime: 0,
        totalExercises: 0,
        intervalGameScore: 0,
        exercisesResult: [],
      });
    }
    this.addPageCloseEvent();
    this.addGameEndEvent();
    const tempResult = {}; // Эта переменная добавлена для проверки
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
      currentDay: this.userProfile.getCurrentDay(),
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

  clearLocalStorageData() {
    this.userProfile = new UserProfile({
      dayScore: 0,
      dayTime: 0,
      dayExercises: 0,
      currentDay: new Date(),
      totalScore: 0,
      totalTime: 0,
      totalExercises: 0,
      intervalGameScore: 0,
      exercisesResult: [],
    });
  }

  decomposeGameResult(gameResult: IGameResult) {
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
}

const userDataHandler = new UserDataHandler();
// расскоментировать для обнуления профиля в LocalStorage
// userDataHandler.clearLocalStorageData();

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
