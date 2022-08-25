import NodeBuilder from '../../helpers/node-builder';
import { IGameResult } from '../../types/game-types';

class GameRoundEndScreen extends NodeBuilder {
  private result: IGameResult;

  constructor(parentNode: HTMLElement, result: IGameResult) {
    super({ parentNode });

    this.result = result;
  }
}

export default GameRoundEndScreen;
