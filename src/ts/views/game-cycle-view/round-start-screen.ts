import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { IRound } from '../../types/game-types';

class GameRoundStartScreen extends NodeBuilder {
  public getInfo!: (term: IRound['terms'][number]) => void;

  public onQuizStart!: () => void;

  public onQuit!: () => void;

  constructor(parentNode: HTMLElement, info: IRound) {
    super({
      parentNode,
      className: 'quiz-start-screen',
    });

    const header = new NodeBuilder({
      parentNode: this.node,
      tagName: 'header',
      className: 'quiz-header',
      content: 'Упражнение',
    }).node;

    const backButton = new ButtonBuilder({
      parentNode: header,
      className: 'field__back-btn',
      content: '←',
    }).node;
    backButton.onclick = () => this.onQuit();

    new NodeBuilder({ parentNode: this.node }).node.append(
      new NodeBuilder({
        parentNode: null,
        tagName: 'h2',
        className: 'quiz-start-screen__quiz-name',
        content: info.quizName,
      }).node,

      new NodeBuilder({
        parentNode: null,
        tagName: 'h3',
        className: 'quiz-start-screen__game-name',
        content: info.game.gameName,
      }).node,

      new NodeBuilder({
        parentNode: null,
        tagName: 'p',
        className: 'quiz-start-screen__game-description',
        content: info.quizStartDescription.join('<br>'),
      }).node,

      new NodeBuilder({
        parentNode: null,
        tagName: 'p',
        className: 'quiz-start-screen__game-description',
        content: 'Нажимайте клавиши 1-8 — для быстрого ответа, R — для повтора мелодии, Enter — для пропуска вопроса или перехода к следующему.',
      }).node,
    );

    const termsContaner = new NodeBuilder({
      parentNode: this.node,
      className: 'quiz-terms',
      content: `<p>${info.game.category?.categoryName} в упражнении:</p>`,
    }).node;

    info.terms.forEach((term) => {
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
