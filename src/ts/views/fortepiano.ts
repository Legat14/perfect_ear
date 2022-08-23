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
          A0: 'A0.mp3',
          C1: 'C1.mp3',
          'D#1': 'Ds1.mp3',
          'F#1': 'Fs1.mp3',
          A1: 'A1.mp3',
          C2: 'C2.mp3',
          'F#2': 'Fs2.mp3',
          A2: 'A2.mp3',
          C3: 'C3.mp3',
          'D#3': 'Ds3.mp3',
          'F#3': 'Fs3.mp3',
          A3: 'A3.mp3',
          'F#4': 'Fs4.mp3',
          A4: 'A4.mp3',
          C5: 'C5.mp3',
          'D#5': 'Ds5.mp3',
          'F#5': 'Fs5.mp3',
          A5: 'A5.mp3',
          C6: 'C6.mp3',
          'D#6': 'Ds6.mp3',
          'F#6': 'Fs6.mp3',
          A6: 'A6.mp3',
          C7: 'C7.mp3',
          'D#7': 'Ds7.mp3',
          'F#7': 'Fs7.mp3',
          A7: 'A7.mp3',
          C8: 'C8.mp3',
        },
        release: 1,
        baseUrl: 'https://tonejs.github.io/audio/salamander/',
      },
      volume: 0,
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
