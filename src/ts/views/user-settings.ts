import NodeBuilder from '../helpers/node-builder';

class UserSettingsView extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'user-settings' });

    const userSettingsH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'p',
      content: 'This is a user configs',
      className: 'user-settings__p',
    });

    console.log(userSettingsH2);
  }
}

export default UserSettingsView;
