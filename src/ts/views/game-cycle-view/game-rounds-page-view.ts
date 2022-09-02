import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { GameName, RoundType } from '../../types/game-types';

class GameRoundsPageView extends NodeBuilder {
  public games: (RoundType)[];

  pageContainer!: HTMLElement;

  onplay!: (game: RoundType) => void;

  constructor(parentNode: HTMLElement | null, games: (RoundType)[], name: GameName) {
    super({ parentNode, className: 'rounds-page' });
    this.games = games;

    this.pageContainer = new NodeBuilder({
      parentNode: this.node,
      className: 'rounds-page__container',
    }).node;

    const backButton = new ButtonBuilder({
      parentNode: this.pageContainer,
      className: 'field__back-btn',
      content: '←',
    }).node;

    backButton.onclick = (): void => {
      window.location.hash = window.location.hash.split('/').slice(0, -1).join('/');
    };

    new NodeBuilder({
      parentNode: this.pageContainer,
      tagName: 'header',
      className: 'rounds-page-header',
      content: `<div><h2 class="ear-header__h2">${name}</h2></div>`,
    }).node.prepend(backButton);
  }

  public initGameOptionsList(game: RoundType, bestScore?: number): this {
    const gameOption = new ButtonBuilder({
      parentNode: this.pageContainer,
      className: 'round-option',
      content: `
                <p class="round-option__round-title">${game.quizName}</p>
                <p class="round-option__round-direction">${game.direction}</p>
                <p class="round-option__round-count">${game.rounds} вопросов</p>
                <p class="round-option__bestscore">лучший счет: ${bestScore || ''}</p>
                `,
    });
    gameOption.node.onclick = () => this.play(game);
    return this;
  }

  public play(game: RoundType): void {
    this.clear();
    this.onplay(game);
  }

  public stop(): void {
    this.append(this.pageContainer);
  }
}

export default GameRoundsPageView;