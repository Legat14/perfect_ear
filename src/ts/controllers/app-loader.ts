import viewsController from '../views/main-page-creator';
import UserDataHandler from './user-data-handlers/user-data-handler';
import UserDayStatisticHandler from './user-data-handlers/user-day-statistic-handler';

class AppLoader {
  userDataHandler: UserDataHandler;

  userDayStatisticHandler: UserDayStatisticHandler;

  constructor() {
    this.userDataHandler = new UserDataHandler();
    // расскоментировать для обнуления профиля в LocalStorage
    // userDataHandler.clearUserProfileData();
    this.userDayStatisticHandler = new UserDayStatisticHandler(
      this.userDataHandler.userProfile,
      viewsController.mainMenu.userDayStatistic.userDayStatisticCounters,
    );
  }
}

const appLoader = new AppLoader();

export default appLoader;
