import LangPack from '../../constants/translation';
import LangEmitter from '../../controllers/emitters/lang-emitter';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';
import SettingModal from './setting-modal';

class LanquageSetting extends ButtonBuilder {
  public state: keyof typeof Languages;

  private lang: NodeBuilder<HTMLElement>;

  constructor(
    parentNode: HTMLElement,
    state: keyof typeof Languages = 'RUS',
  ) {
    super({
      parentNode,
      className: 'user-settings__change-btn',
      content: LangPack[state]['0'],
    });

    this.state = state;

    this.lang = new NodeBuilder({
      parentNode,
      tagName: 'div',
      className: 'user-settings__stats-lang',
      content: LangPack[state]['1'],
    });

    const [
      setting1,
      label1,
      setting2,
      label2,
    ] = [
      new NodeBuilder<HTMLInputElement>({
        parentNode: null,
        tagName: 'input',
        className: 'language-input',
        attributes: {
          name: 'lang',
          type: 'radio',
          id: Languages[0],
          value: Languages[0],
        },
      }).node,
      new NodeBuilder<HTMLLabelElement>({
        parentNode: null,
        tagName: 'label',
        className: 'language-input__label',
        attributes: {
          for: Languages[0],
        },
        content: 'русский',
      }).node,
      new NodeBuilder<HTMLInputElement>({
        parentNode: null,
        tagName: 'input',
        className: 'language-input',
        attributes: {
          type: 'radio',
          name: 'lang',
          id: Languages[1],
          value: Languages[1],
        },
      }).node,
      new NodeBuilder<HTMLLabelElement>({
        parentNode: null,
        tagName: 'label',
        className: 'language-input__label',
        attributes: {
          for: Languages[1],
        },
        content: 'english',
      }).node];

    [setting1.checked, setting2.checked] = [
      state === Languages[0],
      state === Languages[1],
    ];

    const settingModal = new SettingModal(
      null,
      LangPack[state]['3'],
      state,
      [setting1, label1],
      [setting2, label2],
    );

    this.node.onclick = () => parentNode.append(settingModal.node);

    settingModal.onUpdate = (
      value: string,
    ) => LangEmitter.emit(LangPack[value as keyof typeof Languages]);

    LangEmitter.add((content) => {
      this.node.innerHTML = content['0'];
      this.lang.node.innerHTML = content['1'];
      settingModal.header.innerHTML = content['3'];
    });
  }
}

export default LanquageSetting;
