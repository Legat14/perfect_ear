import { Note } from 'tone/build/esm/core/type/NoteUnits';
import ButtonBuilder from '../../helpers/button-builder';

class Key extends ButtonBuilder {
  public note: Note;

  public onPlayNote!: (note: Note) => void;

  public onReleaseNote!: (note: Note) => void;

  constructor(parentNode: HTMLElement, note: Note) {
    super({
      parentNode,
      className: `key key_${note.replace(
        /#*\d/,
        (ending: string) => (ending[0] === '#' ? 's' : ''),
      )}`,
      attributes: { black: note.includes('#') },
    });
    this.note = note;

    this.node.onmousedown = () => this.onPlayNote(this.note);
  }
}

export default Key;
