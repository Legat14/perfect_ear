// Это пример использования GameIndicators, который использовался для проверки класса

// import GameIndicators from './ts/controllers/game-cycle/game-indicators';

// document.addEventListener('ongameend', (event: CustomEvent | Event): void => {
//   console.log(event);
//   console.log((event as CustomEvent).detail);
// });

// const gameIndicators = new GameIndicators({
//   scoreForRightAnswer: 300,
//   roundsCount: 10,
//   bonusTime: 10000,
// });

// const stopGame = (): void => {
//   setTimeout((): void => {
//     console.log('Timer is set');
//     gameIndicators.finishGame();
//   }, 11000);
// };

// stopGame();

// gameIndicators.increaseRightAnswersCounter();
// gameIndicators.increaseRightAnswersCounter();
// gameIndicators.increaseRightAnswersCounter();
// gameIndicators.increaseRightAnswersCounter();
// gameIndicators.increaseRightAnswersCounter();
// gameIndicators.increaseFinesCounter();
// gameIndicators.increaseFinesCounter();

import IGameResult from '../../types/game-results';

class GameIndicators {
  private gameScore = 0;

  private rightAnswersScore = 0;

  private finesScore = 0;

  private rightAnswersCount = 0;

  private finesCount = 0;

  private startTime = 0;

  private stopTime = 0;

  private gameTime = 0;

  private averageTime = 0;

  private timeBonusScore = 0;

  private readonly timeBonusMultiplier = 0.1;

  private readonly fineForSkip = 100;

  private scoreForRightAnswer: number;

  private roundsCount: number;

  private bonusTime: number;

  constructor({
    scoreForRightAnswer,
    roundsCount,
    bonusTime,
  }: {
    scoreForRightAnswer: number,
    roundsCount: number,
    bonusTime: number,
  }) {
    this.scoreForRightAnswer = scoreForRightAnswer;
    this.roundsCount = roundsCount;
    this.bonusTime = bonusTime;
    this.startTimer();
  }

  increaseRightAnswersCounter(): void {
    this.rightAnswersCount += 1;
  }

  increaseFinesCounter(): void {
    this.finesCount += 1;
  }

  private startTimer(): void {
    this.startTime = new Date().getTime();
  }

  private stopTimer(): void {
    this.stopTime = new Date().getTime();
  }

  private calculateTime(): void {
    this.gameTime = this.stopTime - this.startTime;
  }

  private getTimeHumanReadableStr(time: number): string {
    const millisecsInSec = 1000;
    const secsInMinute = 60;
    const minutes = (time - (time % (millisecsInSec * secsInMinute)))
    / (millisecsInSec * secsInMinute);
    const timeWithoutMinutes = time - (minutes * millisecsInSec * secsInMinute);
    const secounds = (timeWithoutMinutes - (timeWithoutMinutes % millisecsInSec)) / millisecsInSec;
    const millisecouds = timeWithoutMinutes - (secounds * millisecsInSec);
    const millisecsStr = (`000${millisecouds}`).slice(-3);
    const timeString = `${minutes} мин. ${secounds}.${millisecsStr} сек.`;
    return timeString;
  }

  private calculateAverageTime(): void {
    this.averageTime = Math.round(this.gameTime / this.roundsCount);
  }

  private calculateRightAnswersScore(): void {
    this.rightAnswersScore = this.rightAnswersCount * this.scoreForRightAnswer;
  }

  private calculateTimeBonusScore(): void {
    if (this.gameTime < this.bonusTime) {
      this.timeBonusScore = Math.floor(this.rightAnswersScore * this.timeBonusMultiplier);
    }
  }

  private calculateFinesScore(): void {
    this.finesScore = this.finesCount * this.fineForSkip;
  }

  private calculateGameScore(): void {
    this.gameScore = this.rightAnswersScore + this.timeBonusScore - this.finesScore;
    if (this.gameScore < 0) {
      this.gameScore = 0;
    }
  }

  private calculateIndicators(): void {
    this.stopTimer();
    this.calculateRightAnswersScore();
    this.calculateTime();
    this.calculateAverageTime();
    this.calculateTimeBonusScore();
    this.calculateFinesScore();
    this.calculateGameScore();
  }

  private getResults(): IGameResult {
    const rightAnswersCountToRoundCount = `${this.rightAnswersCount} / ${this.roundsCount}`;
    const gameTimeHR = this.getTimeHumanReadableStr(this.gameTime);
    const averageTimeHR = this.getTimeHumanReadableStr(this.averageTime);
    const result = {
      gameScore: this.gameScore,
      rightAnswersScore: this.rightAnswersScore,
      timeBonusScore: this.timeBonusScore,
      finesScore: this.finesScore,
      rightAnswersCountToRoundCount,
      gameTime: this.gameTime,
      gameTimeHR,
      averageTimeHR,
    };
    return result;
  }

  private makeOnGameEndEvent(): void {
    const result = this.getResults();
    document.dispatchEvent(new CustomEvent('ongameend', {
      detail: result,
    }));
  }

  finishGame(): void {
    this.calculateIndicators();
    this.makeOnGameEndEvent();
  }
}

export default GameIndicators;
