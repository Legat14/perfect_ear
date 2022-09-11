import LangPack from '../../constants/translation';
import LangEmitter from '../../controllers/emitters/lang-emitter';
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
      LangPack[state]['16'],
      [
        [[{
          parentNode: null,
          className: 'theory__theory-btn theory-btn button',
          content: LangPack[state]['38'],
        }],
        '/theory/intervals',
        ],
        [[{
          parentNode: null,
          className: 'theory__theory-btn theory-btn button',
          content: LangPack[state]['39'],
        }],
        '/theory/scales',
        ],
        [[{
          parentNode: null,
          className: 'theory__theory-btn theory-btn button',
          content: LangPack[state]['40'],
        }],
        '/theory/modes',
        ],
        [[{
          parentNode: null,
          className: 'theory__theory-btn theory-btn button',
          content: LangPack[state]['41'],
        }],
        '/theory/chords',
        ],
        [[{
          parentNode: null,
          className: 'theory__theory-btn theory-btn button',
          content: LangPack[state]['42'],
        }],
        '/theory/rhythm',
        ],
      ],
    );

    LangEmitter.add((content) => {
      sectionName.innerHTML = content['16'];
      intervalsBtn.innerHTML = content['38'];
      scalesBtn.innerHTML = content['39'];
      modesBtn.innerHTML = content['40'];
      chordsBtn.innerHTML = content['41'];
      rhythmBtn.innerHTML = content['42'];
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
