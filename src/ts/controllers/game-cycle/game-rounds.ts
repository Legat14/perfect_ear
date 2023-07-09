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
import {
  LangEmitter,
  TempoEmitter,
  VolumeEmitter,
} from '../emitters/emitters';
import Iterator from '../../helpers/iterator';

export type GameQuizViewConstructor<QuizType extends IRound = IRound> = new (
  parentNode: HTMLElement | null,
  quiz: QuizType,
  sound: Sound,
  Constructor: GameQuizConstructor<QuizType>,
  state: {
    language: keyof typeof Languages;
    volume: number;
  },
  nextGame?: QuizType
) => AbstractGameView<QuizType>;

class GameRoundsController<QuizType extends IRound = IRound> {
  public games!: QuizType[];

  public view!: GameRoundsPageView<QuizType>;

  public sound!: Sound;

  public state!: {
    language: keyof typeof Languages;
    volume: number;
    tempo: number;
  };

  public load(
    loader: GamesLoader,
    categoryId: CategoryId,
    gameId: GameId,
    gameName: GameName,
    Constructor: GameQuizConstructor<QuizType>,
    ViewConstructor: GameQuizViewConstructor<QuizType>,
    results: IExerciseResult[],
    state: {
      language: keyof typeof Languages;
      volume: number;
      tempo: number;
    },
  ) {
    return loader.loadRounds<QuizType>(categoryId, gameId).then((games) => {
      this.games = games || [];
      this.view = new GameRoundsPageView<QuizType>(
        null,
        this.games,
        gameName,
        state.language,
      );
      this.sound = new Sound({
        ...PIANO_SOUND,
        volume: state.volume,
        tactDuration: state.tempo,
      });
      this.state = state;

      this.initGames(Constructor, ViewConstructor, results, state);

      LangEmitter.add((language) => {
        this.view.roundPage.clear();
        this.state = { ...this.state, language };
        this.initGames(Constructor, ViewConstructor, results, this.state);
      });

      VolumeEmitter.add((volume) => {
        this.sound.volume = volume;

        this.view.roundPage.clear();
        this.state = { ...this.state, volume };
        this.initGames(Constructor, ViewConstructor, results, this.state);
      });

      TempoEmitter.add((tempo) => {
        this.sound.tactDuration = tempo;
      });
    });
  }

  private initGames(
    Constructor: GameQuizConstructor<QuizType>,
    ViewConstructor: GameQuizViewConstructor<QuizType>,
    results: IExerciseResult[],
    state: {
      language: keyof typeof Languages;
      volume: number;
    },
  ) {
    this.games.forEach((game: QuizType, i, games) => {
      const roundPage = this.view.initGameOptionsList(
        game,
        results,
        state.language,
        games[i + 1],
      );

      roundPage.onplay = (round: QuizType, nextRound?: QuizType) => {
        const gameView = new ViewConstructor(
          this.view.node,
          round,
          this.sound,
          Constructor,
          state,
          nextRound,
        );

        gameView.onRepeat = (quiz) => gameView.init().startGameCycle(quiz);

        gameView.onContinue = (quiz) => {
          if (quiz) {
            const gamesIterator = Iterator.createArrayIterator()<QuizType>(
              games,
              games.indexOf(quiz) + 1,
            );
            gameView.quiz = quiz;
            gameView.nextGame = gamesIterator.next().value;
            gameView.init().startGameCycle(quiz);
          }
        };

        gameView.onQuit = () => this.view.stop();
      };
    });
  }
}

export default GameRoundsController;
