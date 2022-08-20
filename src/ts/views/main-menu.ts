import NodeBuilder from '../helpers/node-builder';

class MainMenuView extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'main-menu' });

    const mainMenuH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'This is the main menu',
    });

    console.log(mainMenuH2);
  }
}

export default MainMenuView;
