import { headerLang } from '../models/translation';
import MainPageCreator from '../views/main-page-creator';
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
    this.view = new MainPageCreator(headerLang[this.userDataHandler.userConfig.getLanguage()]);
    this.guestEnterHandler = new GuestEnterHandler();

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
      new Modal(document.body).onAuth = () => {
        this.init();
        this.guestEnterHandler.saveGuestUserEnterToSessionStorage();
      };
    }

    const changeLangBtn = this.view.viewsController.userSettings.changeLangBtn.node;
    changeLangBtn.addEventListener('click', (): void => {
      this.userDataHandler.toggleLang();
    });

    const resetUserDataBtn = this.view.viewsController.userSettings.resetStatsBtn.node;
    resetUserDataBtn.addEventListener('click', (): void => { // TODO: Добавить всплывающее предупреждение о потере данных
      this.userDataHandler.clearUserProfileData();
      this.userDayStatisticHandler.refreshCounters(
        this.userDataHandler.userConfig.getDayExercisesGoal(),
        this.userDataHandler.userConfig.getDayScoreGoal(),
        this.userDataHandler.userConfig.getDayTimeGoal(),
      );
      this.userStatisticHandler.refreshCounters();
    });

    const saveDayGoalBtn = this.view.viewsController.userSettings.saveDayGoalsBtn.node;
    saveDayGoalBtn.addEventListener('click', (): void => {
      this.userConfigHandler.saveDayGoalInputsValues();
      this.userDataHandler.saveConfigDataToLocalStorage();
      this.userDayStatisticHandler.refreshCounters(
        this.userDataHandler.userConfig.getDayExercisesGoal(),
        this.userDataHandler.userConfig.getDayScoreGoal(),
        this.userDataHandler.userConfig.getDayTimeGoal(),
      );
    });

    this.userDayStatisticHandler.refreshCounters(
      this.userDataHandler.userConfig.getDayExercisesGoal(),
      this.userDataHandler.userConfig.getDayScoreGoal(),
      this.userDataHandler.userConfig.getDayTimeGoal(),
    );
    this.addRefreshEvent();
    this.userAchievementsHandler.testAllAchievements();
  }

  private init() {
    this.view.viewsController.init();
    this.view.viewsController.renderPages({ profile: this.userDataHandler.userProfile });
  }

  private addRefreshEvent() {
    document.addEventListener('ongameend', () => {
      this.userDayStatisticHandler.refreshCounters(
        this.userDataHandler.userConfig.getDayExercisesGoal(),
        this.userDataHandler.userConfig.getDayScoreGoal(),
        this.userDataHandler.userConfig.getDayTimeGoal(),
      );
      this.userAchievementsHandler.testAllAchievements();
    });
  }
} // TODO: Добавить механизм замены картинок достижений обратно на неполученные

const appLoader = new AppLoader();

export default appLoader;
