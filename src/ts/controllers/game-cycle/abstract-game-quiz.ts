import GameQuizView from '../../views/game-cycle-view/game-quiz-view';
import { IQuestion } from '../../types/game-types';

abstract class AbstractGameQuiz {
  public question: IQuestion;

  public view: GameQuizView;

  public onAnswer!: (answer: boolean) => void;

  public onSkip!: () => void;

  public onNext!: () => void;

  public onQuit!: () => void;

  public onFinish!: () => void;

  constructor(question: IQuestion, round: number) {
    this.question = question;

    this.view = new GameQuizView(question, round);

    this.view.onRepeat = () => this.repeatSound;
    this.view.onSkip = () => this.skip();

    this.view.onAnswer = (index) => this.answer(index === question.value);
    this.view.onNext = () => this.onNext();
    this.view.onDone = () => this.onFinish();
  }

  private answer(answer: boolean): void {
    this.onAnswer(answer);
    this.view.react(answer, this.question.descriptions);
  }

  private skip(): void {
    this.onSkip();
  }

  public repeatSound(): void {}
}

export default AbstractGameQuiz;
