import * as Tone from 'tone';
import { Note } from 'tone/build/esm/core/type/NoteUnits';
import Sound from '../../controllers/sound';
import FortepianoKeys from '../../types/fortepiano-layout';
import { PianoNotations } from '../../types/note-types';
import Key from './key';
import Piano from './piano';

type OctaveTransposition = 0 | 12 | 24 | 36;

class VirtualPiano extends Piano {
  static initialTransposition: OctaveTransposition = 24;

  private transposition!: OctaveTransposition;

  constructor(parentNode: HTMLElement, sound: Sound) {
    super(parentNode, sound);

    document.onkeydown = (event) => {
      if (event.repeat) return;
      if (event.code in FortepianoKeys) {
        event.preventDefault();
        this.handleDown(FortepianoKeys[event.code]);
      }
    };

    document.onkeyup = (event) => {
      if (event.code in FortepianoKeys) {
        event.preventDefault();
        this.handleUp(FortepianoKeys[event.code]);
      }
    };

    this.octaveTransposition = VirtualPiano.initialTransposition;
  }

  private handleDown(key: string) {
    const btnkey = this.keys[key];
    if (btnkey.pressed) return;
    btnkey.keyDown();
  }

  private handleUp(key: string) {
    this.keys[key].keyUp();
  }

  public createKeys() {
    return Object.fromEntries(
      (Object.keys(PianoNotations) as Note[]).map(
        (key: Note) => {
          const keyButton = new Key(this.node, key);
          keyButton.onPlayNote = (note: Note) => this.playNote(note);
          keyButton.onReleaseNote = (note: Note) => this.releaseNote(note);
          return [key, keyButton];
        },
      ),
    );
  }

  public playNote(note: Note): void {
    this.sound.attackNote(note);
  }

  public releaseNote(note: Note): void {
    this.sound.releaseNote(note);
  }

  set octaveTransposition(transposition: OctaveTransposition) {
    this.transposition = transposition;

    Object.keys(this.keys).forEach((key) => {
      const keyButton = this.keys[key];

      keyButton.note = Tone.Frequency(keyButton.note)
        .transpose(this.transposition)
        .toNote();
    });
  }
}

export default VirtualPiano;
