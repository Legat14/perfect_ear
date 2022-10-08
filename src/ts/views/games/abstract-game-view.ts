import Sound from '../../controllers/sound';
import GameRound, { GameQuizConstructor } from '../../controllers/game-cycle/game-round';
import NodeBuilder from '../../helpers/node-builder';
import { IRound } from '../../types/game-types';
import { Languages } from '../../types/data-types';

class AbstractGameView<T extends IRound = IRound> extends NodeBuilder {
  public game!: GameRound<T>;

  public sound: Sound;

  public state: {
    language: keyof typeof Languages;
    volume: number,
  };

  public quiz: T;

  public onQuit!: () => void;

  public onRepeat!: (quiz: T) => void;

  public onContinue!: (quiz?: T) => void;

  public Constructor: GameQuizConstructor<T>;

  public nextGame?: T;

  constructor(
    parentNode: HTMLElement | null,
    quiz: T,
    sound: Sound,
    Constructor: GameQuizConstructor<T>,
    state: {
      language: keyof typeof Languages;
      volume: number,
    },
    nextGame?: T,
  ) {
    super({ parentNode, className: 'game-field' });

    this.quiz = quiz;
    this.sound = sound;
    this.state = state;
    this.Constructor = Constructor;
    if (nextGame) this.nextGame = nextGame;

    this.init();
  }

  public init(): GameRound<T> {
    this.game = new GameRound(
      this.node,
      this.quiz,
      this.Constructor,
      this.sound,
      this.state,
      this.nextGame,
    );

    /**
     * this.game.onQuit = () => this.onQuit();
     *  this.game.onRepeat = () => this.init().startGameCycle(this.quiz);
     */
    this.game.onQuit = () => this.onQuit();
    this.game.onRepeat = () => this.onRepeat(this.quiz);
    this.game.onContinue = () => this.onContinue(this.nextGame);

    return this.game;
  }
}

export default AbstractGameView;
