import { Note } from 'tone/build/esm/core/type/NoteUnits';
import NodeBuilder from '../../helpers/node-builder';
import { PianoNotations } from '../../types/note-types';
import Key from './key';

class Piano extends NodeBuilder {
  public onPlayNote!: (note: Note) => void;

  constructor(parentNode: HTMLElement) {
    super({
      parentNode,
      tagName: 'div',
      className: 'piano',
    });
  }

  public createKeys(): void {
    Object.keys(PianoNotations).forEach((key) => {
      const keyButton = new Key(this.node, key as Note);
      keyButton.onPlayNote = (note: Note) => this.onPlayNote(note);
    });
  }
}

export default Piano;
