import NodeBuilder from '../../helpers/node-builder';

class Preloader extends NodeBuilder {
  constructor(parentNode: HTMLElement) {
    super({
      parentNode,
      tagName: 'div',
      className: 'preloader',
      content: '<img src="../public/assets/img/preloader.gif" alt="Preloader">',
    });
  }
}

export default Preloader;
