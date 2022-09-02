import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { IRound } from '../../types/game-types';

class GameRoundStartScreen extends NodeBuilder {
  public getInfo!: (term: IRound['terms'][number]) => void;

  public onQuizStart!: () => void;

  public onQuit!: () => void;

  constructor(parentNode: HTMLElement, terms: IRound['terms']) {
    super({
      parentNode,
      className: 'quiz__quiz-start-screen',
    });

    const header = new NodeBuilder({
      parentNode: this.node,
      tagName: 'header',
      className: 'quiz-header',
    }).node;

    const backButton = new ButtonBuilder({
      parentNode: header,
      className: 'field__back-btn',
      content: '←',
    }).node;
    backButton.onclick = () => this.onQuit();

    const termsContaner = new NodeBuilder({ parentNode: this.node, className: 'quiz-terms' }).node;

    terms.forEach((term) => {
      const button = new ButtonBuilder({
        parentNode: termsContaner,
        className: 'quiz-terms__description',
        content: term,
      });

      button.node.onclick = () => this.getInfo(term);
    });

    const startControl = new ButtonBuilder({
      parentNode: this.node,
      className: 'quiz-start-screen__start-btn',
      content: 'начать упражнение',
    });
    startControl.node.onclick = () => this.onQuizStart();
  }
}

export default GameRoundStartScreen;
