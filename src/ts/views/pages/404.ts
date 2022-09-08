import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';

class PageNotFound extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'page404' });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'page404__back-to-main-btn',
      content: 'Перейти в главное меню',
    });

    const intervalGameH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'img',
      attributes: { src: 'assets/img/404.png' },
    });

    console.log(intervalGameH2);

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });
  }
}

export default PageNotFound;
