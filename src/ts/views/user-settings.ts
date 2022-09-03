import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';

class UserSettingsView extends NodeBuilder {
  backToMainBtn: ButtonBuilder;

  userSettingsHeader: NodeBuilder;

  resetStatsBtn: ButtonBuilder;

  constructor() {
    super({ parentNode: null, className: 'user-settings' });

    this.backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    });

    this.backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });

    this.userSettingsHeader = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'Настройки',
      className: 'user-settings__header',
    });

    this.resetStatsBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__reset-stats-btn',
      content: 'Сбросить статистику',
    });
  }
}

export default UserSettingsView;
