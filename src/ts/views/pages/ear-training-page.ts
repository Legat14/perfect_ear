import LangPack from '../../constants/translation';
import LangEmitter from '../../controllers/emitters/lang-emitter';
import GameRoundsController from '../../controllers/game-cycle/game-rounds';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';

class EarTrainingView extends NodeBuilder {
  category!: GameRoundsController;

  sectionContainer: HTMLElement | null;

  constructor(state: keyof typeof Languages) {
    super({ parentNode: null, className: 'ear-training' });

    const header = new NodeBuilder({
      parentNode: this.node,
      tagName: 'header',
      className: 'ear-header',
    });

    const backButton = new ButtonBuilder({
      parentNode: header.node,
      className: 'field__back-btn',
      content: '←',
    }).node;

    backButton.onclick = (): void => {
      window.location.hash = '#';
    };

    const h2 = new NodeBuilder({
      parentNode: header.node,
      content: `<h2 class="ear-header__h2">${LangPack[state]['13']}</h2>`,
    });

    /**
     * @todo Добавить картинки ко всем кнопкам.
     */
    this.sectionContainer = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'ear-main_section',
    }).node;

    const [
      intervalSection,
      intervalsThBtn,
      intervalsCompBtn,
    ] = this.createSection(
      LangPack[state][31],
      [
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__theory training-btn theory-btn',
          content: LangPack[state][16],
        }],
        '/theory/intervals',
        ],
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__game training-btn',
          content: LangPack[state]['34'],
        }],
        '/ear-training/interval-comparison'],
      ],
    );

    const [
      scalesSection,
      scalesThBtn,
      scalesIdentBtn,
    ] = this.createSection(
      LangPack[state][32],
      [
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__theory training-btn theory-btn',
          content: LangPack[state][16],
        }],
        '/theory/scales',
        ],
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__game training-btn',
          content: LangPack[state]['35'],
        }],
        '/ear-training/scale-identification',
        ],
      ],
    );

    const [
      chordSection,
      chordThBtn,
      chordIdentBtn,
    ] = this.createSection(
      LangPack[state][33],
      [
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__theory training-btn theory-btn',
          content: LangPack[state][16],
        }],
        '/theory/chords',
        ],
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__game training-btn',
          content: LangPack[state]['36'],
        }],
        '/ear-training/chord-identification',
        ],
      ],
    );

    LangEmitter.add((content) => {
      h2.node.innerHTML = `<h2 class="ear-header__h2">${content['13']}</h2>`;
      intervalSection.innerHTML = content['31'];
      intervalsThBtn.innerHTML = content['16'];
      intervalsCompBtn.innerHTML = content['34'];
      scalesSection.innerHTML = content['32'];
      scalesThBtn.innerHTML = content['16'];
      scalesIdentBtn.innerHTML = content['35'];
      chordSection.innerHTML = content['33'];
      chordThBtn.innerHTML = content['16'];
      chordIdentBtn.innerHTML = content['36'];
    });
  }

  private createSection(
    sectionName: string,
    sectionButtons: [ConstructorParameters<typeof ButtonBuilder>, string][],
  ): HTMLElement[] {
    const container = new NodeBuilder({
      parentNode: this.sectionContainer,
      tagName: 'div',
      className: 'ear-section section',
    }).node;
    const containerH2 = new NodeBuilder({
      parentNode: container,
      tagName: 'h2',
      className: 'ear-section__section-title section-title',
      content: sectionName,
    }).node;
    return [
      containerH2,
      ...sectionButtons.map(
        ([[options], url]) => {
          const button = new ButtonBuilder({ ...options, parentNode: container });
          button.node.onclick = () => {
            window.location.hash = '#';
            window.location.hash += url;
          };
          return button.node;
        },
      ),
    ];
  }
}

export default EarTrainingView;
