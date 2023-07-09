import ViewsController from '../../controllers/views-controller';
import UserConfig from '../../models/user-config';
import FooterView from '../components/footer';
import HeaderView from '../components/header';

class MainPageCreator {
  header: HeaderView;

  viewsController: ViewsController;

  footer: FooterView;

  onAuth!: () => void;

  constructor(config: UserConfig) {
    const language = config.getLanguage();

    this.header = new HeaderView(
      document.body,
      language,
    );
    this.viewsController = new ViewsController(
      document.body,
      config,
    );
    this.footer = new FooterView(document.body);
  }
}

export default MainPageCreator;
