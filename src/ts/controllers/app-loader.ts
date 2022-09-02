import MainPageCreator from '../views/main-page-creator';
import Modal from '../views/modal/modal';
import GuestEnterHandler from './user-data-handlers/guest-enter-handler';
import UserDataHandler from './user-data-handlers/user-data-handler';
import UserDayStatisticHandler from './user-data-handlers/user-day-statistic-handler';
import UserStatisticHandler from './user-data-handlers/user-statistic-handler';

class AppLoader {
  private userDataHandler: UserDataHandler;

  public userStatisticHandler!: UserStatisticHandler;

  public userDayStatisticHandler!: UserDayStatisticHandler;

  private view: MainPageCreator;

  private guestEnterHandler: GuestEnterHandler;

  constructor() {
    this.view = new MainPageCreator();

    this.guestEnterHandler = new GuestEnterHandler();
    this.userDataHandler = new UserDataHandler();
    // расскоментировать для обнуления профиля в LocalStorage
    // this.userDataHandler.clearUserProfileData();

    const { userStats } = this.view.viewsController;

    this.userStatisticHandler = new UserStatisticHandler(
      this.userDataHandler.userProfile,
      userStats.statisticCounters,
    );

    const { mainMenu } = this.view.viewsController;

    this.userDayStatisticHandler = new UserDayStatisticHandler(
      this.userDataHandler.userProfile,
      mainMenu.userDayStatistic.userDayStatisticCounters,
    );

    if (this.guestEnterHandler.perfectEarGuestUser) {
      this.init();
    } else {
      new Modal(document.body).onAuth = () => {
        this.init();
        this.guestEnterHandler.saveGuestUserEnterToSessionStorage();
      };
    }
  }

  private init() {
    this.view.viewsController.init();
  }
}

const appLoader = new AppLoader();

export default appLoader;
