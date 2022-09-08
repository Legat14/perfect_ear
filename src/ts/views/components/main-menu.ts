import LangPack from '../../constants/translation';
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
        `<img src="assets/img/ear.png" alt="Тренировка Слуха">${LangPack[state]['13']}`,
    }).node;
    earBtn.onclick = () => {
      window.location.hash = '#/ear-training';
    };
    LangEmitter.add((content) => {
      earBtn.innerHTML = `<img src="assets/img/ear.png" alt="Тренировка Слуха">${content['13']}`;
    });

    const rhythmBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__games-btn button',
      content:
        `<img src="assets/img/rhythm.png" alt="Тренировка Ритма">${LangPack[state]['14']}`,
    }).node;
    rhythmBtn.onclick = () => {
      window.location.hash = '#/rhythm-training';
    };
    LangEmitter.add((content) => {
      rhythmBtn.innerHTML = `<img src="assets/img/rhythm.png" alt="Тренировка Ритма">${content['14']}`;
    });

    const fortepianoBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__fortepiano-btn button',
      content: `<img src="assets/img/piano.png" alt="Фортепиано">${LangPack[state]['15']}`,
    }).node;
    fortepianoBtn.onclick = () => {
      window.location.hash = '#/fortepiano';
    };
    LangEmitter.add((content) => {
      fortepianoBtn.innerHTML = `<img src="assets/img/piano.png" alt="Фортепиано">${content['15']}`;
    });

    const theoryBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__theory-btn button',
      content: `<img src="assets/img/theory.png" alt="Теория">${LangPack[state]['16']}`,
    }).node;
    theoryBtn.onclick = () => {
      window.location.hash = '#/theory';
    };
    LangEmitter.add((content) => {
      theoryBtn.innerHTML = `<img src="assets/img/theory.png" alt="Теория">${content['16']}`;
    });

    const statsBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__user-stats-btn button',
      content: `<img src="assets/img/statistic.png" alt="Статистика">${LangPack[state]['17']}`,
    }).node;
    statsBtn.onclick = () => {
      window.location.hash = '#/user-stats';
    };
    LangEmitter.add((content) => {
      statsBtn.innerHTML = `<img src="assets/img/statistic.png" alt="Статистика">${content['17']}`;
    });

    const settingsBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__user-setting-btn button',
      content: `<img src="assets/img/user-settings.png" alt="Настройки">${LangPack[state]['6']}`,
    }).node;
    settingsBtn.onclick = () => {
      window.location.hash = '#/user-settings';
    };
    LangEmitter.add((content) => {
      settingsBtn.innerHTML = `<img src="assets/img/user-settings.png" alt="Настройки">${content['6']}`;
    });
  }
}

export default MainMenuView;
