import NodeBuilder from '../../helpers/node-builder';

class Modal extends NodeBuilder {
  constructor(parentNode: HTMLElement) {
    super({
      parentNode,
      tagName: 'div',
      className: 'modal',
      content: '<h2>Добро пожаловать!</h2>',
    });
  }
}

export default Modal;
