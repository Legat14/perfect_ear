import Sound from '../../controllers/sound';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Callback } from '../../types/common';
import { IQuestion, IRound } from '../../types/game-types';
import Piano from '../piano/piano';
import AnswerSound from './game-answer-sound';
import GameQuizNextButton from './game-quiz-next-button';

class GameQuizView<QuizType extends IRound = IRound> extends NodeBuilder {
  public readonly condition: NodeBuilder<HTMLElement>;

  private readonly value: IQuestion<QuizType>['value'];

  public piano: Piano;

  public onAnswer!: (index: number) => void;

  public onRepeat!: () => void;

  public onSkip!: () => void;

  public onNext!: () => void;

  public onDone!: () => void;

  public onStart!: () => void;

  public questionIndicator: NodeBuilder<HTMLElement>;

  public repeatControl: HTMLButtonElement;

  public nextControl: GameQuizNextButton;

  public answers: HTMLElement[];

  constructor(
    question: IQuestion<QuizType>,
    round: number,
    sound: Sound,
    callback: Callback<void>,
  ) {
    super({ parentNode: null, className: 'quiz fortepiano-field fortepiano-flex' });

    const piano = new Piano(this.node, sound);
    this.piano = piano;

    const condition = new NodeBuilder({
      parentNode: this.node,
      tagName: 'p',
      className: 'quiz-question',
      content: question.round.condition,
    });
    this.condition = condition;

    const answers = new NodeBuilder({
      parentNode: this.node,
      className: 'quiz-answers',
    }).node;

    this.answers = question.round.answers.map((answer, index) => {
      const button = new ButtonBuilder({
        parentNode: answers,
        className: 'quiz-answers__answer',
        content: answer,
      });

      button.node.onclick = () => this.onAnswer(index);
      return button.node;
    });

    const footer = new NodeBuilder({
      parentNode: this.node,
      className: 'quiz-controls',
    }).node;

    const questionIndicator = new NodeBuilder({
      parentNode: this.node,
      className: 'quiz-controls__question-indicator',
      content: `${round + 1} / ${question.round.rounds}`,
    });
    this.questionIndicator = questionIndicator;

    const repeatControl = new ButtonBuilder({
      parentNode: footer,
      className: 'quiz-answers__music-repeat',
      content: 'повторить',
    });
    this.repeatControl = repeatControl.node;

    this.repeatControl.onclick = () => this.onRepeat();

    const nextControl = new GameQuizNextButton(footer);
    this.nextControl = nextControl;

    this.nextControl.onSkip = () => this.onSkip();
    this.nextControl.onNext = () => this.onNext();
    this.nextControl.onDone = () => this.onDone();

    this.value = question.value;

    callback();
  }

  /**
   * @todo Add piano view.
   * @todo Add staff view.
   */

  public react(answer: boolean, terms: IRound['terms'], done: boolean): void {
    terms?.forEach((term, index) => {
      this.answers[index].innerHTML = term;
      this.answers[index].className += ` ${
        index === this.value
          ? 'quiz-answers__answer_correct'
          : 'quiz-answers__answer_wrong'
      }`;
    });

    if (done) this.nextControl.setDone();
    else this.nextControl.setNext();
    if (answer) this.acceptAnswer();
    else this.rejectAnswer();
  }

  private acceptAnswer(): void {
    AnswerSound.accept();
  }

  private rejectAnswer(): void {
    AnswerSound.reject();
  }
}

export default GameQuizView;
