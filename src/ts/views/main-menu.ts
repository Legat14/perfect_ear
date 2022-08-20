import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';

class MainMenuView extends NodeBuilder<HTMLElement> {
  constructor() {
    super({ parentNode: null, className: 'main-menu' });

    const mainMenuH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'This is the main menu',
    });

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

    // Эти логи добавлены, чтобы линтер не ругался, что переменные не используются
    console.log(mainMenuH2);

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
