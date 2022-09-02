import {
  CategoryId,
  GameId,
  IGamesData,
  RoundType,
} from '../../types/game-types';

class GamesLoader {
  private url: string;

  private games: IGamesData | Record<string, never>;

  constructor(url: string) {
    this.url = url;
    this.games = {};
  }

  private loadGamesGata(url: string): Promise<IGamesData> {
    return fetch(url).then((res) => res.json());
  }

  public loadRounds(
    categoryId: CategoryId,
    gameId: GameId,
  ): Promise<RoundType[] | void> {
    return this.loadGamesGata(this.url)
      .then((games) => {
        this.games = games;
        return this.games.categories?.[categoryId].games?.[gameId].quizes || [];
      })
      .catch(() => {
        console.log("Couldn't load games.");
      });
  }
}

export default GamesLoader;
