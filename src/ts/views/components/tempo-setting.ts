import Translation from '../../constants/translation';
import { LangEmitter, TempoEmitter } from '../../controllers/emitters/lang-emitter';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';
import SettingModal from './setting-modal';

class TempoSetting extends ButtonBuilder {
  public state: { language: keyof typeof Languages, tempo: number };

  constructor(
    parentNode: HTMLElement,
    state: { language: keyof typeof Languages, tempo: number },
  ) {
    super({
      parentNode,
      className: 'user-settings__change-btn',
      content: (
        `<img src="assets/img/rhythm.png" alt="Установить ритм"> ${Translation.setTempoBtn[state.language]}`),
    });

    this.state = state;

    const setting = new NodeBuilder<HTMLInputElement>({
      parentNode: null,
      tagName: 'input',
      className: 'language-input',
      attributes: {
        type: 'range',
        min: 30,
        max: 200,
        value: `${state.tempo}`,
      },
    }).node;

    const label = new NodeBuilder<HTMLLabelElement>({
      parentNode: null,
      tagName: 'label',
      className: 'language-input-label',
      content: `${state.tempo} BPM`,
    }).node;

    setting.oninput = () => {
      label.innerHTML = `${setting.value} BPM`;
    };

    const settingModal = new SettingModal(
      null,
      Translation.tempoSettingModalTitle[state.language],
      state.language,
      [setting, label],
    );

    this.node.onclick = () => parentNode.append(settingModal.node);

    settingModal.onUpdate = (
      value: string,
    ) => TempoEmitter.emit(Number(value));

    LangEmitter.add((lang) => {
      settingModal.header.innerHTML = Translation.tempoSettingModalTitle[lang];
      this.node.innerHTML = (
        `<img src="assets/img/rhythm.png" alt="Установить ритм"> ${Translation.setTempoBtn[lang]}`);
    });
  }
}

export default TempoSetting;
