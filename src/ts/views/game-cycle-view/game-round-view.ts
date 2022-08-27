import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import IGameResult from '../../types/game-results';
import { IQuizGame, IRound } from '../../types/game-types';
import GameRoundEndScreen from './round-end-screen';
import GameRoundStartScreen from './round-start-screen';

class GameRoundView extends NodeBuilder {
  public startScreen!: GameRoundStartScreen;

  public endScreen!: GameRoundEndScreen;

  public gameNode!: NodeBuilder<HTMLElement>;

  public onGameStart!: () => void;

  public onGameBack!: () => void;

  public onGameRepeat!: () => void;

  constructor(parentNode: HTMLElement, terms: IRound['terms']) {
    super({ parentNode });

    this.renderStartScreen(terms);
  }

  public renderStartScreen(terms: IRound['terms']): void {
    this.startScreen = new GameRoundStartScreen(this.node, terms);
    this.startScreen.onQuizStart = () => this.onGameStart();
  }

  public renderGame(quizName: IRound['quizName'], gameName: IQuizGame['gameName']): void {
    this.clear();

    const header = new NodeBuilder({
      parentNode: this.node,
      tagName: 'header',
      className: 'quiz-header',
      content: `<div><h1 class="quiz-header__quiz-name">${quizName}</h1><h2 class="quiz-header__game-name">${gameName}</h2></div>`,
    }).node;

    const backButton = new ButtonBuilder({
      parentNode: header,
      className: 'quiz-header__back-to-main-btn',
      content: '←',
    }).node;
    backButton.onclick = () => this.onGameBack();

    header.prepend(backButton);

    this.gameNode = new NodeBuilder({ parentNode: this.node, className: 'game' });
  }

  public renderQuiz(quiz: HTMLElement): void {
    this.gameNode.clear();
    this.gameNode.append(quiz);
  }

  public renderEndScreen(result: IGameResult, nextGameName?: IRound['quizName']): void {
    this.clear();

    this.endScreen = new GameRoundEndScreen(this.node, result, nextGameName);
    this.endScreen.onRepeat = () => this.onGameRepeat();
    this.endScreen.onQuit = () => this.onGameBack();
    /**
     * @todo Continue to next game;
     */
  }
}

export default GameRoundView;
