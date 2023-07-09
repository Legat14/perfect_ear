import Translation from '../../constants/translation';
import { SettingsEmitter, LangEmitter } from '../../controllers/emitters/emitters';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';
import SettingModal from './setting-modal';

class LanguageSetting extends ButtonBuilder {
  public state: keyof typeof Languages;

  private setting1: HTMLInputElement;

  private label1: HTMLLabelElement;

  private setting2: HTMLInputElement;

  private label2: HTMLLabelElement;

  private lang: NodeBuilder<HTMLElement>;

  constructor(
    parentNode: HTMLElement,
    state: keyof typeof Languages = 'RUS',
  ) {
    super({
      parentNode,
      className: 'user-settings__change-btn',
      content: Translation.changeLangBtn[state],
    });

    this.state = state;

    this.lang = new NodeBuilder({
      parentNode,
      tagName: 'div',
      className: 'user-settings__stats-lang',
      content: Translation.langOptions[state],
    });

    [
      this.setting1,
      this.label1,
      this.setting2,
      this.label2,
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

    const updateLangView = (langState: keyof typeof Languages) => {
      [this.setting1.checked, this.setting2.checked] = [
        langState === Languages[0],
        langState === Languages[1],
      ];
    };

    updateLangView(this.state);

    const settingModal = new SettingModal(
      null,
      Translation.langSettingModalTitle[state],
      state,
      [this.setting1, this.label1],
      [this.setting2, this.label2],
    );

    this.node.onclick = () => parentNode.append(settingModal.node);

    settingModal.onUpdate = (
      value: string,
    ) => LangEmitter.emit(value as keyof typeof Languages);

    LangEmitter.add((lang) => {
      this.node.innerHTML = Translation.changeLangBtn[lang];
      this.lang.node.innerHTML = Translation.langOptions[lang];
      settingModal.header.innerHTML = Translation.langSettingModalTitle[lang];
    });

    SettingsEmitter.add(() => {
      updateLangView(this.state);
      LangEmitter.emit(this.state);
    });
  }
}

export default LanguageSetting;
