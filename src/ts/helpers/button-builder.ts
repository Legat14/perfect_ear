import NodeBuilder from './node-builder';

class ButtonBuilder extends NodeBuilder<HTMLButtonElement> {
  constructor({
    parentNode,
    className = '',
    content = '',
    attributes,
  }: {
    parentNode: HTMLElement | null;
    className?: string;
    content?: string;
    attributes?: object;
  }) {
    super({
      parentNode,
      tagName: 'button',
      className,
      content,
      attributes: { ...(attributes || []), type: 'button' },
    });
  }
}

export default ButtonBuilder;
