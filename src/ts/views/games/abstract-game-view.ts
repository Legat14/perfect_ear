import Sound from '../../controllers/sound';
import GameRound, { GameQuizConstructor } from '../../controllers/game-cycle/game-round';
import NodeBuilder from '../../helpers/node-builder';
import { IRound } from '../../types/game-types';

class AbstractGameView<T extends IRound = IRound> extends NodeBuilder {
  public game!: GameRound<T>;

  public sound: Sound;

  public quiz: T;

  public onQuit!: () => void;

  public onRepeat!: (quiz: T) => void;

  public Constructor: GameQuizConstructor<T>;

  constructor(
    parentNode: HTMLElement | null,
    quiz: T,
    sound: Sound,
    Constructor: GameQuizConstructor<T>,
  ) {
    super({ parentNode, className: 'game-field' });

    this.quiz = quiz;
    this.sound = sound;
    this.Constructor = Constructor;

    this.init();
  }

  public init(): GameRound<T> {
    this.game = new GameRound(
      this.node,
      this.quiz,
      this.Constructor,
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

export default AbstractGameView;