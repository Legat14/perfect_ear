import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import SettingModal from './setting-modal';

class VolumeSetting extends ButtonBuilder {
  public state: number;

  constructor(parentNode: HTMLElement, state = 100) {
    super({
      parentNode,
      className: 'user-settings__change-btn',
      content: '<img src="assets/img/ear.png" alt="Сменить громкость"> Сменить громкость',
    });

    this.state = state;

    const setting = new NodeBuilder<HTMLInputElement>({
      parentNode: null,
      tagName: 'input',
      className: 'language-input',
      attributes: {
        type: 'range',
        value: `${state}`,
      },
    }).node;

    const settingModal = new SettingModal(
      null,
      'Установите громкость',
      [setting, new NodeBuilder<HTMLLabelElement>({ parentNode: null }).node],
    );

    this.node.onclick = () => parentNode.append(settingModal.node);
  }
}

export default VolumeSetting;
