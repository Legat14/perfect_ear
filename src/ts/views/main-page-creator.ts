import ViewsController from '../controllers/viewsController';
import FooterView from './footer';
import HeaderView from './header';

class MainPageCreator {
  header: HeaderView;

  viewsController: ViewsController;

  footer: FooterView;

  onAuth!: () => void;

  constructor() {
    this.header = new HeaderView(document.body);
    this.viewsController = new ViewsController(document.body);
    this.footer = new FooterView(document.body);
  }
}

export default MainPageCreator;
