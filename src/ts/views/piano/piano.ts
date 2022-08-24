import { Note } from 'tone/build/esm/core/type/NoteUnits';
import Sound from '../../controllers/sound';
import NodeBuilder from '../../helpers/node-builder';
import { PianoNotations } from '../../types/note-types';
import Key from './key';

class Piano extends NodeBuilder {
  public onPlayNote!: (note: Note) => void;

  private sound: Sound;

  constructor(parentNode: HTMLElement, sound: Sound) {
    super({
      parentNode,
      tagName: 'div',
      className: 'piano',
    });

    this.sound = sound;

    this.createKeys();
  }

  public createKeys(): void {
    Object.keys(PianoNotations).forEach((key) => {
      const keyButton = new Key(this.node, key as Note);
      keyButton.onPlayNote = (note: Note) => this.playNote(note);
    });
  }

  public playNote(note: Note): void {
    this.sound.playNote([note, '4n']);
  }
}

export default Piano;
