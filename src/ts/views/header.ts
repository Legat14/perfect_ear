import NodeBuilder from '../helpers/node-builder';

class HeaderView extends NodeBuilder {
  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'header' });

    const headerH1 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h1',
      className: 'header__h1',
      content: 'Perfect ear',
    });

    console.log(headerH1);
  }
}

export default HeaderView;
