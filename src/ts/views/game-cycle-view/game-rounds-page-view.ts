import Translation from '../../constants/translation';
import { LangEmitter } from '../../controllers/emitters/emitters';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { IExerciseResult, Languages } from '../../types/data-types';
import { GameName, IRound } from '../../types/game-types';

class GameRoundsPageView<QuizType extends IRound = IRound> extends NodeBuilder {
  public games: (QuizType)[];

  pageContainer!: HTMLElement;

  roundPage: NodeBuilder<HTMLElement>;

  onplay!: (game: QuizType) => void;

  constructor(
    parentNode: HTMLElement | null,
    games: (QuizType)[],
    name: GameName,
    state: keyof typeof Languages,
  ) {
    super({ parentNode, className: 'rounds-page' });
    this.games = games;

    this.pageContainer = new NodeBuilder({
      parentNode: this.node,
      className: 'rounds-page__container',
    }).node;

    const header = new NodeBuilder({
      parentNode: this.pageContainer,
      tagName: 'header',
      className: 'rounds-page-header',
    }).node;

    const backButton = new ButtonBuilder({
      parentNode: header,
      className: 'field__back-btn',
      content: '←',
    }).node;

    const gameName = new NodeBuilder({
      parentNode: header,
      content: `<h2 class="ear-header__h2">${name[state]}</h2>`,
    });

    backButton.onclick = (): void => {
      window.location.hash = window.location.hash.split('/').slice(0, -1).join('/');
    };

    LangEmitter.add((language) => {
      gameName.node.innerHTML = `<h2 class="ear-header__h2">${name[language]}</h2>`;
    });

    this.roundPage = new NodeBuilder({ parentNode: this.pageContainer });
  }

  public initGameOptionsList(
    game: QuizType,
    results: IExerciseResult[],
    state: keyof typeof Languages,
  ): this {
    const gameOption = new ButtonBuilder({
      parentNode: this.roundPage.node,
      className: 'round-option',
      content: `
                <p class="round-option__round-title">${game.quizName[state]}</p>
                <p class="round-option__round-direction">${game.direction[state]}</p>
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
