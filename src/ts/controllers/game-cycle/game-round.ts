import IGameResult from '../../types/game-results';
import { IRound } from '../../types/game-types';
import GameRoundView from '../../views/game-cycle-view/game-round-view';
import Sound from '../sound';
import AbstractGameQuiz from './abstract-game-quiz';
import GameIndicators from './game-indicators';

type GameQuizConstructor = new (quiz: IRound, round: number, sound: Sound) => AbstractGameQuiz;

class GameRound<QuizType extends IRound = IRound> {
  private readonly rounds: number;

  private readonly terms: readonly string[];

  private readonly sound: Sound;

  private readonly GameQuizConstructor: GameQuizConstructor;

  private readonly view: GameRoundView;

  private readonly gameIndicators: GameIndicators;

  private round: number;

  public onQuit!: () => void;

  public onFinish!: () => void;

  public onRepeat!: () => void;

  constructor(
    parentNode: HTMLElement,
    quiz: QuizType,
    GameQuizConstructor: GameQuizConstructor,
    sound: Sound,
  ) {
    this.rounds = quiz.rounds;
    this.terms = quiz.terms;

    this.sound = sound;

    this.GameQuizConstructor = GameQuizConstructor;

    this.gameIndicators = new GameIndicators({
      gameName: quiz.quizId,
      scoreForRightAnswer: quiz.score,
      roundsCount: quiz.rounds,
      bonusTime: quiz.bonus,
    });
    this.round = 0;

    this.view = new GameRoundView(parentNode, quiz.terms);

    this.view.onGameStart = () => this.startGameCycle(quiz);
    this.view.onGameBack = () => this.quit();
    this.view.onGameRepeat = () => this.repeat();

    document.addEventListener('ongameend', (({ detail }: CustomEvent) => this.finishGameCycle(detail)) as EventListener);
  }

  private quit() {
    window.location.hash = '#';
    /**
     * @todo Back to games list.
     */
    this.view.remove();
    this.onQuit();
  }

  private repeat() {
    this.view.remove();
    this.onRepeat();
  }

  public startGameCycle(quiz: QuizType) {
    this.view.renderGame(quiz.quizName, quiz.game.gameName);
    this.createNewQuestion(this.rounds, quiz);
  }

  public createNewQuestion(rounds: number, question: QuizType) {
    const quiz = new this.GameQuizConstructor(question, this.round, this.sound);

    this.view.renderQuiz(quiz.view.node);

    quiz.onSkip = () => {
      this.gameIndicators.increaseFinesCounter();
      quiz.view.remove();
      this.createNewQuestion(rounds, question);
    };

    quiz.onAnswer = (answer: boolean) => {
      if (answer) this.gameIndicators.increaseRightAnswersCounter();
    };

    quiz.onNext = () => {
      quiz.view.remove();
      this.round += 1;
      this.createNewQuestion(rounds - 1, question);
    };

    quiz.onFinish = () => this.gameIndicators.finishGame();
  }

  public finishGameCycle(result: IGameResult) {
    this.view.renderEndScreen(result);
  }
}

export default GameRound;
