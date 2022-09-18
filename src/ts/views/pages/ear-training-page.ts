import Translation from '../../constants/translation';
import { LangEmitter } from '../../controllers/emitters/lang-emitter';
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
      content: `<h2 class="ear-header__h2">${Translation.earTrainingPageHeader[state]}</h2>`,
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
      Translation.earTrainingPageIntervalHeader[state],
      [
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__theory training-btn theory-btn',
          content: Translation.mainMenuTheory[state],
        }],
        '/theory/intervals',
        ],
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__game training-btn',
          content: Translation.intervalComparisonBtn[state],
        }],
        '/ear-training/interval-comparison'],
      ],
    );

    const [
      scalesSection,
      scalesThBtn,
      scalesIdentBtn,
    ] = this.createSection(
      Translation.earTrainingPageScaleHeader[state],
      [
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__theory training-btn theory-btn',
          content: Translation.mainMenuTheory[state],
        }],
        '/theory/scales',
        ],
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__game training-btn',
          content: Translation.scaleIdentificationBtn[state],
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
      Translation.earTrainingPageChordHeader[state],
      [
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__theory training-btn theory-btn',
          content: Translation.mainMenuTheory[state],
        }],
        '/theory/chords',
        ],
        [[{
          parentNode: null,
          className: 'ear-training__btn ear-training__game training-btn',
          content: Translation.chordIdentificationBtn[state],
        }],
        '/ear-training/chord-identification',
        ],
      ],
    );

    LangEmitter.add((lang) => {
      h2.node.innerHTML = `<h2 class="ear-header__h2">${Translation.earTrainingPageHeader[lang]}</h2>`;
      intervalSection.innerHTML = Translation.earTrainingPageIntervalHeader[lang];
      intervalsThBtn.innerHTML = Translation.mainMenuTheory[lang];
      intervalsCompBtn.innerHTML = Translation.intervalComparisonBtn[lang];
      scalesSection.innerHTML = Translation.earTrainingPageScaleHeader[lang];
      scalesThBtn.innerHTML = Translation.mainMenuTheory[lang];
      scalesIdentBtn.innerHTML = Translation.scaleIdentificationBtn[lang];
      chordSection.innerHTML = Translation.earTrainingPageChordHeader[lang];
      chordThBtn.innerHTML = Translation.mainMenuTheory[lang];
      chordIdentBtn.innerHTML = Translation.chordIdentificationBtn[lang];
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
