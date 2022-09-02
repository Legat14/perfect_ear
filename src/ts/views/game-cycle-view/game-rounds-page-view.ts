import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { RoundType } from '../../types/game-types';

class GameRoundsPageView extends NodeBuilder {
  public games: (RoundType)[];

  gamesList!: HTMLElement;

  onplay!: (game: RoundType) => void;

  constructor(parentNode: HTMLElement | null, games: (RoundType)[]) {
    super({ parentNode, className: 'rounds-page' });
    this.games = games;
    this.gamesList = new NodeBuilder({
      parentNode: this.node,
      className: 'rounds-page__round',
    }).node;
  }

  public initGameOptionsList(game: RoundType /* bestScore: number */): this {
    const gameOption = new ButtonBuilder({
      parentNode: this.gamesList,
      className: 'round-option',
      content: `
                <p class="round-option__round-title">${game.quizName}</p>
                <p class="round-option__round-direction">${game.direction}</p>
                <p class="round-option__round-count">${game.rounds} вопросов</p>
                `,
    //          <p class="round-option__best-score">лучший счет: ${bestScore} вопросов</p>
    });
    gameOption.node.onclick = () => this.play(game);
    return this;
  }

  public play(game: RoundType): void {
    this.clear();
    this.onplay(game);
  }

  public stop(): void {
    this.append(this.gamesList);
  }
}

export default GameRoundsPageView;
