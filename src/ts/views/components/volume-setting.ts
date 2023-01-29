import Translation from '../../constants/translation';
import { SettingsEmitter, LangEmitter, VolumeEmitter } from '../../controllers/emitters/lang-emitter';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import UserConfig from '../../models/user-config';
import { Languages } from '../../types/data-types';
import SettingModal from './setting-modal';

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

    const calculateValue = (volume: number): string => (volume * 2 + 100).toString();

    const setting = new NodeBuilder<HTMLInputElement>({
      parentNode: null,
      tagName: 'input',
      className: 'language-input',
      attributes: {
        type: 'range',
        step: '1',
        value: calculateValue(state.volume),
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
    ) => VolumeEmitter.emit((Number(value) - 100) / 2);

    LangEmitter.add((lang) => {
      settingModal.header.innerHTML = Translation.volumeSettingModalTitle[lang];
      this.node.innerHTML = (
        `<img src="assets/img/ear.png" alt="Сменить громкость"> ${Translation.changeVolumeBtn[lang]}`);
    });

    SettingsEmitter.add((userConfig: UserConfig) => {
      setting.value = calculateValue(userConfig.getVolume());
      settingModal.onUpdate(setting.value);
    });
  }
}

export default VolumeSetting;
