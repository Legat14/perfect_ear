import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { IGameResult, Languages } from '../../types/data-types';
import { IQuizGame, IRound } from '../../types/game-types';
import Preloader from '../components/preloader';
import GameRoundEndScreen from './round-end-screen';
import GameRoundStartScreen from './round-start-screen';

class GameRoundView extends NodeBuilder {
  public startScreen!: GameRoundStartScreen;

  public endScreen!: GameRoundEndScreen;

  public gameNode!: NodeBuilder<HTMLElement>;

  public onGameStart!: () => void;

  public onGameBack!: () => void;

  public onGameRepeat!: () => void;

  public onGameContinue!: () => void;

  public state: keyof typeof Languages;

  public preloader: Preloader;

  constructor(parentNode: HTMLElement, terms: IRound, state: keyof typeof Languages) {
    super({ parentNode });
    this.state = state;
    this.renderStartScreen(terms, state);
    this.preloader = new Preloader(null);
  }

  public renderStartScreen(terms: IRound, state: keyof typeof Languages): void {
    this.startScreen = new GameRoundStartScreen(this.node, terms, state);
    this.startScreen.onQuit = () => this.onGameBack();
    this.startScreen.onQuizStart = () => this.onGameStart();
  }

  public renderGame(quizName: IRound['quizName'], gameName: IQuizGame['gameName']): void {
    this.clear();

    const header = new NodeBuilder({
      parentNode: this.node,
      tagName: 'header',
      className: 'quiz-header',
      content: `<div class="quiz-header__column">
                <h2 class="quiz-header__quiz-name">${quizName[this.state]}</h2>
                <h3 class="quiz-header__game-name">${gameName[this.state]}</h3></div>`,
    }).node;

    const backButton = new ButtonBuilder({
      parentNode: header,
      className: 'field__back-btn',
      content: '←',
    }).node;
    backButton.onclick = () => this.onGameBack();

    header.prepend(backButton);

    this.gameNode = new NodeBuilder({ parentNode: this.node, className: 'game' });
    this.gameNode.append(this.preloader.node);
  }

  public renderQuiz(quiz: HTMLElement): void {
    this.gameNode.clear();
    this.gameNode.append(quiz);
  }

  public renderEndScreen(
    result: IGameResult,
    state: keyof typeof Languages,
    nextGameName?: IRound['quizName'],
  ): void {
    this.clear();

    this.endScreen = new GameRoundEndScreen(this.node, result, state, nextGameName);
    this.endScreen.onRepeat = () => this.onGameRepeat();
    this.endScreen.onQuit = () => this.onGameBack();
    this.endScreen.onContinue = () => this.onGameContinue();
    /**
     * @todo Continue to next game;
     */
  }
}

export default GameRoundView;
