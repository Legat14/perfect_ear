import ViewsController from '../controllers/viewsController';
import FooterView from './footer';
import HeaderView from './header';
import Guest from './modal/guest';
import Modal from './modal/modal';

class MainPageCreator {
  header: HeaderView;

  modalwindow: Modal;

  guest: Guest;

  viewsController: ViewsController;

  footer: FooterView;

  onAuth!: () => void;

  constructor() {
    this.header = new HeaderView(document.body);
    this.modalwindow = new Modal(document.body);
    this.guest = new Guest(this.modalwindow.node);
    this.viewsController = new ViewsController(document.body);
    this.footer = new FooterView(document.body);

    this.guest.node.addEventListener('click', (): void => {
      this.modalwindow.remove();
      this.onAuth();
    });
  }
}

export default MainPageCreator;
