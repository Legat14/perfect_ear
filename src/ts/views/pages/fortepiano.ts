import { PIANO_SOUND } from '../../constants/constants';
import LangPack from '../../constants/translation';
import LangEmitter from '../../controllers/emitters/lang-emitter';
import Sound from '../../controllers/sound';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';
import VirtualPiano from '../piano/advanced-piano';

class FortepianoView extends NodeBuilder {
  private piano: VirtualPiano;

  onDestroy!: () => void;

  constructor(state: keyof typeof Languages = 'RUS') {
    super({ parentNode: null, className: 'fortepiano-field' });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    });

    const header = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'piano__head',
    }).node;

    const h2 = new NodeBuilder({
      parentNode: header,
      tagName: 'h2',
      className: 'piano__head_h2',
      content: LangPack[state]['15'],
    }).node;

    const descr = new NodeBuilder({
      parentNode: header,
      tagName: 'p',
      className: 'piano__descr_p',
      content: LangPack[state]['25'],
    }).node;

    LangEmitter.add((content) => {
      h2.innerHTML = content['15'];
      descr.innerHTML = content['25'];
    });

    this.piano = new VirtualPiano(this.node, new Sound(PIANO_SOUND));

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });
  }
}

export default FortepianoView;
