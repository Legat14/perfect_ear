import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';
import SettingModal from './setting-modal';

class LanquageSetting extends ButtonBuilder {
  public state: Languages;

  private lang: NodeBuilder<HTMLElement>;

  constructor(parentNode: HTMLElement, state: keyof typeof Languages = 'RUS') {
    super({
      parentNode,
      className: 'user-settings__change-btn',
      content: 'Сменить язык',
    });

    this.state = Languages[state];

    this.lang = new NodeBuilder({
      parentNode,
      tagName: 'div',
      className: 'user-settings__stats-lang',
      content: 'Русский',
    });

    const setting1 = new NodeBuilder<HTMLInputElement>({
      parentNode: null,
      tagName: 'input',
      className: 'language-input',
      attributes: {
        name: 'lang',
        type: 'radio',
        id: Languages[0],
        value: Languages[0],
      },
    }).node;

    const label1 = new NodeBuilder<HTMLLabelElement>({
      parentNode: null,
      tagName: 'label',
      className: 'language-input__label',
      attributes: {
        for: Languages[0],
      },
      content: 'русский',
    }).node;

    const setting2 = new NodeBuilder<HTMLInputElement>({
      parentNode: null,
      tagName: 'input',
      className: 'language-input',
      attributes: {
        type: 'radio',
        name: 'lang',
        id: Languages[1],
        value: Languages[1],
      },
    }).node;

    const label2 = new NodeBuilder<HTMLLabelElement>({
      parentNode: null,
      tagName: 'label',
      className: 'language-input__label',
      attributes: {
        for: Languages[1],
      },
      content: 'english',
    }).node;

    this.node.onclick = () => new SettingModal(
      parentNode,
      'Выберите язык',
      [setting1, label1],
      [setting2, label2],
    );
  }
}

export default LanquageSetting;
