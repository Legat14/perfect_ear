import NodeBuilder from '../helpers/node-builder';

class FortepianoView extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'fortepiano-field' });

    const fortepianoH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'This is the fortepiano',
    });

    console.log(fortepianoH2);
  }
}

export default FortepianoView;
