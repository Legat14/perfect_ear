import MainPageCreator from '../views/main-page-creator';
import UserDataHandler from './user-data-handlers/user-data-handler';
import UserDayStatisticHandler from './user-data-handlers/user-day-statistic-handler';

class AppLoader {
  userDataHandler: UserDataHandler;

  userDayStatisticHandler: UserDayStatisticHandler;

  view: MainPageCreator;

  constructor() {
    this.userDataHandler = new UserDataHandler();
    // расскоментировать для обнуления профиля в LocalStorage
    // userDataHandler.clearUserProfileData();
    this.view = new MainPageCreator();
    /**
     * @todo Сделать событие загрузки данных или показывать модалку, пока его не произойдет.
     */
    this.view.onAuth = () => this.view.viewsController.init();
    const { mainMenu } = this.view.viewsController;

    this.userDayStatisticHandler = new UserDayStatisticHandler(
      this.userDataHandler.userProfile,
      mainMenu.userDayStatistic.userDayStatisticCounters,
    );
  }
}

const appLoader = new AppLoader();

export default appLoader;
