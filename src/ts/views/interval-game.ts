import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';

class IntervalGameView extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'interval-game-field' });

    const intervalGameH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'This is the interval game field',
    });

    console.log(intervalGameH2);

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'interval-game__back-to-main-btn',
      content: 'Вернуться в главное меню',
    });

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });
  }
}

export default IntervalGameView;
