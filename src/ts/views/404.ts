import NodeBuilder from '../helpers/node-builder';

class PageNotFound extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: '404' });

    const intervalGameH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: '404 - Nothing is found',
    });

    console.log(intervalGameH2);
  }
}

export default PageNotFound;
