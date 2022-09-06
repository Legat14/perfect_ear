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

import { IChordRound, IIntervalRound, IScaleRound } from '../types/game-types';

import UserProfile from '../models/user-profile';
import UserAchievementsView from '../views/user-achievements';
import TheoryPageView from '../views/theory-page';

import scaleOptions from '../views/games/scale/scale-options';
import intervalOptions from '../views/games/interval/interval-options';
import chordOptions from '../views/games/chord/chord-options';

import interval from '../views/theory/interval/interval.html';
import gamma from '../views/theory/gamma/gamma.html';
import accords from '../views/theory/accords/accords.html';
import lad from '../views/theory/lad/lad.html';
import rhythm from '../views/theory/rhythm/rhythm.html';
import TheorySection from '../views/theory-section';

class ViewsController extends NodeBuilder {
  mainMenu: MainMenuView;

  userStats: UserStatsView;

  userSettings: UserSettingsView;

  userAchievements: UserAchievementsView;

  header: HeaderView | undefined;

  footer: FooterView | undefined;

  private router: Router;

  earTraining: EarTrainingView;

  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'field' });

    this.mainMenu = new MainMenuView();
    this.earTraining = new EarTrainingView();
    const rhythmTraining = new RhythmTrainingView();
    const fortepiano = new FortepianoView();
    this.userStats = new UserStatsView();
    this.userSettings = new UserSettingsView();
    this.userAchievements = new UserAchievementsView();
    const theory = new TheoryPageView();

    this.router = new Router(this.node, [
      ['', this.mainMenu.node],
      ['/ear-training', this.earTraining.node],
      ['/rhythm-training', rhythmTraining.node],
      ['/fortepiano', fortepiano.node],
      ['/user-stats', this.userStats.node],
      ['/user-stats/achievements', this.userAchievements.node],
      ['/user-settings', this.userSettings.node],
      ['/theory', theory.node],
    ]);
  }

  public init() {
    this.router.init('');
  }

  public renderGamePages({ profile }: { profile: UserProfile }) {
    const gamesLoader = new GamesLoader('../../../data/rounds.json');

    const intervalCompPage = new GameRoundsController<IIntervalRound>();
    intervalCompPage
      .load(gamesLoader, ...intervalOptions, profile.getExercisesResult())
      .then(() => {
        this.router.add(
          '/ear-training/interval-comparison',
          intervalCompPage.view.node,
        );
      });

    const scaleIdentPage = new GameRoundsController<IScaleRound>();
    scaleIdentPage
      .load(gamesLoader, ...scaleOptions, profile.getExercisesResult())
      .then(() => {
        this.router.add(
          '/ear-training/scale-identification',
          scaleIdentPage.view.node,
        );
      });

    const chordIdentPage = new GameRoundsController<IChordRound>();
    chordIdentPage
      .load(gamesLoader, ...chordOptions, profile.getExercisesResult())
      .then(() => {
        this.router.add(
          '/ear-training/chord-identification',
          chordIdentPage.view.node,
        );
      });
  }

  public renderTheoryPages() {
    (
      [
        ['/theory/intervals', new TheorySection(interval).node],
        ['/theory/scales', new TheorySection(gamma).node],
        ['/theory/modes', new TheorySection(lad).node],
        ['/theory/chords', new TheorySection(accords).node],
        ['/theory/rhythm', new TheorySection(rhythm).node],
      ] as [string, HTMLElement][]
    ).forEach(([url, node]) => {
      this.router.add(url, node);
    });
  }
}

export default ViewsController;
