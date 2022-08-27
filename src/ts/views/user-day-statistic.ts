import NodeBuilder from '../helpers/node-builder';
import { IUserDayStatisticCounters } from '../types/data-types';

class UserDayStatisticView extends NodeBuilder {
  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'main-menu__user-day-statistic' });

    const userDayStatisticTitle = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'Сегодня',
      className: 'user-day-statistic__title',
    });

    const userDayStatisticCountersDiv = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'user-day-statistic__counters',
    });

    const exercisesCounter = new NodeBuilder({
      parentNode: userDayStatisticCountersDiv.node,
      tagName: 'div',
      className: 'user-day-statistic__exercises-counter',
    });

    const exercisesCounterNumber = new NodeBuilder({
      parentNode: exercisesCounter.node,
      tagName: 'p',
      content: '0',
      className: 'user-day-statistic__exercises-counter-number',
    });

    const exercisesCounterTitle = new NodeBuilder({
      parentNode: exercisesCounter.node,
      tagName: 'p',
      content: 'Упражнений',
      className: 'user-day-statistic__exercises-counter-title',
    });

    const scoreCounter = new NodeBuilder({
      parentNode: userDayStatisticCountersDiv.node,
      tagName: 'div',
      className: 'user-day-statistic__score-counter',
    });

    const scoreCounterNumber = new NodeBuilder({
      parentNode: scoreCounter.node,
      tagName: 'p',
      content: '0',
      className: 'user-day-statistic__score-counter-number',
    });

    const scoreCounterTitle = new NodeBuilder({
      parentNode: scoreCounter.node,
      tagName: 'p',
      content: 'Очков',
      className: 'user-day-statistic__score-counter-title',
    });

    const timeCounter = new NodeBuilder({
      parentNode: userDayStatisticCountersDiv.node,
      tagName: 'div',
      className: 'user-day-statistic__time-counter',
    });

    const timeCounterNumber = new NodeBuilder({
      parentNode: timeCounter.node,
      tagName: 'p',
      content: '0',
      className: 'user-day-statistic__time-counter-number',
    });

    const timeCounterTitle = new NodeBuilder({
      parentNode: timeCounter.node,
      tagName: 'p',
      content: 'Времени',
      className: 'user-day-statistic__time-counter-title',
    });

    const userDayStatisticCounters: IUserDayStatisticCounters = {
      exercisesCounter: exercisesCounterNumber.node,
      scoreCounter: scoreCounterNumber.node,
      timeCounter: timeCounterNumber.node,
    };

    console.log(userDayStatisticTitle);
    console.log(exercisesCounterNumber);
    console.log(exercisesCounterTitle);
    console.log(scoreCounterNumber);
    console.log(scoreCounterTitle);
    console.log(timeCounterNumber);
    console.log(timeCounterTitle);
    console.log(timeCounterTitle);
    console.log(userDayStatisticCounters);
  }
}

export default UserDayStatisticView;
