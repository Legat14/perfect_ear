import GameRoundsController from '../controllers/game-cycle/game-rounds';
import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';

class EarTrainingView extends NodeBuilder {
  category!: GameRoundsController;

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
    this.createSection(
      'Упражнения на интервалы',
      [
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__theory training-btn theory-btn',
          content: 'Теория',
        }],
        '/theory/intervals',
        ],
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__game training-btn',
          content: 'Сравнение интервалов',
        }],
        '/ear-training/interval-comparison'],
      ],
    );

    this.createSection('Упражнения на гаммы', [
      [[{
        parentNode: null,
        className: 'ear-training__btn ear-training__theory training-btn theory-btn',
        content: 'Теория',
      }],
      '/theory/scales',
      ],
      [[{
        parentNode: null,
        className: 'ear-training__btn ear-training__game training-btn',
        content: 'Определение ладов',
      }],
      '/ear-training/scale-identification',
      ],
    ]);

    this.createSection('Упражнения на аккорды', [
      [[{
        parentNode: null,
        className: 'ear-training__btn ear-training__theory training-btn theory-btn',
        content: 'Теория',
      }],
      '/theory/chords',
      ],
      [[{
        parentNode: null,
        className: 'ear-training__btn ear-training__game training-btn',
        content: 'Определение аккордов',
      }],
      '/ear-training/chord-identification',
      ],
    ]);
  }

  private createSection(
    sectionName: string,
    sectionButtons: [ConstructorParameters<typeof ButtonBuilder>, string][],
  ): void {
    const container = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h3',
      className: 'ear-section section',
      content: `<h2 class="ear-section__section-title section-title">${sectionName}</h2>`,
    }).node;
    sectionButtons.map(
      ([[options], url]) => {
        const button = new ButtonBuilder({ ...options, parentNode: container });
        button.node.onclick = () => {
          window.location.hash = '#';
          window.location.hash += url;
        };
        return button;
      },
    );
  }
}

export default EarTrainingView;
