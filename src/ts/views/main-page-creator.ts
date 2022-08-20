import ViewsController from '../controllers/viewsController';
import FooterView from './footer';
import HeaderView from './header';
import MainView from './main';
import WrapperView from './wrapper';

const header = new HeaderView(document.body);
const main = new MainView(document.body);
const wrapper = new WrapperView(main.node);
const viewsController = new ViewsController(wrapper.node);
viewsController.init();
const footer = new FooterView(document.body);

console.log(header);
console.log(main);
console.log(wrapper);
console.log(viewsController);
console.log(footer);
