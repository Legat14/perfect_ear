import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';

class TheorySection extends NodeBuilder {
  constructor(content: string) {
    super({ parentNode: null, content: `<div class="theory__theory-container">${content}</div>` });

    const backBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    }).node;
    this.node.prepend(backBtn);
    backBtn.onclick = () => {
      window.location.hash = window.location.hash.split('/').slice(0, -1).join('/');
    };
  }
}

export default TheorySection;
