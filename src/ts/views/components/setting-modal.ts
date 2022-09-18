import Translation from '../../constants/translation';
import { LangEmitter } from '../../controllers/emitters/lang-emitter';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';

class SettingModal extends NodeBuilder {
  public header: HTMLElement;

  public setting!: HTMLInputElement;

  public label!: HTMLLabelElement;

  public saveBtn: HTMLButtonElement;

  public onUpdate!: (value: string) => void;

  constructor(
    parentNode: HTMLElement | null,
    content: string,
    state: keyof typeof Languages = 'RUS',
    ...settings: [HTMLInputElement, HTMLLabelElement][]
  ) {
    super({
      parentNode,
      className: 'modal-settings user-settings__stats-settings',
    });

    const overlay = new NodeBuilder({ parentNode: null, className: 'overlay' });
    document.body.prepend(overlay.node);

    this.header = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h3',
      className: 'modal-header user-settings__stats-header',
      content,
    }).node;

    const divContainer = new NodeBuilder({ parentNode: this.node, className: 'settings-container' }).node;
    settings.forEach((setting: [HTMLInputElement, HTMLLabelElement]) => {
      new NodeBuilder({ parentNode: divContainer, className: 'setting-wrapper' }).node.append(...setting);
    });

    this.saveBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'user-settings__save-day-goals-btn',
      content: Translation.settingsSaveBtn[state],
    }).node;

    this.saveBtn.onclick = () => {
      [this.setting] = settings.length === 1
        ? settings[0]
        : settings.filter((
          [setting]: [HTMLInputElement, HTMLLabelElement],
        ) => setting.checked)[0];
      overlay.remove(); this.remove();
      this.onUpdate(this.setting.value);
    };

    LangEmitter.add((lang) => {
      this.saveBtn.innerHTML = Translation.settingsSaveBtn[lang];
    });
  }
}

export default SettingModal;
