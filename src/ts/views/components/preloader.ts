import NodeBuilder from '../../helpers/node-builder';

class Preloader extends NodeBuilder {
  constructor(parentNode: HTMLElement | null) {
    super({
      parentNode,
      tagName: 'div',
      className: 'preloader',
      content: '<img src="../assets/img/preloader.gif" alt="Preloader">',
    });
  }
}

export default Preloader;
