import { Note } from 'tone/build/esm/core/type/NoteUnits';
import ButtonBuilder from '../../helpers/button-builder';

class Key extends ButtonBuilder {
  public note: Note;

  public onPlayNote!: (note: Note) => void;

  constructor(parentNode: HTMLElement, note: Note) {
    super({
      parentNode,
      className: 'key',
      attributes: { black: note.includes('#') },
    });
    this.note = note;
    this.node.onclick = () => this.onPlayNote(this.note);
  }
}

export default Key;
