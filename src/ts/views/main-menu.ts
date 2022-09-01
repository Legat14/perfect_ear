import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';
import UserDayStatisticView from './user-day-statistic';

class MainMenuView extends NodeBuilder<HTMLElement> {
  public userDayStatistic: UserDayStatisticView;

  constructor() {
    super({ parentNode: null, className: 'main-menu' });

    new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__games-btn button',
      content:
        '<img src="assets/img/interval.png" alt="Тренировка Слуха">Тренировка слуха',
    }).node.onclick = () => {
      window.location.hash = '#/ear-training';
    };

    new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__games-btn button',
      content:
        '<img src="assets/img/rhythm.png" alt="Тренировка Ритма">Тренировка ритма',
    }).node.onclick = () => {
      window.location.hash = '#/rhythm-training';
    };

    new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__fortepiano-btn button',
      content: '<img src="assets/img/piano.png" alt="Фортепиано">Фортепиано',
    }).node.onclick = () => {
      window.location.hash = '#/fortepiano';
    };

    this.userDayStatistic = new UserDayStatisticView(this.node);

    new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__theory-btn button',
      content: '<img src="assets/img/theory.png" alt="Теория">Теория',
    }).node.onclick = () => {
      window.location.hash = '#/theory';
    };

    new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__user-stats-btn button',
      content: '<img src="assets/img/user-settings.png" alt="Статистика">Статистика',
    }).node.onclick = () => {
      window.location.hash = '#/user-stats';
    };

    new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__user-setting-btn button',
      content: '<img src="assets/img/user-settings.png" alt="Настройки">Настройки',
    }).node.onclick = () => {
      window.location.hash = '#/user-settings';
    };
  }
}

export default MainMenuView;
