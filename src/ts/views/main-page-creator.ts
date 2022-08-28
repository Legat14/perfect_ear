import ViewsController from '../controllers/viewsController';
import FooterView from './footer';
import HeaderView from './header';

const header = new HeaderView(document.body);
const viewsController = new ViewsController(document.body);
viewsController.init();
const footer = new FooterView(document.body);

console.log(header);
console.log(viewsController);
console.log(footer);

export default viewsController;
