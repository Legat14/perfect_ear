import NodeBuilder from "../helpers/node-builder";

const wrapper: HTMLElement | null = document.querySelector('.wrapper');
const intervalGame: NodeBuilder<HTMLElement> = new NodeBuilder({
  parentNode: wrapper,
  tagName: 'div',
  className: 'interval-game-field',
});

new NodeBuilder({
  parentNode: intervalGame.node,
  tagName: 'h2',
  content: 'This is the interval game',
});

export default intervalGame;
