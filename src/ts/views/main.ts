import NodeBuilder from '../helpers/node-builder';

class MainView extends NodeBuilder {
  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'main' });

    const mainH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'This is the main',
    });

    console.log(mainH2);
  }
}

export default MainView;
