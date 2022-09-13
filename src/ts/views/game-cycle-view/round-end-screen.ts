import LangPack from '../../constants/translation';
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
                <p class="indicators__indicator-title">${LangPack[state]['50']}: <span class="indicators__indicator-score">${rightAnswersScore}</span></p>
                <p class="indicators__indicator-title">${LangPack[state]['51']}: <span class="indicators__indicator-score">${timeBonusScore}</span></p>
                <p class="indicators__indicator-title">${LangPack[state]['52']}: <span class="indicators__indicator-score">- ${finesScore}</span></p>
                <p class="indicators__indicator-title">${LangPack[state]['53']}: <span class="indicators__indicator-score">${gameScore}</span></p>
                <p class="indicators__indicator-title indicators__indicator-title_labeled">${LangPack[state]['54']}:
                  <span class="indicators__indicator-score indicators__indicator-score_labeled">${rightAnswersCountToRoundCount}</span>
                </p>
                <p class="indicators__indicator-title indicators__indicator-title_labeled">${LangPack[state]['55']}:
                  <span class="indicators__indicator-score indicators__indicator-score_labeled">${averageTimeHR}</span>
                </p>
                <p class="indicators__indicator-title indicators__indicator-title_labeled">${LangPack[state]['56']}:
                  <span class="indicators__indicator-score indicators__indicator-score_labeled">${gameTimeHR}</span>
                </p>
                </div>
                `,
    });

    const header = new NodeBuilder({ tagName: 'header', parentNode: null, className: 'quiz-end-screen__header' }).node;
    this.node.prepend(header);

    const quitControl = new ButtonBuilder({
      parentNode: header,
      className: 'field__back-btn field__back-btn_x',
      content: '×',
    });
    quitControl.node.onclick = () => this.onQuit();

    const resultGame = new NodeBuilder({
      parentNode: header,
      tagName: 'div',
      className: 'quiz-end__header',
      content: `<h2 class="quiz-end__h2">${LangPack[state][61]}</h2>`,
    });
    console.log(resultGame);

    const footer = new NodeBuilder({ parentNode: this.node, className: 'quiz-controls' }).node;

    const repeatControl = new ButtonBuilder({
      parentNode: footer,
      className: 'quiz-end-screen__repeat',
      content: LangPack[state][62],
    });
    repeatControl.node.onclick = () => this.onRepeat();

    const continueControl = new ButtonBuilder({
      parentNode: footer,
      className: 'quiz-end-screen__continue continue',
      content: `${nextGame ? `<span>${LangPack[state][63]}</span><span continue__game-title>${nextGame}</span>` : LangPack[state][64]}`,
    });
    continueControl.node.onclick = nextGame ? () => this.onContinue() : () => this.onQuit();
  }
}

export default GameRoundEndScreen;
