import './scss/main.scss';
import './ts/views/main-page-creator';
import './ts/router/router';
import './ts/controllers/sound';
import './ts/models/user-profile';
import userDataHandler from './ts/controllers/user-data-handlers/user-data-handler';
import GameIndicators from './ts/controllers/game-cycle/game-indicators';

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

console.log(userDataHandler);
