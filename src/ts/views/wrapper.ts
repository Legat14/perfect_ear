import NodeBuilder from '../helpers/node-builder';

class WrapperView extends NodeBuilder {
  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'wrapper' });

    const wrapperH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'This is the wraper',
    });

    console.log(wrapperH2);
  }
}

export default WrapperView;
