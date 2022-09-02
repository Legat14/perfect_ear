import Sound from '../../../controllers/sound';
import GameRound from '../../../controllers/game-cycle/game-round';
import IntervalComparison from '../../../controllers/games/interval/interval-comparison';
import { IIntervalRound } from '../../../types/game-types';
import AbstractGameView from '../abstract-game-view';

class IntervalComparisonView extends AbstractGameView<IIntervalRound> {
  public game!: GameRound<IIntervalRound>;

  public onQuit!: () => void;

  public onRepeat!: (quiz: IIntervalRound) => void;

  constructor(parentNode: HTMLElement | null, quiz: IIntervalRound, sound: Sound) {
    super(parentNode, quiz, sound, IntervalComparison);
  }
}

export default IntervalComparisonView;
