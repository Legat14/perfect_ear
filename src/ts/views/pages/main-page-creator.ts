import ViewsController from '../../controllers/views-controller';
import { IHeaderLangType } from '../../models/translation';
import FooterView from '../components/footer';
import HeaderView from '../components/header';

class MainPageCreator {
  header: HeaderView;

  viewsController: ViewsController;

  footer: FooterView;

  onAuth!: () => void;

  constructor(langPack: IHeaderLangType) {
    this.header = new HeaderView(document.body, langPack);
    this.viewsController = new ViewsController(document.body);
    this.footer = new FooterView(document.body);
  }
}

export default MainPageCreator;
