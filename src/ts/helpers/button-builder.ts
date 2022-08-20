import NodeBuilder from './node-builder';

class ButtonBuilder extends NodeBuilder<HTMLButtonElement> {
  constructor({
    parentNode,
    className = '',
    content = '',
  }: {
    parentNode: HTMLElement | null;
    className?: string;
    content?: string;
  }) {
    super({
      parentNode,
      tagName: 'button',
      className,
      content,
      attributes: { type: 'button' },
    });
  }
}

export default ButtonBuilder;
