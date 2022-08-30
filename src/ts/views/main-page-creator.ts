import ViewsController from '../controllers/viewsController';
import FooterView from './footer';
import HeaderView from './header';
import Guest from './modal/guest';
import Modal from './modal/modal';

const header = new HeaderView(document.body);
const modalwindow = new Modal(document.body);
const guest = new Guest(modalwindow.node);
const viewsController = new ViewsController(document.body);
viewsController.init();
const footer = new FooterView(document.body);

guest.node.addEventListener('click', (): void => {
  modalwindow.remove();
});

console.log(header);
console.log(modalwindow);
console.log(guest);
console.log(viewsController);
console.log(footer);

export default viewsController;
