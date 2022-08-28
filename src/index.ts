import './scss/main.scss';
import './ts/router/router';
import './ts/controllers/sound';
import './ts/models/user-profile';
import userDataHandler from './ts/controllers/user-data-handlers/user-data-handler';
import GameIndicators from './ts/controllers/game-cycle/game-indicators';
import UserDayStatisticHandler from './ts/controllers/user-data-handlers/user-day-statistic-handler';
import viewsController from './ts/views/main-page-creator';

const gameIndicators = new GameIndicators({
  gameName: 'IntervalGame-01',
  scoreForRightAnswer: 300,
  roundsCount: 10,
  bonusTime: 10000,
});

const userDayStatisticHandler = new UserDayStatisticHandler(
  userDataHandler.userProfile,
  viewsController.mainMenu.userDayStatistic.userDayStatisticCounters,
);

const stopGame = (): void => {
  console.log('Timer is set');
  setTimeout((): void => {
    console.log('Timer is stoped');
    gameIndicators.finishGame();
    userDayStatisticHandler.refrashCounters();
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
console.log(userDayStatisticHandler);
