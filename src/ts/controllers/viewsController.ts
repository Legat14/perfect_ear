import NodeBuilder from '../helpers/node-builder';
import Router from '../router/router';
import FooterView from '../views/footer';
import FortepianoView from '../views/fortepiano';
import HeaderView from '../views/header';
import EarTrainingView from '../views/ear-training-page';
import RhythmTrainingView from '../views/rhythm-training-page';
import MainMenuView from '../views/main-menu';
import UserSettingsView from '../views/user-settings';
import IntervalComparisonView from '../views/games/interval/interval-comparison';
import GameRoundsController from './game-cycle/game-rounds';
import IntervalComparison from './games/interval/interval-comparison';
import GamesLoader from './game-cycle/games-loader';
// import TheoryPageView from '../views/theory-page';

class ViewsController extends NodeBuilder {
  mainMenu: MainMenuView;

  header: HeaderView | undefined;

  footer: FooterView | undefined;

  private router: Router;

  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'field' });

    this.mainMenu = new MainMenuView();
    const earTraining = new EarTrainingView();
    const rhythmTraining = new RhythmTrainingView();
    const fortepiano = new FortepianoView();
    const userConfig = new UserSettingsView();
    // const theory = new TheoryPageView();

    this.router = new Router(this.node, [
      ['', this.mainMenu.node],
      ['/ear-training', earTraining.node],
      ['/rhythm-training', rhythmTraining.node],
      ['/fortepiano', fortepiano.node],
      ['/user-settings', userConfig.node],
      // ['/theory', theory.node],
    ]);

    /**
     * @todo Вынести это куда-то.
     */
    const gamesLoader = new GamesLoader('../../../data/rounds.json');
    const intervalCompPage = new GameRoundsController();
    intervalCompPage.load(
      gamesLoader,
      'intervals',
      'interval-comparison',
      IntervalComparison,
      IntervalComparisonView,
    ).then(() => {
      this.router.add('/ear-training/interval-comparison', intervalCompPage.view.node);
    });
  }

  init() {
    this.router.init('');
  }
}

export default ViewsController;
