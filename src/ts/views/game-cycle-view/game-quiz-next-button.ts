import LangPack from '../../constants/translation';
import ButtonBuilder from '../../helpers/button-builder';
import { Languages } from '../../types/data-types';

class GameQuizNextButton extends ButtonBuilder {
  public onSkip!: () => void;

  public onNext!: () => void;

  public onDone!: () => void;

  private state!: 'default' | 'next' | 'done';

  private language: keyof typeof Languages;

  constructor(parentNode: HTMLElement, language: keyof typeof Languages) {
    super({ parentNode });

    this.language = language;
    this.setDefault();
  }

  public setDefault(): void {
    this.node.className = 'quiz-controls__button quiz-controls__button_skip';
    this.node.innerHTML = `${LangPack[this.language][67]} <span class="key-index">(↵)</span>`;
    this.node.onclick = () => this.onSkip();

    this.state = 'default';

    document.addEventListener('keydown', (event) => {
      if (
        !document.body.contains(this.node)
        || this.state !== 'default'
        || event.repeat
      ) return;
      if (event.key === 'Enter') this.onSkip();
    });
  }

  public setNext(): void {
    this.node.className = 'quiz-controls__button quiz-controls__button_next';
    this.node.innerHTML = `${LangPack[this.language][68]} <span class="key-index">(↵)</span>`;
    this.node.onclick = () => this.onNext();

    this.state = 'next';

    document.addEventListener('keydown', (event) => {
      if (
        !document.body.contains(this.node)
        || this.state !== 'next'
        || event.repeat
      ) return;
      if (event.key === 'Enter') this.onNext();
    });
  }

  public setDone(): void {
    this.node.className = 'quiz-controls__button quiz-controls__button_next';
    this.node.innerHTML = `${LangPack[this.language][69]} <span class="key-index">(↵)</span>`;
    this.node.onclick = () => this.onDone();

    this.state = 'done';

    document.addEventListener('keydown', (event) => {
      if (
        !document.body.contains(this.node)
        || this.state !== 'done'
        || event.repeat
      ) return;
      if (event.key === 'Enter') this.onDone();
    });
  }
}

export default GameQuizNextButton;
