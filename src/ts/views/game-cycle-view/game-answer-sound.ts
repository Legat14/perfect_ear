import * as Tone from 'tone';

class AnswerSound {
  static accept() {
    const player = new Tone.Player('./../../../assets/audio/quiz/correct.mp3').toDestination();
    Tone.loaded().then(() => player.start());
  }

  static reject() {
    const player = new Tone.Player('./../../../assets/audio/quiz/wrong.mp3').toDestination();
    Tone.loaded().then(() => player.start());
  }
}

export default AnswerSound;
