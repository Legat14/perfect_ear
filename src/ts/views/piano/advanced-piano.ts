import { Note } from 'tone/build/esm/core/type/NoteUnits';
import { PianoNotations } from '../../types/note-types';
import Key from './key';
import Piano from './piano';

class VirtualPiano extends Piano {
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
}

export default VirtualPiano;
