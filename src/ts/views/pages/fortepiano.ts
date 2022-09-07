import { PIANO_SOUND } from '../../constants/constants';
import Sound from '../../controllers/sound';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import VirtualPiano from '../piano/advanced-piano';

class FortepianoView extends NodeBuilder {
  private piano: VirtualPiano;

  onDestroy!: () => void;

  constructor() {
    super({ parentNode: null, className: 'fortepiano-field' });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    });

    new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'piano__head',
      content: '<h2 class="piano__head_h2">Фортепиано</h2>',
    }).node.innerHTML
      += '<p class="piano__descr_p">Играйте ноты, используя клавиатуру или нажимая на клавиши пианино мышью.</p>';

    this.piano = new VirtualPiano(this.node, new Sound(PIANO_SOUND));

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });
  }
}

export default FortepianoView;
