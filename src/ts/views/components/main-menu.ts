import Translation from '../../constants/translation';
import LangEmitter from '../../controllers/emitters/lang-emitter';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';
import UserDayStatisticView from './user-day-statistic';

class MainMenuView extends NodeBuilder<HTMLElement> {
  public userDayStatistic: UserDayStatisticView;

  constructor(state: keyof typeof Languages = 'RUS') {
    super({ parentNode: null, className: 'main-menu' });

    this.userDayStatistic = new UserDayStatisticView(this.node, state);

    const earBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__games-btn button',
      content:
        `<img src="assets/img/ear.png" alt="Тренировка Слуха">${Translation.mainMenuEarTraining[state]}`,
    }).node;
    earBtn.onclick = () => {
      window.location.hash = '#/ear-training';
    };
    LangEmitter.add((lang) => {
      earBtn.innerHTML = `<img src="assets/img/ear.png" alt="Тренировка Слуха">${Translation.mainMenuEarTraining[lang]}`;
    });

    const rhythmBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__games-btn button',
      content:
        `<img src="assets/img/rhythm.png" alt="Тренировка Ритма">${Translation.mainMenuRhythmTraining[state]}`,
    }).node;
    rhythmBtn.onclick = () => {
      window.location.hash = '#/rhythm-training';
    };
    LangEmitter.add((lang) => {
      rhythmBtn.innerHTML = `<img src="assets/img/rhythm.png" alt="Тренировка Ритма">${Translation.mainMenuRhythmTraining[lang]}`;
    });

    const fortepianoBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__fortepiano-btn button',
      content: `<img src="assets/img/piano.png" alt="Фортепиано">${Translation.mainMenuFortepiano[state]}`,
    }).node;
    fortepianoBtn.onclick = () => {
      window.location.hash = '#/fortepiano';
    };
    LangEmitter.add((lang) => {
      fortepianoBtn.innerHTML = `<img src="assets/img/piano.png" alt="Фортепиано">${Translation.mainMenuFortepiano[lang]}`;
    });

    const theoryBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__theory-btn button',
      content: `<img src="assets/img/theory.png" alt="Теория">${Translation.mainMenuTheory[state]}`,
    }).node;
    theoryBtn.onclick = () => {
      window.location.hash = '#/theory';
    };
    LangEmitter.add((lang) => {
      theoryBtn.innerHTML = `<img src="assets/img/theory.png" alt="Теория">${Translation.mainMenuTheory[lang]}`;
    });

    const statsBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__user-stats-btn button',
      content: `<img src="assets/img/statistic.png" alt="Статистика">${Translation.mainMenuStatistics[state]}`,
    }).node;
    statsBtn.onclick = () => {
      window.location.hash = '#/user-stats';
    };
    LangEmitter.add((lang) => {
      statsBtn.innerHTML = `<img src="assets/img/statistic.png" alt="Статистика">${Translation.mainMenuStatistics[lang]}`;
    });

    const settingsBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__user-setting-btn button',
      content: `<img src="assets/img/user-settings.png" alt="Настройки">${Translation.mainMenuSettings[state]}`,
    }).node;
    settingsBtn.onclick = () => {
      window.location.hash = '#/user-settings';
    };
    LangEmitter.add((lang) => {
      settingsBtn.innerHTML = `<img src="assets/img/user-settings.png" alt="Настройки">${Translation.mainMenuSettings[lang]}`;
    });
  }
}

export default MainMenuView;
