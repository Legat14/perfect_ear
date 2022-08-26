import UserProfile from '../../models/user-profile';
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
}

const userDataHandler = new UserDataHandler();
userDataHandler.userProfile.increaseDayExercises(3);
userDataHandler.userProfile.increaseDayExercises(2);
userDataHandler.userProfile.increaseDayScore(450);
userDataHandler.userProfile.increaseDayTime(40000);
userDataHandler.userProfile.increaseTotalScore(1000);
userDataHandler.userProfile.increaseTotalExercises(5);
userDataHandler.userProfile.increaseTotalTime(50000);
userDataHandler.clearLocalStorageData();

console.log(userDataHandler);
