import { PIANO_SOUND } from '../../constants/constants';
import Translation from '../../constants/translation';
import { LangEmitter, VolumeEmitter } from '../../controllers/emitters/emitters';
import Sound from '../../controllers/sound';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import UserConfig from '../../models/user-config';
import VirtualPiano from '../piano/advanced-piano';

class FortepianoView extends NodeBuilder {
  private piano: VirtualPiano;

  onDestroy!: () => void;

  constructor(config: UserConfig) {
    super({ parentNode: null, className: 'fortepiano-field' });

    const language = config.getLanguage();
    const volume = config.getVolume();

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
      content: Translation.fortepianoPageHeader[language],
    }).node;

    const descr = new NodeBuilder({
      parentNode: header,
      tagName: 'p',
      className: 'piano__descr_p',
      content: Translation.fortepianoPageDescr[language],
    }).node;

    LangEmitter.add((lang) => {
      h2.innerHTML = Translation.fortepianoPageHeader[lang];
      descr.innerHTML = Translation.fortepianoPageDescr[lang];
    });

    this.piano = new VirtualPiano(this.node, new Sound(
      { ...PIANO_SOUND, volume },
    ));

    VolumeEmitter.add((newVolume) => {
      this.piano.setVolume(newVolume);
    });

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });
  }
}

export default FortepianoView;
