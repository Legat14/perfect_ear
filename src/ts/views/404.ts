import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';

class PageNotFound extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: '404' });

    const intervalGameH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: '404 - Nothing is found',
    });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: '404__back-to-main-btn',
      content: 'Перейти в главное меню',
    });

    console.log(intervalGameH2);

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });
  }
}

export default PageNotFound;
