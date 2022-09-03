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
import GameRoundsController from './game-cycle/game-rounds';
import GamesLoader from './game-cycle/games-loader';

import IntervalComparison from './games/interval/interval-comparison';
import IntervalComparisonView from '../views/games/interval/interval-comparison';
import ScaleIdentification from './games/scale/scale-identification';
import ScaleIdentificationView from '../views/games/scale/scale-identification';
import ChordIdentification from './games/chord/chord-identification';
import ChordIdentificationView from '../views/games/chord/chord-identification';
import { IChordRound, IIntervalRound, IScaleRound } from '../types/game-types';
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

    /**
     * @todo Вынести это куда-то.
     */
    const gamesLoader = new GamesLoader('../../../data/rounds.json');

    const intervalCompPage = new GameRoundsController<IIntervalRound>();
    intervalCompPage.load(
      gamesLoader,
      'intervals',
      'interval-comparison',
      'Сравнение интервалов',
      IntervalComparison,
      IntervalComparisonView,
    ).then(() => {
      this.router.add('/ear-training/interval-comparison', intervalCompPage.view.node);
    });

    const scaleIdentPage = new GameRoundsController<IScaleRound>();
    scaleIdentPage.load(
      gamesLoader,
      'scales',
      'scale-identification',
      'Определение ладов',
      ScaleIdentification,
      ScaleIdentificationView,
    ).then(() => {
      this.router.add('/ear-training/scale-identification', scaleIdentPage.view.node);
    });

    const chordIdentPage = new GameRoundsController<IChordRound>();
    chordIdentPage.load(
      gamesLoader,
      'chords',
      'chord-identification',
      'Определение аккордов',
      ChordIdentification,
      ChordIdentificationView,
    ).then(() => {
      this.router.add('/ear-training/chord-identification', chordIdentPage.view.node);
    });
  }

  init() {
    this.router.init('');
  }
}

export default ViewsController;
