import { Frequency, Subdivision } from 'tone/build/esm/core/type/Units';
import GameQuizView from '../../views/game-cycle-view/game-quiz-view';
import { IQuestion } from '../../types/game-types';
import { PIANO_SOUND } from '../../constants/constants';
import { Pause } from '../../types/note-types';
import Sound from '../sound';

abstract class AbstractGameQuiz {
  public question: IQuestion;

  public view: GameQuizView;

  public sound: Sound;

  public onAnswer!: (answer: boolean) => void;

  public onSkip!: () => void;

  public onNext!: () => void;

  public onFinish!: () => void;

  constructor(question: IQuestion, round: number, sound = new Sound(PIANO_SOUND)) {
    this.question = question;

    this.sound = sound;

    this.view = new GameQuizView(
      question,
      round,
      sound,
      () => this.playSequence(question.sequence),
    );

    this.view.onRepeat = () => this.playSequence(question.sequence);
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

  private playSequence(sequence?: [Pause | Frequency | Frequency[], Subdivision][]): void {
    return sequence && this.sound.playSequence(sequence);
  }
}

export default AbstractGameQuiz;
