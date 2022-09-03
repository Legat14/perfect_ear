import Sound from '../../../controllers/sound';
import GameRound from '../../../controllers/game-cycle/game-round';
import ScaleIdentification from '../../../controllers/games/scale/scale-identification';
import { IScaleRound } from '../../../types/game-types';
import AbstractGameView from '../abstract-game-view';

class ScaleIndetificationView extends AbstractGameView<IScaleRound> {
  public game!: GameRound<IScaleRound>;

  public onQuit!: () => void;

  public onRepeat!: (quiz: IScaleRound) => void;

  constructor(parentNode: HTMLElement | null, quiz: IScaleRound, sound: Sound) {
    super(parentNode, quiz, sound, ScaleIdentification);
  }
}

export default ScaleIndetificationView;
