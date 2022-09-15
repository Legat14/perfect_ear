import GameRound from '../../../controllers/game-cycle/game-round';
import { IIntervalRound } from '../../../types/game-types';
import AbstractGameView from '../abstract-game-view';

class IntervalComparisonView extends AbstractGameView<IIntervalRound> {
  public game!: GameRound<IIntervalRound>;

  public onQuit!: () => void;

  public onRepeat!: (quiz: IIntervalRound) => void;
}

export default IntervalComparisonView;
