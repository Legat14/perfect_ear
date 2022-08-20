import NodeBuilder from '../helpers/node-builder';
import Router from '../router/router';
import FooterView from '../views/footer';
import FortepianoView from '../views/fortepiano';
import HeaderView from '../views/header';
import IntervalGameView from '../views/interval-game';
import MainMenuView from '../views/main-menu';
import WrapperView from '../views/wrapper';

class ViewsController extends NodeBuilder {
  wrapper: WrapperView | undefined;

  header: HeaderView | undefined;

  footer: FooterView | undefined;

  private router: Router;

  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'field' });

    const mainMenu = new MainMenuView();
    const intervalGame = new IntervalGameView();
    const fortepiano = new FortepianoView();

    this.router = new Router(this.node, [
      ['', mainMenu.node],
      ['interval-game', intervalGame.node],
      ['fortepiano', fortepiano.node],
    ]);
  }

  init() {
    this.router.init('');
  }
}

export default ViewsController;
