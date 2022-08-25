import { PIANO_SOUND } from '../constants/constants';
import Sound from '../controllers/sound';
import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';
import Piano from './piano/piano';

class FortepianoView extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'fortepiano-field' });

    const fortepianoH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'This is the fortepiano',
    });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'fortepiano-field__back-to-main-btn',
      content: 'Вернуться в главное меню',
    });

    // Эти логи добавлены, чтобы линтер не ругался, что переменные не используются
    console.log(fortepianoH2);

    const piano = new Piano(this.node, new Sound(PIANO_SOUND));
    console.log(piano);

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });
  }
}

export default FortepianoView;
