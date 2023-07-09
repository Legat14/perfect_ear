import NodeBuilder from '../helpers/node-builder';
import Router from '../router/router';
import FooterView from '../views/components/footer';
import HeaderView from '../views/components/header';
import MainMenuView from '../views/components/main-menu';
import EarTrainingView from '../views/pages/ear-training-page';
import FortepianoView from '../views/pages/fortepiano';
import RhythmTrainingView from '../views/pages/rhythm-training-page';
import UserSettingsView from '../views/pages/user-settings';
import UserStatsView from '../views/pages/user-stats';
import GameRoundsController from './game-cycle/game-rounds';
import GamesLoader from './game-cycle/games-loader';

import { IChordRound, IIntervalRound, IScaleRound } from '../types/game-types';

import UserConfig from '../models/user-config';
import UserProfile from '../models/user-profile';
import UserAchievementsView from '../views/pages/user-achievements';
import TheoryPageView from '../views/pages/theory-page';

import scaleOptions from '../views/games/scale/scale-options';
import intervalOptions from '../views/games/interval/interval-options';
import chordOptions from '../views/games/chord/chord-options';

import {
  interval, gamma, lad, accords, rhythm,
} from '../types/theory-pages';
import TheorySection from '../views/components/theory-section';

import { Languages } from '../types/data-types';

class ViewsController extends NodeBuilder {
  mainMenu: MainMenuView;

  userStats: UserStatsView;

  userSettings: UserSettingsView;

  userAchievements: UserAchievementsView;

  header: HeaderView | undefined;

  footer: FooterView | undefined;

  private router: Router;

  earTraining: EarTrainingView;

  constructor(parentNode: HTMLElement, config: UserConfig) {
    super({ parentNode, className: 'field' });

    const state = config.getLanguage();

    this.mainMenu = new MainMenuView(state);
    this.earTraining = new EarTrainingView(state);
    const rhythmTraining = new RhythmTrainingView(state);
    const fortepiano = new FortepianoView(config);
    this.userStats = new UserStatsView(state);
    this.userSettings = new UserSettingsView(config);
    this.userAchievements = new UserAchievementsView(state);
    const theory = new TheoryPageView(state);

    this.router = new Router(
      this.node,
      [
        ['', this.mainMenu.node],
        ['/ear-training', this.earTraining.node],
        ['/rhythm-training', rhythmTraining.node],
        ['/fortepiano', fortepiano.node],
        ['/user-stats', this.userStats.node],
        ['/user-stats/achievements', this.userAchievements.node],
        ['/user-settings', this.userSettings.node],
        ['/theory', theory.node],
      ],
      state,
    );

    this.renderTheoryPages(state);
  }

  public init() {
    this.router.init('');
  }

  public renderGamePages({ profile, config }: { profile: UserProfile, config: UserConfig }) {
    const gamesLoader = new GamesLoader('../../../data/rounds.json');
    const state = {
      language: config.getLanguage(),
      volume: config.getVolume(),
      tempo: config.getTempo(),
    };

    const intervalCompPage = new GameRoundsController<IIntervalRound>();
    intervalCompPage
      .load(gamesLoader, ...intervalOptions, profile.getExercisesResult(), state)
      .then(() => {
        this.router.add(
          '/ear-training/interval-comparison',
          intervalCompPage.view.node,
        );
      });

    const scaleIdentPage = new GameRoundsController<IScaleRound>();
    scaleIdentPage
      .load(gamesLoader, ...scaleOptions, profile.getExercisesResult(), state)
      .then(() => {
        this.router.add(
          '/ear-training/scale-identification',
          scaleIdentPage.view.node,
        );
      });

    const chordIdentPage = new GameRoundsController<IChordRound>();
    chordIdentPage
      .load(gamesLoader, ...chordOptions, profile.getExercisesResult(), state)
      .then(() => {
        this.router.add(
          '/ear-training/chord-identification',
          chordIdentPage.view.node,
        );
      });
  }

  private renderTheoryPages(state: keyof typeof Languages) {
    (
      [
        ['/theory/intervals', new TheorySection(interval, state).node],
        ['/theory/scales', new TheorySection(gamma, state).node],
        ['/theory/modes', new TheorySection(lad, state).node],
        ['/theory/chords', new TheorySection(accords, state).node],
        ['/theory/rhythm', new TheorySection(rhythm, state).node],
      ] as [string, HTMLElement][]
    ).forEach(([url, node]) => {
      this.router.add(url, node);
    });
  }
}

export default ViewsController;
