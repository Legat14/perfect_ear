import NodeBuilder from "../helpers/node-builder";

const wrapper: HTMLElement | null = document.querySelector('.wrapper');
const mainPage: NodeBuilder<HTMLElement> = new NodeBuilder({
  parentNode: wrapper,
  tagName: 'div',
  className: 'interval-game-field',
});

new NodeBuilder({
  parentNode: mainPage.node,
  tagName: 'h2',
  content: 'This is the main page',
});

export default mainPage;
