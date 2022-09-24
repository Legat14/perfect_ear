import Translation from '../../constants/translation';
import { LangEmitter, VolumeEmitter } from '../../controllers/emitters/lang-emitter';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';
import SettingModal from './setting-modal';
import VolumeConverter from '../../helpers/volume-converter';

class VolumeSetting extends ButtonBuilder {
  public state: { language: keyof typeof Languages, volume: number };

  constructor(
    parentNode: HTMLElement,
    state: { language: keyof typeof Languages, volume: number },
  ) {
    super({
      parentNode,
      className: 'user-settings__change-btn',
      content: (
        `<img src="assets/img/ear.png" alt="Сменить громкость"> ${Translation.changeVolumeBtn[state.language]}`),
    });

    this.state = state;

    const setting = new NodeBuilder<HTMLInputElement>({
      parentNode: null,
      tagName: 'input',
      className: 'language-input',
      attributes: {
        type: 'range',
        step: '1',
        value: `${VolumeConverter.fromDecibels(state.volume)}`,
      },
    }).node;

    const settingModal = new SettingModal(
      null,
      Translation.volumeSettingModalTitle[state.language],
      state.language,
      [setting, new NodeBuilder<HTMLLabelElement>({ parentNode: null }).node],
    );

    this.node.onclick = () => parentNode.append(settingModal.node);

    settingModal.onUpdate = (
      value: string,
    ) => VolumeEmitter.emit(VolumeConverter.toDecibels(value));

    LangEmitter.add((lang) => {
      settingModal.header.innerHTML = Translation.volumeSettingModalTitle[lang];
      this.node.innerHTML = (
        `<img src="assets/img/ear.png" alt="Сменить громкость"> ${Translation.changeVolumeBtn[lang]}`);
    });
  }
}

export default VolumeSetting;
