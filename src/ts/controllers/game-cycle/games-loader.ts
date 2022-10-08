import {
  CategoryId,
  GameId,
  IGamesData,
  IRound,
} from '../../types/game-types';

class GamesLoader {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  private loadGamesGata(url: string): Promise<IGamesData> {
    return fetch(url).then((res) => res.json());
  }

  public loadRounds<QuizType extends IRound = IRound>(
    categoryId: CategoryId,
    gameId: GameId,
  ): Promise<QuizType[] | void> {
    return this.loadGamesGata(this.url)
      .then((games) => (
        games as IGamesData<QuizType>).categories?.[categoryId].games?.[gameId].quizes || [])
      .catch(() => {
        console.log("Couldn't load games.");
      });
  }
}

export default GamesLoader;
