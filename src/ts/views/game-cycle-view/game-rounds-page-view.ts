import Translation from '../../constants/translation';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { IExerciseResult, Languages } from '../../types/data-types';
import { GameName, IRound } from '../../types/game-types';

class GameRoundsPageView<QuizType extends IRound = IRound> extends NodeBuilder {
  public games: (QuizType)[];

  pageContainer!: HTMLElement;

  onplay!: (game: QuizType) => void;

  constructor(
    parentNode: HTMLElement | null,
    games: (QuizType)[],
    name: GameName[keyof typeof Languages],
  ) {
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

  public initGameOptionsList(
    game: QuizType,
    results: IExerciseResult[],
    state: keyof typeof Languages,
  ): this {
    const gameOption = new ButtonBuilder({
      parentNode: this.pageContainer,
      className: 'round-option',
      content: `
                <p class="round-option__round-title">${game.quizName[state]}</p>
                <p class="round-option__round-direction">${game.direction}</p>
                <p class="round-option__round-count">${game.rounds} ${Translation.roundsPageTasksCount[state]}</p>
                `,
    });

    const score = new NodeBuilder({
      parentNode: gameOption.node,
      tagName: 'p',
      className: 'round-option__bestscore',
      content: `${Translation.roundsPageHighScoreCount[state]}: ${results.find((ex) => ex.exercise === game.quizId)?.score || '0'}`,
    }).node;

    gameOption.node.onclick = () => this.play(game);

    document.addEventListener('ongameend', (() => {
      score.textContent = `${Translation.roundsPageHighScoreCount[state]}: ${results.find((ex) => ex.exercise === game.quizId)?.score || '0'}`;
    }) as EventListener);

    return this;
  }

  public play(game: QuizType): void {
    this.clear();
    this.onplay(game);
  }

  public stop(): void {
    this.append(this.pageContainer);
  }
}

export default GameRoundsPageView;
