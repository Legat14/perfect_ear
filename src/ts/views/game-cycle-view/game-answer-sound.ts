import * as Tone from 'tone';
import { Decibels } from 'tone/build/esm/core/type/Units';

class AnswerSound {
  static correct = new Tone.Player('./../../../assets/audio/quiz/correct.mp3').toDestination();

  static incorrect = new Tone.Player('./../../../assets/audio/quiz/wrong.mp3').toDestination();

  constructor(volume: Decibels) {
    this.volume = volume;
  }

  set volume(volume: number) {
    AnswerSound.correct.volume.value = volume;
    AnswerSound.incorrect.volume.value = volume;
  }

  public accept() {
    Tone.loaded().then(() => AnswerSound.correct.start());
  }

  public reject() {
    Tone.loaded().then(() => AnswerSound.incorrect.start());
  }
}

export default AnswerSound;
