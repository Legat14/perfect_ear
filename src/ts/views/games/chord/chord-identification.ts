import Sound from '../../../controllers/sound';
import GameRound from '../../../controllers/game-cycle/game-round';
import ChordIdentification from '../../../controllers/games/chord/chord-identification';
import { IChordRound } from '../../../types/game-types';
import AbstractGameView from '../abstract-game-view';

class ChordIdentificationView extends AbstractGameView<IChordRound> {
  public game!: GameRound<IChordRound>;

  public onQuit!: () => void;

  public onRepeat!: (quiz: IChordRound) => void;

  constructor(parentNode: HTMLElement | null, quiz: IChordRound, sound: Sound) {
    super(parentNode, quiz, sound, ChordIdentification);
  }
}

export default ChordIdentificationView;
