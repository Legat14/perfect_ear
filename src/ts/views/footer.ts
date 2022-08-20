import NodeBuilder from '../helpers/node-builder';

class FooterView extends NodeBuilder {
  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'footer' });

    const footerH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'This is the footer',
    });

    console.log(footerH2);
  }
}

export default FooterView;