import LangPack from '../../constants/translation';
import LangEmitter from '../../controllers/emitters/lang-emitter';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';
import SettingModal from './setting-modal';

class VolumeSetting extends ButtonBuilder {
  public state: keyof typeof Languages;

  constructor(parentNode: HTMLElement, state: keyof typeof Languages = 'RUS') {
    super({
      parentNode,
      className: 'user-settings__change-btn',
      content: (
        `<img src="assets/img/ear.png" alt="Сменить громкость"> ${LangPack[state]['5']}`),
    });

    this.state = state;

    const setting = new NodeBuilder<HTMLInputElement>({
      parentNode: null,
      tagName: 'input',
      className: 'language-input',
      attributes: {
        type: 'range',
        value: `${100}`,
      },
    }).node;

    const settingModal = new SettingModal(
      null,
      LangPack[state]['4'],
      state,
      [setting, new NodeBuilder<HTMLLabelElement>({ parentNode: null }).node],
    );

    this.node.onclick = () => parentNode.append(settingModal.node);

    LangEmitter.add((content) => {
      settingModal.header.innerHTML = content['4'];
      this.node.innerHTML = (
        `<img src="assets/img/ear.png" alt="Сменить громкость"> ${content['5']}`);
    });
  }
}

export default VolumeSetting;
