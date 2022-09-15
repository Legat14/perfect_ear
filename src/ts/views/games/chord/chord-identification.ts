import GameRound from '../../../controllers/game-cycle/game-round';
import { IChordRound } from '../../../types/game-types';
import AbstractGameView from '../abstract-game-view';

class ChordIdentificationView extends AbstractGameView<IChordRound> {
  public game!: GameRound<IChordRound>;

  public onQuit!: () => void;

  public onRepeat!: (quiz: IChordRound) => void;
}

export default ChordIdentificationView;
