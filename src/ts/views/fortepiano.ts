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

    const sound = new Sound({
      voice: {
        urls: {
          A1: 'A1.mp3',
          A2: 'A2.mp3',
          A3: 'A3.mp3',
        },
        baseUrl: 'https://tonejs.github.io/audio/salamander/',
      },
      volume: 10,
      tactDuration: 250,
    });

    const piano = new Piano(this.node, sound);
    console.log(piano);

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });
  }
}

export default FortepianoView;
