import { Note } from 'tone/build/esm/core/type/NoteUnits';
import Key from './key';

class AdvancedKey extends Key {
  public pressed: boolean;

  constructor(parentNode: HTMLElement, note: Note) {
    super(
      parentNode,
      note,
    );

    this.pressed = false;
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

export default AdvancedKey;
