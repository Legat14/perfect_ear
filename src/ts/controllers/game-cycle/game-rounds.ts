import { PIANO_SOUND } from '../../constants/constants';
import {
  CategoryId,
  GameId,
  GameName,
  IRound,
} from '../../types/game-types';
import { IExerciseResult, Languages } from '../../types/data-types';
import Sound from '../sound';
import GamesLoader from './games-loader';
import GameRoundsPageView from '../../views/game-cycle-view/game-rounds-page-view';
import { GameQuizConstructor } from './game-round';
import AbstractGameView from '../../views/games/abstract-game-view';

export type GameQuizViewConstructor<QuizType extends IRound = IRound> =
  new (
    parentNode: HTMLElement | null,
    quiz: QuizType,
    sound: Sound,
    Constructor: GameQuizConstructor<QuizType>,
    state: keyof typeof Languages,
  ) => AbstractGameView<QuizType>;

class GameRoundsController<QuizType extends IRound = IRound> {
  public games!: QuizType[];

  public view!: GameRoundsPageView<QuizType>;

  public sound!: Sound;

  public load(
    loader: GamesLoader,
    categoryId: CategoryId,
    gameId: GameId,
    gameName: GameName,
    Constructor: GameQuizConstructor<QuizType>,
    ViewConstructor: GameQuizViewConstructor<QuizType>,
    results: IExerciseResult[],
    state: keyof typeof Languages,
  ) {
    return loader.loadRounds<QuizType>(categoryId, gameId).then((games) => {
      this.games = games || [];
      this.view = new GameRoundsPageView<QuizType>(null, this.games, gameName);
      this.sound = new Sound(PIANO_SOUND);

      this.games.forEach((game: QuizType) => {
        const roundPage = this.view.initGameOptionsList(game, results, state);

        roundPage.onplay = (round: QuizType) => {
          const gameView = new ViewConstructor(
            this.view.node,
            round,
            this.sound,
            Constructor,
            state,
          );
          gameView.onRepeat = (quiz) => gameView.init().startGameCycle(quiz);
          gameView.onQuit = () => this.view.stop();
        };
      });
    });
  }
}

export default GameRoundsController;
