import NodeBuilder from '../helpers/node-builder';
import { IHeaderLangType } from '../models/translation';

class HeaderView extends NodeBuilder {
  langPack: object;

  constructor(parentNode: HTMLElement, langPack: IHeaderLangType) {
    super({ parentNode, className: 'header' });
    this.langPack = langPack;

    const headerH1 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h1',
      className: 'header__h1',
      content: `${langPack.header}`,
    });

    console.log(headerH1);
  }
}

export default HeaderView;
