import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';

class Modal extends NodeBuilder {
  guestButton: ButtonBuilder;

  onAuth!: () => void;

  constructor(parentNode: HTMLElement) {
    super({
      parentNode,
      tagName: 'div',
      className: 'modal',
      content: '<h2>Добро пожаловать!</h2>',
    });
    this.guestButton = new ButtonBuilder({
      parentNode: this.node,
      className: 'guest',
      content: 'Гость',
    });
    this.node.addEventListener('click', (): void => {
      this.node.remove();
      this.onAuth();
    });
  }
}

export default Modal;
