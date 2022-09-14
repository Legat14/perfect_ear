import Translation from '../../constants/translation';
import LangEmitter from '../../controllers/emitters/lang-emitter';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';

class PageNotFound extends NodeBuilder {
  constructor(state: keyof typeof Languages) {
    super({ parentNode: null, className: 'page404' });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'page404__back-to-main-btn',
      content: Translation.backToMenuBtn[state],
    });

    LangEmitter.add((language) => {
      backToMainBtn.node.innerHTML = Translation.backToMenuBtn[language];
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
