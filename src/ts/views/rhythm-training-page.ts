import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';

/**
 * @todo RhythmTrainingView
 */
class RhythmTrainingView extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'rhythm-training' });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    });

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });

    this.createSection('Упражнения на ритм', [
      [{
        parentNode: null,
        className: 'ear-training__btn ear-training__game training-btn theory-btn',
        content: 'Теория',
      }],
    ]);
  }

  private createSection(
    sectionName: string,
    sectionButtons: ConstructorParameters<typeof ButtonBuilder>[],
  ): void {
    const container = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h3',
      className: 'rhythm-section section',
      content: `<h2 class="rhythm-section__section-title section-title">${sectionName}</h2>`,
    }).node;
    sectionButtons.map(
      ([button]) => new ButtonBuilder({ ...button, parentNode: container }),
    );
  }
}

export default RhythmTrainingView;
