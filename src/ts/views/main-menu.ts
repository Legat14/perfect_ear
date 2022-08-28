import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';
import UserDayStatisticView from './user-day-statistic';

class MainMenuView extends NodeBuilder<HTMLElement> {
  userDayStatistic: UserDayStatisticView;

  constructor() {
    super({ parentNode: null, className: 'main-menu' });

    this.userDayStatistic = new UserDayStatisticView(this.node);

    const intervalGameBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__interval-game-btn',
      content: 'Угадай интервал',
    });

    const fortepianoBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'main-menu__fortepiano-btn',
      content: 'Фортепиано',
    });

    // TODO: Добавить к действиям кнопок, например, запуск игры
    intervalGameBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#interval-game';
    });

    fortepianoBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#fortepiano';
    });
  }
}

export default MainMenuView;
