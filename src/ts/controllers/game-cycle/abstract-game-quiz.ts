import { Frequency, Subdivision } from 'tone/build/esm/core/type/Units';
import GameQuizView from '../../views/game-cycle-view/game-quiz-view';
import { IQuestion, IRound } from '../../types/game-types';
import { Pause } from '../../types/note-types';
import Sound from '../sound';
import { Languages } from '../../types/data-types';

abstract class AbstractGameQuiz<QuizType extends IRound = IRound> {
  public quiz: QuizType;

  public question: IQuestion<QuizType>;

  public view: GameQuizView;

  public sound: Sound;

  public onAnswer!: (answer: boolean) => void;

  public onSkip!: () => void;

  public onNext!: () => void;

  public onFinish!: () => void;

  public loaded!: () => void;

  private answered: boolean;

  private state: { language: keyof typeof Languages; volume: number; };

  constructor(
    quiz: QuizType,
    round: number,
    sound: Sound,
    state: { language: keyof typeof Languages; volume: number },
  ) {
    this.state = state;
    this.quiz = quiz;
    this.question = this.generateQuestion(quiz);
    this.answered = false;

    this.sound = sound;

    this.view = new GameQuizView(
      this.question,
      round,
      sound,
      state,
      () => this.playSequence(this.question.sequence),
    );

    this.view.loaded = () => this.loaded();
    this.view.onRepeat = () => this.playSequence(this.question.sequence);
    this.view.onSkip = () => this.skip();

    this.view.onAnswer = (index) => this.answer(
      index,
      round === quiz.rounds - 1,
    );
    this.view.onNext = () => this.onNext();
    this.view.onDone = () => this.onFinish();
  }

  abstract generateQuestion(quiz: QuizType): IQuestion<QuizType>;

  private answer(index: number, done: boolean): void {
    const answer = index === this.question.value;
    const terms = this.question.round.terms[this.state.language];
    this.answered = this.answered
      ? this.answered
      : (this.onAnswer(answer), true);
    this.view.react(
      answer,
      terms,
      done,
      {
        right: this.question.labels[this.question.value as number],
        given: this.question.labels[index],
      },
    );
  }

  private skip(): void {
    this.onSkip();
  }

  private playSequence(
    sequence?: [Pause | Frequency | Frequency[], Subdivision][],
  ): Promise<void> {
    return sequence ? this.sound.playSequence(sequence) : new Promise(() => { });
  }
}

export default AbstractGameQuiz;
