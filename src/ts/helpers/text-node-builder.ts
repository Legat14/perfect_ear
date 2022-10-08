class TextNodeBuilder {
  public node: Text;

  constructor({
    parentNode,
    content = '',
  }: {
    parentNode: HTMLElement | null;
    content?: string;
  }) {
    const element = document.createTextNode(content);

    if (parentNode) parentNode.append(element);

    this.node = element as Text;
  }

  public remove(): void {
    this.node.remove();
  }
}

export default TextNodeBuilder;
