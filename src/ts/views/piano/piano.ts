import { Note } from 'tone/build/esm/core/type/NoteUnits';
import Sound from '../../controllers/sound';
import NodeBuilder from '../../helpers/node-builder';
import { PianoNotations } from '../../types/note-types';
import Key from './key';

class Piano extends NodeBuilder {
  public onPlayNote!: (note: Note) => void;

  private sound: Sound;

  public keys: { [key: string]: Key; };

  constructor(parentNode: HTMLElement, sound: Sound) {
    super({
      parentNode,
      tagName: 'div',
      className: 'piano',
    });

    this.sound = sound;

    this.keys = this.createKeys();
  }

  public createKeys() {
    return Object.fromEntries(
      (Object.keys(PianoNotations) as Note[]).map((key: Note) => {
        const keyButton = new Key(this.node, key);
        keyButton.onPlayNote = (note: Note) => this.playNote(note);
        return [key, keyButton];
      }),
    );
  }

  public playNote(note: Note): void {
    this.sound.playNote([note, '4n']);
  }
}

export default Piano;
