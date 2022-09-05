import { PIANO_SOUND } from '../constants/constants';
import Sound from '../controllers/sound';
import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';
import Piano from './piano/piano';

class FortepianoView extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'fortepiano-field' });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    });
    const fortepianoH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'piano__head',
      content: '<h2 class="piano__head_h2">Фортепиано</h2>',
    });
    console.log(fortepianoH2);
    const piano = new Piano(this.node, new Sound(PIANO_SOUND));
    console.log(piano);

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });
  }
}

export default FortepianoView;
