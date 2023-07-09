import { LangEmitter } from '../../controllers/emitters/emitters';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';

class TheorySection extends NodeBuilder {
  constructor(
    content: Record<keyof typeof Languages, string>,
    state: keyof typeof Languages,
  ) {
    super({ parentNode: null });

    const backBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    }).node;

    const contentNode = new NodeBuilder({
      parentNode: this.node,
      className: 'theory__theory-container',
      content: content[state],
    }).node;

    backBtn.onclick = () => {
      window.location.hash = window.location.hash.split('/').slice(0, -1).join('/');
    };

    LangEmitter.add((language) => {
      contentNode.innerHTML = content[language];
    });
  }
}

export default TheorySection;
