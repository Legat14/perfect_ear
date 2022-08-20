import NodeBuilder from '../helpers/node-builder';

class HeaderView extends NodeBuilder {
  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'header' });

    const headerH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'This is the header',
    });

    console.log(headerH2);
  }
}

export default HeaderView;
