import MainPageCreator from '../views/pages/main-page-creator';
import Modal from '../views/modal/modal';
import GuestEnterHandler from './user-data-handlers/guest-enter-handler';
import UserAchievementsHandler from './user-data-handlers/user-achievements-handler';
import UserConfigHandler from './user-data-handlers/user-config-handler';
import UserDataHandler from './user-data-handlers/user-data-handler';
import UserDayStatisticHandler from './user-data-handlers/user-day-statistic-handler';
import UserStatisticHandler from './user-data-handlers/user-statistic-handler';

class AppLoader {
  private userDataHandler: UserDataHandler;

  public userStatisticHandler!: UserStatisticHandler;

  public userConfigHandler!: UserConfigHandler;

  public userDayStatisticHandler!: UserDayStatisticHandler;

  public userAchievementsHandler!: UserAchievementsHandler;

  private view: MainPageCreator;

  private guestEnterHandler: GuestEnterHandler;

  constructor() {
    this.userDataHandler = new UserDataHandler();
    this.guestEnterHandler = new GuestEnterHandler();

    this.view = new MainPageCreator(
      this.userDataHandler.userConfig,
    );

    const { userStats } = this.view.viewsController;

    this.userStatisticHandler = new UserStatisticHandler(
      this.userDataHandler.userProfile,
      userStats.statisticCounters,
    );

    const { userSettings } = this.view.viewsController;

    this.userConfigHandler = new UserConfigHandler(
      this.userDataHandler.userConfig,
      userSettings.dayGoalsInputs,
    );

    const { mainMenu } = this.view.viewsController;

    this.userDayStatisticHandler = new UserDayStatisticHandler(
      this.userDataHandler.userProfile,
      this.userDataHandler.userConfig,
      mainMenu.userDayStatistic.userDayStatisticCounters,
    );

    const { userAchievements } = this.view.viewsController;

    this.userAchievementsHandler = new UserAchievementsHandler(
      this.userDataHandler.userProfile,
      userAchievements.achievementImgs,
    );

    if (this.guestEnterHandler.perfectEarGuestUser) {
      this.init();
    } else {
      new Modal(
        document.body,
        this.userDataHandler.userConfig,
      ).onAuth = () => {
        this.init();
        this.guestEnterHandler.saveGuestUserEnterToSessionStorage();
      };
    }

    userSettings.onReset = (): void => {
      // TODO: Добавить всплывающее предупреждение о потере данных
      this.userDataHandler.clearUserProfileData();
      this.refreshCounters();
      this.userStatisticHandler.refreshCounters();
    };

    userSettings.onSave = (): void => {
      this.userConfigHandler.saveDayGoalInputsValues();
      this.userDataHandler.saveConfigDataToLocalStorage();
      this.refreshCounters();
    };

    this.refreshCounters();
    this.addRefreshEvent();
    this.userAchievementsHandler.testAllAchievements();
  }

  private init() {
    this.view.viewsController.renderGamePages({
      profile: this.userDataHandler.userProfile,
      config: this.userDataHandler.userConfig,
    });
    this.view.viewsController.init();
  }

  private refreshCounters() {
    this.userDayStatisticHandler.refreshCounters(
      this.userDataHandler.userConfig.getDayExercisesGoal(),
      this.userDataHandler.userConfig.getDayScoreGoal(),
      this.userDataHandler.userConfig.getDayTimeGoal(),
    );
  }

  private addRefreshEvent() {
    document.addEventListener('ongameend', () => {
      this.refreshCounters();
      this.userAchievementsHandler.testAllAchievements();
    });
  }
}

const appLoader = new AppLoader();

export default appLoader;
