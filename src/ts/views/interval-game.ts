import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';

class IntervalGameView extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'interval-game-field' });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'interval-game__back-to-main-btn',
      content: '←',
    });

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });
  }
}

export default IntervalGameView;
