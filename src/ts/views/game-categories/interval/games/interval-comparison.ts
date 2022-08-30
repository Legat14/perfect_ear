import Sound from '../../../../controllers/sound';
import GameRound from '../../../../controllers/game-cycle/game-round';
import IntervalComparison from '../../../../controllers/games/interval/interval-comparison';
import NodeBuilder from '../../../../helpers/node-builder';
import { IIntervalRound } from '../../../../types/game-types';

class IntervalComparisonView extends NodeBuilder {
  public game!: GameRound<IIntervalRound>;

  public sound: Sound;

  public quiz: IIntervalRound;

  public onQuit!: () => void;

  public onRepeat!: (quiz: IIntervalRound) => void;

  constructor(parentNode: HTMLElement, quiz: IIntervalRound, sound: Sound) {
    super({ parentNode, className: 'interval-game-field' });

    this.quiz = quiz;
    this.sound = sound;

    this.init();
  }

  public init(): GameRound<IIntervalRound> {
    this.game = new GameRound(
      this.node,
      this.quiz,
      IntervalComparison,
      this.sound,
    );

    /**
     * this.game.onQuit = () => this.onQuit();
     *  this.game.onRepeat = () => this.init().startGameCycle(this.quiz);
     */
    this.game.onQuit = () => this.onQuit();
    this.game.onRepeat = () => this.onRepeat(this.quiz);

    return this.game;
  }
}

export default IntervalComparisonView;
