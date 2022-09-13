import Translation from '../../constants/translation';
import LangEmitter from '../../controllers/emitters/lang-emitter';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Languages } from '../../types/data-types';

/**
 * @todo RhythmTrainingView
 */
class RhythmTrainingView extends NodeBuilder {
  constructor(state: keyof typeof Languages) {
    super({ parentNode: null, className: 'rhythm-training' });

    const backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    });

    backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });

    const [
      rhythmSection,
      rhythmThBtn,
    ] = this.createSection(Translation.rhythmTrainingPageHeader[state], [
      [[{
        parentNode: null,
        className: 'ear-training__btn ear-training__game training-btn theory-btn',
        content: Translation.mainMenuTheory[state],
      }],
      '/theory/rhythm',
      ],
    ]);

    LangEmitter.add((lang) => {
      rhythmSection.innerHTML = Translation.rhythmTrainingPageHeader[lang];
      rhythmThBtn.innerHTML = Translation.mainMenuTheory[lang];
    });
  }

  private createSection(
    sectionName: string,
    sectionButtons: [ConstructorParameters<typeof ButtonBuilder>, string][],
  ): HTMLElement[] {
    const container = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'rhythm-section section',
    }).node;
    const containerH2 = new NodeBuilder({
      parentNode: container,
      tagName: 'h2',
      className: 'rhythm-section__section-title section-title',
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

export default RhythmTrainingView;
