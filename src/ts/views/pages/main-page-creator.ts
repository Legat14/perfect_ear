import ViewsController from '../../controllers/views-controller';
import { Languages } from '../../types/data-types';
import FooterView from '../components/footer';
import HeaderView from '../components/header';

class MainPageCreator {
  header: HeaderView;

  viewsController: ViewsController;

  footer: FooterView;

  onAuth!: () => void;

  constructor(state: Languages) {
    this.header = new HeaderView(
      document.body,
      Languages[state] as keyof typeof Languages,
    );
    this.viewsController = new ViewsController(
      document.body,
      Languages[state] as keyof typeof Languages,
    );
    this.footer = new FooterView(document.body);
  }
}

export default MainPageCreator;
