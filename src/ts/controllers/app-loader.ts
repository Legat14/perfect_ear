import viewsController from '../views/main-page-creator';
import UserDataHandler from './user-data-handlers/user-data-handler';
import UserDayStatisticHandler from './user-data-handlers/user-day-statistic-handler';
import UserEnterDataHandler from './user-data-handlers/user-enter-data-handler';

class AppLoader {
  userDataHandler: UserDataHandler;

  userDayStatisticHandler: UserDayStatisticHandler;

  userEnterDataHandler: UserEnterDataHandler;

  constructor() {
    this.userDataHandler = new UserDataHandler();
    // расскоментировать для обнуления профиля в LocalStorage
    // userDataHandler.clearUserProfileData();
    this.userDayStatisticHandler = new UserDayStatisticHandler(
      this.userDataHandler.userProfile,
      viewsController.mainMenu.userDayStatistic.userDayStatisticCounters,
    );
    this.userEnterDataHandler = new UserEnterDataHandler(
      viewsController.mainMenu.registrationForm.inputs,
    );
  }
}

const appLoader = new AppLoader();

export default appLoader;
