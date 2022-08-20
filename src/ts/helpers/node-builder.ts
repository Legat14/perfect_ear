class NodeBuilder<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor({
    parentNode,
    tagName = 'div',
    className = '',
    content = '',
    attributes,
  }: {
    parentNode: HTMLElement | null;
    tagName?: string;
    className?: string;
    content?: string;
    attributes?: object;
  }) {
    const element = document.createElement(tagName);

    element.className = className;
    element.innerHTML = content;

    if (parentNode) parentNode.append(element);
    if (attributes) {
      Object.entries(attributes).forEach((pair) => {
        element.setAttribute(...pair);
      });
    }

    this.node = element as NodeType;
  }

  public remove(): void {
    this.node.remove();
  }

  public clear(): void {
    this.node.innerHTML = '';
  }
}

export default NodeBuilder;
