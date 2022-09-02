import NodeBuilder from '../helpers/node-builder';
import Router from '../router/router';
import FooterView from '../views/footer';
import FortepianoView from '../views/fortepiano';
import HeaderView from '../views/header';
import EarTrainingView from '../views/ear-training-page';
import RhythmTrainingView from '../views/rhythm-training-page';
import MainMenuView from '../views/main-menu';
import UserSettingsView from '../views/user-settings';
import UserStatsView from '../views/user-stats';
// import TheoryPageView from '../views/theory-page';

class ViewsController extends NodeBuilder {
  mainMenu: MainMenuView;

  userStats: UserStatsView;

  header: HeaderView | undefined;

  footer: FooterView | undefined;

  private router: Router;

  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'field' });

    this.mainMenu = new MainMenuView();
    const earTraining = new EarTrainingView();
    const rhythmTraining = new RhythmTrainingView();
    const fortepiano = new FortepianoView();
    this.userStats = new UserStatsView();
    const userSettings = new UserSettingsView();
    // const theory = new TheoryPageView();

    this.router = new Router(this.node, [
      ['', this.mainMenu.node],
      ['/ear-training', earTraining.node],
      ['/rhythm-training', rhythmTraining.node],
      ['/fortepiano', fortepiano.node],
      ['/user-stats', this.userStats.node],
      ['/user-settings', userSettings.node],
      // ['/theory', theory.node],
    ]);
  }

  init() {
    this.router.init('');
  }
}

export default ViewsController;
