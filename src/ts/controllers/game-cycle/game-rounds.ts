import { PIANO_SOUND } from '../../constants/constants';
import {
  CategoryId,
  GameId,
  GameName,
  IRound,
  RoundType,
} from '../../types/game-types';
import GameRoundsPageView from '../../views/game-cycle-view/game-rounds-page-view';
import Sound from '../sound';
import GamesLoader from './games-loader';
import { GameQuizConstructor } from './game-round';
import AbstractGameView from '../../views/games/abstract-game-view';

export type GameQuizViewConstructor<QuizType extends IRound = IRound> =
  new (
    parentNode: HTMLElement | null,
    quiz: QuizType,
    sound: Sound,
    Constructor: GameQuizConstructor<QuizType>
  ) => AbstractGameView<QuizType>;

class GameRoundsController {
  public games!: RoundType[];

  public view!: GameRoundsPageView;

  public sound!: Sound;

  public load(
    loader: GamesLoader,
    categoryId: CategoryId,
    gameId: GameId,
    gameName: GameName,
    Constructor: GameQuizConstructor<RoundType>,
    ViewConstructor: GameQuizViewConstructor<RoundType>,
  ) {
    return loader.loadRounds(categoryId, gameId).then((games) => {
      this.games = games || [];
      this.view = new GameRoundsPageView(null, this.games, gameName);
      this.sound = new Sound(PIANO_SOUND);

      this.games.forEach((game: RoundType) => {
        const roundPage = this.view.initGameOptionsList(game);

        roundPage.onplay = (round: RoundType) => {
          const gameView = new ViewConstructor(
            this.view.node,
            round,
            this.sound,
            Constructor,
          );
          gameView.onRepeat = (quiz) => gameView.init().startGameCycle(quiz);
          gameView.onQuit = () => this.view.stop();
        };
      });
    });
  }
}

export default GameRoundsController;
