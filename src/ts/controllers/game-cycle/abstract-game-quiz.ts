import { Frequency, Subdivision } from 'tone/build/esm/core/type/Units';
import GameQuizView from '../../views/game-cycle-view/game-quiz-view';
import { IQuestion, IRound } from '../../types/game-types';
import { Pause } from '../../types/note-types';
import Sound from '../sound';

abstract class AbstractGameQuiz {
  public quiz: IRound;

  public question: IQuestion;

  public view: GameQuizView;

  public sound: Sound;

  public onAnswer!: (answer: boolean) => void;

  public onSkip!: () => void;

  public onNext!: () => void;

  public onFinish!: () => void;

  private answered: boolean;

  constructor(quiz: IRound, round: number, sound: Sound) {
    this.quiz = quiz;
    this.question = this.generateQuestion(quiz);
    this.answered = false;

    this.sound = sound;

    this.view = new GameQuizView(
      this.question,
      round,
      sound,
      () => this.playSequence(this.question.sequence),
    );

    this.view.onRepeat = () => this.playSequence(this.question.sequence);
    this.view.onSkip = () => this.skip();

    this.view.onAnswer = (index) => this.answer(
      index === this.question.value,
      round === quiz.rounds - 1,
    );
    this.view.onNext = () => this.onNext();
    this.view.onDone = () => this.onFinish();
  }

  abstract generateQuestion(quiz: IRound): IQuestion;

  private answer(answer: boolean, done: boolean): void {
    this.answered = this.answered
      ? this.answered
      : (this.onAnswer(answer), true);
    this.view.react(answer, this.question.round.terms, done);
  }

  private skip(): void {
    this.onSkip();
  }

  private playSequence(
    sequence?: [Pause | Frequency | Frequency[], Subdivision][],
  ): void {
    if (!sequence) return;
    const delay = new Date().getTime() + 100;

    this.sound.playSequence(sequence).then((sec) => {
      this.view.repeatControl.disabled = true;
      this.view.nextControl.node.disabled = true;

      setTimeout(() => {
        this.view.repeatControl.disabled = false;
        this.view.nextControl.node.disabled = false;
      }, 1000 * sec + delay - new Date().getTime());
    });
  }
}

export default AbstractGameQuiz;
