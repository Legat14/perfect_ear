import NodeBuilder from '../helpers/node-builder';

class FooterView extends NodeBuilder {
  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'footer' });

    const footerH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: '@ 2022. All rights reserved ',
      className: 'footer__h2',
    });

    console.log(footerH2);
  }
}

export default FooterView;
