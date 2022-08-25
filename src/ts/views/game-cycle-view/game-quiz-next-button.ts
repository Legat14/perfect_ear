import ButtonBuilder from '../../helpers/button-builder';

class GameQuizNextButton extends ButtonBuilder {
  public onSkip!: () => void;

  public onNext!: () => void;

  public onDone!: () => void;

  constructor(parentNode: HTMLElement) {
    super({
      parentNode,
      className: 'quiz-controls__button quiz-controls__button_skip',
      content: 'SKIP',
    });
  }

  public setDefault() {
    this.node.className = 'quiz-controls__button quiz-controls__button_skip';
    this.node.textContent = 'SKIP';
    this.node.onclick = () => this.onSkip();
  }

  public setNext() {
    this.node.className = 'quiz-controls__button quiz-controls__button_next';
    this.node.textContent = 'NEXT';
    this.node.onclick = () => this.onNext();
  }

  public setDone() {
    this.node.className = 'quiz-controls__button quiz-controls__button_next';
    this.node.textContent = 'DONE';
    this.node.onclick = () => this.onDone();
  }
}

export default GameQuizNextButton;
