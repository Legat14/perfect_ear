import LangPack from '../../constants/translation';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';

class Modal extends NodeBuilder {
  guestButton: ButtonBuilder;

  onAuth!: () => void;

  constructor(parentNode: HTMLElement, language: Languages) {
    super({
      parentNode,
      tagName: 'div',
      className: 'modal',
      content: `<h2>${LangPack[Languages[language] as keyof typeof Languages]['48']}</h2>`,
    });
    this.guestButton = new ButtonBuilder({
      parentNode: this.node,
      className: 'guest',
      content: LangPack[Languages[language] as keyof typeof Languages]['49'],
    });
    this.node.addEventListener('click', (): void => {
      this.node.remove();
      this.onAuth();
    });
  }
}

export default Modal;
