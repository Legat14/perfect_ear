import Translation from '../../constants/translation';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { IGameResult, Languages } from '../../types/data-types';
import { IRound } from '../../types/game-types';

class GameRoundEndScreen extends NodeBuilder {
  public onQuit!: () => void;

  public onRepeat!: () => void;

  public onContinue!: () => void;

  constructor(
    parentNode: HTMLElement,
    {
      gameScore,
      rightAnswersScore,
      timeBonusScore,
      finesScore,
      rightAnswersCountToRoundCount,
      averageTimeHR,
      gameTimeHR,
    }: IGameResult,
    state: keyof typeof Languages,
    nextGame?: IRound['quizName'],
  ) {
    super({
      parentNode,
      className: 'quiz__quiz-end-screen quiz-end-screen',
      content: `
                <div class="quiz__quiz-end-screen_result">
                <p class="indicators__indicator-title">${Translation.gameEndScreenPoints[state]}: <span class="indicators__indicator-score">${rightAnswersScore}</span></p>
                <p class="indicators__indicator-title">${Translation.gameEndScreenTimeBonus[state]}: <span class="indicators__indicator-score">${timeBonusScore}</span></p>
                <p class="indicators__indicator-title">${Translation.gameEndScreenSkips[state]}: <span class="indicators__indicator-score">- ${finesScore}</span></p>
                <p class="indicators__indicator-title">${Translation.gameEndScreenTotal[state]}: <span class="indicators__indicator-score">${gameScore}</span></p>
                <p class="indicators__indicator-title indicators__indicator-title_labeled">${Translation.gameEndScreenCorrectAnswers[state]}:
                  <span class="indicators__indicator-score indicators__indicator-score_labeled">${rightAnswersCountToRoundCount}</span>
                </p>
                <p class="indicators__indicator-title indicators__indicator-title_labeled">${Translation.gameEndScreenAvgAnswerTime[state]}:
                  <span class="indicators__indicator-score indicators__indicator-score_labeled">${averageTimeHR}</span>
                </p>
                <p class="indicators__indicator-title indicators__indicator-title_labeled">${Translation.gameEndScreenCompletionTime[state]}:
                  <span class="indicators__indicator-score indicators__indicator-score_labeled">${gameTimeHR}</span>
                </p>
                </div>
                `,
    });

    const header = new NodeBuilder({ tagName: 'header', parentNode: null, className: 'quiz-end-screen__header' }).node;
    this.node.prepend(header);

    const quitControl = new ButtonBuilder({
      parentNode: null,
      className: 'field__back-btn field__back-btn_x',
      content: '×',
    });
    quitControl.node.onclick = () => this.onQuit();

    const resultGame = new NodeBuilder({
      parentNode: null,
      tagName: 'div',
      className: 'quiz-end__header',
      content: `<h2 class="quiz-end__h2">${Translation.gameEndScreenResultsHeader[state]}</h2>`,
    });
    header.append(quitControl.node, resultGame.node);

    const footer = new NodeBuilder({ parentNode: this.node, className: 'quiz-controls' }).node;

    const repeatControl = new ButtonBuilder({
      parentNode: footer,
      className: 'quiz-end-screen__repeat',
      content: Translation.gameEndScreenRetryBtn[state],
    });
    repeatControl.node.onclick = () => this.onRepeat();

    const continueControl = new ButtonBuilder({
      parentNode: footer,
      className: 'quiz-end-screen__continue continue',
      content: `${nextGame ? `<span>${Translation.gameEndScreenContinueBtn[state]}</span><br><span continue__game-title>${nextGame[state]}</span>` : Translation.gameEndScreenMenuBtn[state]}`,
    });
    continueControl.node.onclick = nextGame ? () => this.onContinue() : () => this.onQuit();
  }
}

export default GameRoundEndScreen;
