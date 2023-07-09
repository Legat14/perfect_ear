import Translation from '../../constants/translation';
import { LangEmitter } from '../../controllers/emitters/emitters';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';

class TheoryPageView extends NodeBuilder {
  private sectionContainer: HTMLElement;

  constructor(state: keyof typeof Languages) {
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

    const [
      sectionName,
      intervalsBtn,
      scalesBtn,
      modesBtn,
      chordsBtn,
      rhythmBtn,
    ] = this.createSection(
      Translation.theoryPageHeader[state],
      [
        [[{
          parentNode: null,
          className: 'theory__theory-btn theory-btn button',
          content: Translation.theoryPageIntervalsSection[state],
        }],
          '/theory/intervals',
        ],
        [[{
          parentNode: null,
          className: 'theory__theory-btn theory-btn button',
          content: Translation.theoryPageScalesSection[state],
        }],
          '/theory/scales',
        ],
        [[{
          parentNode: null,
          className: 'theory__theory-btn theory-btn button',
          content: Translation.theoryPageModesSection[state],
        }],
          '/theory/modes',
        ],
        [[{
          parentNode: null,
          className: 'theory__theory-btn theory-btn button',
          content: Translation.theoryPageChordsSection[state],
        }],
          '/theory/chords',
        ],
        [[{
          parentNode: null,
          className: 'theory__theory-btn theory-btn button',
          content: Translation.theoryPageRhythmSection[state],
        }],
          '/theory/rhythm',
        ],
      ],
    );

    LangEmitter.add((lang) => {
      sectionName.innerHTML = Translation.theoryPageHeader[lang];
      intervalsBtn.innerHTML = Translation.theoryPageIntervalsSection[lang];
      scalesBtn.innerHTML = Translation.theoryPageScalesSection[lang];
      modesBtn.innerHTML = Translation.theoryPageModesSection[lang];
      chordsBtn.innerHTML = Translation.theoryPageChordsSection[lang];
      rhythmBtn.innerHTML = Translation.theoryPageRhythmSection[lang];
    });
  }

  private createSection(
    sectionName: string,
    sectionButtons: [ConstructorParameters<typeof ButtonBuilder>, string][],
  ): HTMLElement[] {
    const container = new NodeBuilder({
      parentNode: this.sectionContainer,
      tagName: 'div',
      className: 'theory-section section',
    }).node;
    const containerH2 = new NodeBuilder({
      parentNode: container,
      tagName: 'h2',
      className: 'theory-section__section-title section-title',
      content: sectionName,
    }).node;
    return [
      containerH2,
      ...sectionButtons.map(
        ([[options], url]) => {
          const button = new ButtonBuilder({ ...options, parentNode: container });
          button.node.onclick = () => {
            window.location.hash = `#${url}`;
          };
          return button.node;
        },
      ),
    ];
  }
}

export default TheoryPageView;
