import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { IGameResult, IQuestion } from '../../types/game-types';
import GameRoundEndScreen from './round-end-screen';
import GameRoundStartScreen from './round-start-screen';

class GameRoundView extends NodeBuilder {
  startScreen!: GameRoundStartScreen;

  endScreen!: GameRoundEndScreen;

  gameNode!: NodeBuilder<HTMLElement>;

  onGameStart!: () => void;

  onGameBack!: () => void;

  constructor(parentNode: HTMLElement) {
    super({ parentNode });

    this.renderStartScreen();
  }

  public renderStartScreen() {
    this.startScreen = new GameRoundStartScreen(this.node);
  }

  public renderGame(gameName: string) {
    this.clear();

    const header = new NodeBuilder({ parentNode: this.node, tagName: 'header' }).node;
    const backButton = new ButtonBuilder({ parentNode: header, content: '' });
    const headerGameName = new NodeBuilder({ parentNode: header, content: gameName });

    this.gameNode = new NodeBuilder({ parentNode: this.node, className: `game ${headerGameName}` });

    backButton.node.onclick = () => this.onGameBack();
  }

  public renderQuiz(quiz: HTMLElement) {
    this.gameNode.clear();
    this.gameNode.append(quiz);
  }

  public renderEndScreen(result: IGameResult, nextGameName?: IQuestion['quizName']) {
    this.clear();
    this.endScreen = new GameRoundEndScreen(this.node, result, nextGameName);
  }
}

export default GameRoundView;
