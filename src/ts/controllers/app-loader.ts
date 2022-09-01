import MainPageCreator from '../views/main-page-creator';
import Modal from '../views/modal/modal';
import GuestEnterHandler from './user-data-handlers/guest-enter-handler';
import UserDataHandler from './user-data-handlers/user-data-handler';
import UserDayStatisticHandler from './user-data-handlers/user-day-statistic-handler';

class AppLoader {
  userDataHandler: UserDataHandler | null;

  userDayStatisticHandler: UserDayStatisticHandler | null;

  view: MainPageCreator;

  modalWindow: Modal | null;

  guestEnterHandler: GuestEnterHandler;

  constructor() {
    this.view = new MainPageCreator();
    const { mainMenu } = this.view.viewsController;
    this.guestEnterHandler = new GuestEnterHandler();
    this.userDataHandler = null;
    this.userDayStatisticHandler = null;
    this.modalWindow = null;
    if (this.guestEnterHandler.perfectEarGuestUser) {
      this.userDataHandler = new UserDataHandler();
      // расскоментировать для обнуления профиля в LocalStorage
      // userDataHandler.clearUserProfileData();
      this.view.viewsController.init(); // TODO: Вынести повторяющуюся часть в отдельный метод
      this.userDayStatisticHandler = new UserDayStatisticHandler(
        (this.userDataHandler as UserDataHandler).userProfile,
        mainMenu.userDayStatistic.userDayStatisticCounters,
      );
    } else {
      this.modalWindow = new Modal(document.body);
      this.modalWindow.onAuth = () => {
        this.userDataHandler = new UserDataHandler();
        // расскоментировать для обнуления профиля в LocalStorage
        // userDataHandler.clearUserProfileData();
        this.view.viewsController.init();
        this.userDayStatisticHandler = new UserDayStatisticHandler(
          (this.userDataHandler as UserDataHandler).userProfile,
          mainMenu.userDayStatistic.userDayStatisticCounters,
        );
        this.guestEnterHandler.saveGuestUserEnterToSessionStorage();
      };
    }
  }
}

const appLoader = new AppLoader();

export default appLoader;
