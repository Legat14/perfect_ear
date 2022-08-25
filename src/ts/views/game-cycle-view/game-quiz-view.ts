import { PIANO_SOUND } from '../../constants/constants';
import Sound from '../../controllers/sound';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { IQuestion } from '../../types/game-types';
import Piano from '../piano/piano';
import AnswerSound from './game-answer-sound';
import GameQuizNextButton from './game-quiz-next-button';

class GameQuizView extends NodeBuilder {
  public readonly condition: NodeBuilder<HTMLElement>;

  private readonly sound: Sound;

  public piano: Piano;

  public onAnswer!: (index: number) => void;

  public onRepeat!: () => void;

  public onSkip!: () => void;

  public onNext!: () => void;

  public onDone!: () => void;

  questionIndicator: NodeBuilder<HTMLElement>;

  nextControl: GameQuizNextButton;

  answers: HTMLElement[];

  constructor(question: IQuestion, round: number) {
    super({ parentNode: null, className: 'quiz' });

    const sound = new Sound(PIANO_SOUND);
    this.sound = sound;

    const piano = new Piano(this.node, this.sound);
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
    repeatControl.node.onclick = () => this.playSequence();

    const nextControl = new GameQuizNextButton(footer);
    this.nextControl = nextControl;

    this.nextControl.onSkip = () => this.onSkip();
    this.nextControl.onNext = () => this.onNext();
    this.nextControl.onDone = () => this.onDone();
  }

  public react(answer: boolean, desciptions: IQuestion['descriptions']) {
    desciptions?.forEach((desciption, index) => {
      this.answers[index].innerHTML = desciption;
    });

    return answer ? this.acceptAnswer() : this.rejectAnswer();
  }

  private acceptAnswer() {
    AnswerSound.ok();
  }

  private rejectAnswer() {
    AnswerSound.fail();
  }

  private playSequence() {}
}

export default GameQuizView;
