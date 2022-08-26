import Sound from '../../controllers/sound';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { Callback } from '../../types/common';
import { IQuestion } from '../../types/game-types';
import Piano from '../piano/piano';
import AnswerSound from './game-answer-sound';
import GameQuizNextButton from './game-quiz-next-button';

class GameQuizView extends NodeBuilder {
  public readonly condition: NodeBuilder<HTMLElement>;

  private readonly value: IQuestion['value'];

  public piano: Piano;

  public onAnswer!: (index: number) => void;

  public onRepeat!: () => void;

  public onSkip!: () => void;

  public onNext!: () => void;

  public onDone!: () => void;

  public questionIndicator: NodeBuilder<HTMLElement>;

  public nextControl: GameQuizNextButton;

  public answers: HTMLElement[];

  constructor(question: IQuestion, round: number, sound: Sound, callback: Callback<void>) {
    super({ parentNode: null, className: 'quiz' });

    const piano = new Piano(this.node, sound);
    this.piano = piano;

    const condition = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      className: 'quiz-question',
      content: question.condition,
    });
    this.condition = condition;

    const answers = new NodeBuilder({ parentNode: this.node, className: 'quiz-answers' }).node;

    this.answers = question.answers.map((answer, index) => {
      const button = new ButtonBuilder({
        parentNode: answers,
        className: 'quiz-answers__answer',
        content: answer,
      });

      button.node.onclick = () => this.onAnswer(index);
      return button.node;
    });

    const footer = new NodeBuilder({ parentNode: this.node, className: 'quiz-controls' }).node;

    const questionIndicator = new NodeBuilder({
      parentNode: this.node,
      className: 'quiz-controls__question-indicator',
      content: `${round} / ${question.rounds}`,
    });
    this.questionIndicator = questionIndicator;

    const repeatControl = new ButtonBuilder({
      parentNode: footer,
      className: 'quiz-answers__repeat',
      content: 'REPEAT',
    });
    repeatControl.node.onclick = () => this.onRepeat();

    const nextControl = new GameQuizNextButton(footer);
    this.nextControl = nextControl;

    this.nextControl.onSkip = () => this.onSkip();
    this.nextControl.onNext = () => this.onNext();
    this.nextControl.onDone = () => this.onDone();

    callback();

    this.value = question.value;
  }

  /**
   * @todo Add piano view.
   * @todo Add staff view.
   */

  public react(answer: boolean, descriptions: IQuestion['descriptions'], done: boolean): void {
    descriptions?.forEach((description, index) => {
      this.answers[index].innerHTML = description;
      this.answers[index].className += `${index === this.value ? 'quiz-answers__answer_key' : 'quiz-answers__answer_answered'}`;
    });

    if (done) this.nextControl.setDone(); else this.nextControl.setNext();
    if (answer) this.acceptAnswer(); else this.rejectAnswer();
  }

  private acceptAnswer(): void {
    AnswerSound.ok();
  }

  private rejectAnswer(): void {
    AnswerSound.fail();
  }
}

export default GameQuizView;
