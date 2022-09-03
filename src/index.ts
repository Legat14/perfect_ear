import './scss/main.scss';
import './ts/router/router';
import './ts/controllers/sound';
import './ts/views/main-page-creator';
// import './ts/controllers/app-loader';
import GameIndicators from './ts/controllers/game-cycle/game-indicators';
import appLoader from './ts/controllers/app-loader';

const gameIndicators = new GameIndicators({
  gameName: 'IntervalGame-01',
  scoreForRightAnswer: 300,
  roundsCount: 10,
  bonusTime: 10000,
});

const stopGame = (): void => {
  console.log('Timer is set');
  setTimeout((): void => {
    console.log('Timer is stoped');
    gameIndicators.finishGame();
    appLoader.userDayStatisticHandler.refrashCounters();
    appLoader.userStatisticHandler.refrashCounters();
  }, 2000);
};

stopGame();

gameIndicators.increaseRightAnswersCounter();
gameIndicators.increaseRightAnswersCounter();
gameIndicators.increaseRightAnswersCounter();
gameIndicators.increaseRightAnswersCounter();
gameIndicators.increaseRightAnswersCounter();
gameIndicators.increaseFinesCounter();
gameIndicators.increaseFinesCounter();
