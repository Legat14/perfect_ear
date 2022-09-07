import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';

class TheoryPageView extends NodeBuilder {
  private sectionContainer: HTMLElement;

  constructor() {
    super({ parentNode: null, className: 'theory-list' });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    });

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });

    this.sectionContainer = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'theory-main_section',
    }).node;

    this.createSection('Теория', [
      [[{
        parentNode: null,
        className: 'theory__theory-btn theory-btn button',
        content: 'Введение в интервалы',
      }],
      '/theory/intervals',
      ],
      [[{
        parentNode: null,
        className: 'theory__theory-btn theory-btn button',
        content: 'Введение в гаммы',
      }],
      '/theory/scales',
      ],
      [[{
        parentNode: null,
        className: 'theory__theory-btn theory-btn button',
        content: 'Лады',
      }],
      '/theory/modes',
      ],
      [[{
        parentNode: null,
        className: 'theory__theory-btn theory-btn button',
        content: 'Аккорды',
      }],
      '/theory/chords',
      ],
      [[{
        parentNode: null,
        className: 'theory__theory-btn theory-btn button',
        content: 'Ритм',
      }],
      '/theory/rhythm',
      ],
    ]);
  }

  private createSection(
    sectionName: string,
    sectionButtons: [ConstructorParameters<typeof ButtonBuilder>, string][],
  ): void {
    const container = new NodeBuilder({
      parentNode: this.sectionContainer,
      tagName: 'div',
      className: 'theory-section section',
      content: `<h2 class="theory-section__section-title section-title">${sectionName}</h2>`,
    }).node;
    sectionButtons.map(
      ([[options], url]) => {
        const button = new ButtonBuilder({ ...options, parentNode: container });
        button.node.onclick = () => {
          window.location.hash = `#${url}`;
        };
        return button;
      },
    );
  }
}

export default TheoryPageView;
