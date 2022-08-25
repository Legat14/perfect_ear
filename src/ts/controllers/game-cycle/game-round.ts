import Repeater from '../../helpers/repeater';
import { IGameResult, IQuestion, SequenceDirection } from '../../types/game-types';
import GameRoundView from '../../views/game-cycle-view/game-round-view';
import AbstractGameQuiz from './abstract-game-quiz';
import GameIndicators from './game-indicators';

type GameQuizConstructor<QuizType> = new (question: QuizType, round: number) => AbstractGameQuiz;

class GameRound<QuizType extends IQuestion = IQuestion> {
  private readonly gameId: string;

  private readonly gameName: string;

  private readonly direction: SequenceDirection;

  private readonly score: number;

  private readonly rounds: number;

  private readonly GameQuizConstructor: GameQuizConstructor<QuizType>;

  private readonly view: GameRoundView;

  private readonly gameIndicators: GameIndicators;

  private round: number;

  public onQuit!: () => void;

  public onFinish!: () => void;

  constructor(
    parentNode: HTMLElement,
    gameId: string,
    gameName: string,
    direction: SequenceDirection,
    score: number,
    rounds: number,
    bonus: number,
    question: QuizType,
    GameQuizConstructor: GameQuizConstructor<QuizType>,
  ) {
    this.gameId = gameId;
    this.gameName = gameName;
    this.direction = direction;
    this.score = score;
    this.rounds = rounds;

    this.GameQuizConstructor = GameQuizConstructor;

    this.gameIndicators = new GameIndicators({
      scoreForRightAnswer: score,
      roundsCount: rounds,
      bonusTime: bonus,
    });
    this.round = 0;

    this.view = new GameRoundView(parentNode);

    this.view.onGameStart = () => this.startGameCycle(question);
    this.view.onGameBack = () => this.back();

    this.view.node.addEventListener('ongameend', (({ detail }: CustomEvent) => this.finishGameCycle(detail)) as EventListener);
  }

  private back() {
    this.view.remove();
    this.onQuit();
  }

  public startGameCycle(question: QuizType) {
    this.view.renderGame(question.game.gameName);
    Repeater.repeat(this.createNewQuestion, this.rounds, question);
  }

  public createNewQuestion(question: QuizType) {
    const quiz = new this.GameQuizConstructor(question, this.round);

    this.view.renderQuiz(quiz.view.node);

    quiz.onSkip = () => {
      this.gameIndicators.increaseFinesCounter();
      this.createNewQuestion(question);
    };

    quiz.onAnswer = (answer: boolean) => {
      this.round += 1;
      if (answer) this.gameIndicators.increaseRightAnswersCounter();
    };

    quiz.onFinish = () => this.gameIndicators.finishGame();
  }

  public finishGameCycle(result: IGameResult) {
    this.view.renderEndScreen(result);
  }
}

export default GameRound;