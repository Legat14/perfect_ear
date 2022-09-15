import Translation from '../../constants/translation';
import LangEmitter from '../../controllers/emitters/lang-emitter';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';

class HeaderView extends NodeBuilder {
  constructor(parentNode: HTMLElement, state: keyof typeof Languages = 'RUS') {
    super({ parentNode, className: 'header' });

    const headerH1 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h1',
      className: 'header__h1',
      content: Translation.header[state],
    }).node;
    LangEmitter.add((lang) => { headerH1.innerHTML = Translation.header[lang]; });
  }
}

export default HeaderView;
