import NodeBuilder from '../../helpers/node-builder';

class FooterView extends NodeBuilder {
  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'footer' });

    const footerH2 = new NodeBuilder({
      parentNode: this.node,
      tagName: 'p',
      content: 'Github: <a href="https://github.com/legat14" target="_blank">Ivan Zotov</a>, <a href="https://github.com/OOOO0000OOO0000OOO" target="_blank">Ksenia Neustroeva</a>, <a href="https://github.com/andreichaika" target="_blank">Andrei Chaika</a><a href="https://rs.school/js/"><img src="assets/img/rs_school_js.svg" alt="RSSchool JS"></a>',
      className: 'footer__p',
    });

    console.log(footerH2);
  }
}

export default FooterView;
