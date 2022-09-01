import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';

class EarTrainingView extends NodeBuilder {
  constructor() {
    super({ parentNode: null, className: 'ear-training' });

    const backButton = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    }).node;

    backButton.onclick = (): void => {
      window.location.hash = '#';
    };

    new NodeBuilder({
      parentNode: this.node,
      tagName: 'header',
      className: 'ear-header',
      content: '<div><h2 class="ear-header__h2">Тренировка слуха</h2></div>',
    }).node.prepend(backButton);

    /**
     * @todo Добавить картинки ко всем кнопкам.
     */
    this.createSection('Упражнения на интервалы', [
      [{
        parentNode: null,
        className: 'ear-training__btn ear-training__theory training-btn theory-btn',
        content: 'Теория',
      }],
      [{
        parentNode: null,
        className: 'ear-training__btn ear-training__game training-btn',
        content: 'Сравнение интервалов',
      }],
    ]);

    this.createSection('Упражнения на гаммы', [
      [{
        parentNode: null,
        className: 'ear-training__btn ear-training__theory training-btn theory-btn',
        content: 'Теория',
      }],
      [{
        parentNode: null,
        className: 'ear-training__btn ear-training__game training-btn',
        content: 'Определение ладов',
      }],
    ]);

    this.createSection('Упражнения на аккорды', [
      [{
        parentNode: null,
        className: 'ear-training__btn ear-training__theory training-btn theory-btn',
        content: 'Теория',
      }],
      [{
        parentNode: null,
        className: 'ear-training__btn ear-training__game training-btn',
        content: 'Определение аккордов',
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
      className: 'ear-section section',
      content: `<h2 class="ear-section__section-title section-title">${sectionName}</h2>`,
    }).node;
    sectionButtons.map(
      ([button]) => new ButtonBuilder({ ...button, parentNode: container }),
    );
  }
}

export default EarTrainingView;
