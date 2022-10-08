import GameRound from '../../../controllers/game-cycle/game-round';
import { IScaleRound } from '../../../types/game-types';
import AbstractGameView from '../abstract-game-view';

class ScaleIdentificationView extends AbstractGameView<IScaleRound> {
  public game!: GameRound<IScaleRound>;

  public onQuit!: () => void;

  public onRepeat!: (quiz: IScaleRound) => void;
}

export default ScaleIdentificationView;
