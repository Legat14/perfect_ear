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

    this.userStatisticHandler = new UserStatisticHandler({
      userProfile: this.userDataHandler.userProfile,
      userConfig: this.userDataHandler.userConfig,
      userDayStatisticCounters: userStats.statisticCounters,
    });

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

    userSettings.onSettingsReset = (): void => {
      this.userDataHandler.resetUserConfig();
    }; // TODO: Сделать обновление инпутов при сбросе настроек

    userSettings.onStatsReset = (): void => {
      // TODO: Добавить всплывающее предупреждение о потере данных
      this.userDataHandler.clearUserProfileData();
      this.refreshCounters();
      this.userStatisticHandler.refreshCounters();
    };

    userSettings.onSaveDayGoals = (): void => {
      this.userConfigHandler.saveDayGoalInputsValues();
      this.userDataHandler.saveConfigDataToLocalStorage();
      this.refreshCounters();
    };

    this.refreshCounters();
    this.addRefreshEventOnGameEnd();
    this.addRefreshEventOnSettingsChange();
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

  private addRefreshEventOnGameEnd() {
    document.addEventListener('ongameend', () => {
      this.refreshCounters();
      this.userAchievementsHandler.testAllAchievements();
    });
  }

  private addRefreshEventOnSettingsChange() {
    document.addEventListener('onchangesettings', () => {
      this.refreshCounters();
    });
  }
}

const appLoader = new AppLoader();

export default appLoader;
