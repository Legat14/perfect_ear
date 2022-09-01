import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';

/**
 * @tofo Theory page.
 */
class TheoryPageView extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'theory-list' });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    });

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });
  }
}

export default TheoryPageView;
