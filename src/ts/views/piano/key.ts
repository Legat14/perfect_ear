import { Note } from 'tone/build/esm/core/type/NoteUnits';
import ButtonBuilder from '../../helpers/button-builder';

class Key extends ButtonBuilder {
  public note: Note;

  public pressed: boolean;

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
    this.pressed = false;

    this.note = note;
    this.node.onmousedown = () => this.keyDown();

    this.node.onmouseout = () => this.keyUp();
    this.node.onmouseup = () => this.keyUp();
  }

  public keyDown() {
    this.onPlayNote(this.note);
    this.node.className += ' key_keydown';

    this.pressed = true;
  }

  public keyUp() {
    this.onReleaseNote(this.note);
    this.node.className = this.node.className.replace(
      ' key_keydown',
      '',
    );

    this.pressed = false;
  }
}

export default Key;
