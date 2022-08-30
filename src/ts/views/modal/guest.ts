import ButtonBuilder from '../../helpers/button-builder';

class Guest extends ButtonBuilder {
  constructor(parentNode: HTMLElement) {
    super({
      parentNode,
      className: 'guest',
      content: 'Гость',
    });
  }
}

export default Guest;
