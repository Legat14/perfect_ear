import NodeBuilder from '../helpers/node-builder';
import { IUserDayStatisticCounters } from '../types/data-types';

class UserDayStatisticView extends NodeBuilder {
  userDayStatisticCounters: IUserDayStatisticCounters;

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

    const exercisesCounterTitle = new NodeBuilder({
      parentNode: exercisesCounter.node,
      tagName: 'p',
      content: 'Упражнений',
      className: 'user-day-statistic__exercises-counter-title',
    });

    const exercisesIndicator = new NodeBuilder<HTMLInputElement>({
      parentNode: exercisesCounter.node,
      tagName: 'progress',
      content: '0',
      className: 'user-day-statistic__exercises-indicator-counter',
      attributes: { max: 100, value: 0 },
    });

    const exercisesCounterNumber = new NodeBuilder({
      parentNode: exercisesCounter.node,
      tagName: 'p',
      content: '0',
      className: 'user-day-statistic__exercises-counter-number',
    });

    const scoreCounter = new NodeBuilder({
      parentNode: userDayStatisticCountersDiv.node,
      tagName: 'div',
      className: 'user-day-statistic__score-counter',
    });

    const scoreCounterTitle = new NodeBuilder({
      parentNode: scoreCounter.node,
      tagName: 'p',
      content: 'Очков',
      className: 'user-day-statistic__score-counter-title',
    });

    const scoreIndicator = new NodeBuilder<HTMLInputElement>({
      parentNode: scoreCounter.node,
      tagName: 'progress',
      content: '0',
      className: 'user-day-statistic__score-indicator-counter',
      attributes: { max: 100, value: 0 },
    });

    const scoreCounterNumber = new NodeBuilder({
      parentNode: scoreCounter.node,
      tagName: 'p',
      content: '0',
      className: 'user-day-statistic__score-counter-number',
    });

    const timeCounter = new NodeBuilder({
      parentNode: userDayStatisticCountersDiv.node,
      tagName: 'div',
      className: 'user-day-statistic__time-counter',
    });

    const timeCounterTitle = new NodeBuilder({
      parentNode: timeCounter.node,
      tagName: 'p',
      content: 'Времени',
      className: 'user-day-statistic__time-counter-title',
    });

    const timeIndicator = new NodeBuilder<HTMLInputElement>({
      parentNode: timeCounter.node,
      tagName: 'progress',
      content: '0',
      className: 'user-day-statistic__time-indicator-counter',
      attributes: { max: 100, value: 0 },
    });

    const timeCounterNumber = new NodeBuilder({
      parentNode: timeCounter.node,
      tagName: 'p',
      content: '0',
      className: 'user-day-statistic__time-counter-number',
    });

    this.userDayStatisticCounters = {
      exercisesCounter: exercisesCounterNumber.node,
      exercisesIndicator: exercisesIndicator.node,
      scoreCounter: scoreCounterNumber.node,
      scoreIndicator: scoreIndicator.node,
      timeCounter: timeCounterNumber.node,
      timeIndicator: timeIndicator.node,
    };

    console.log(userDayStatisticTitle);
    console.log(exercisesCounterNumber);
    console.log(exercisesCounterTitle);
    console.log(scoreCounterNumber);
    console.log(scoreCounterTitle);
    console.log(timeCounterNumber);
    console.log(timeCounterTitle);
    console.log(this.userDayStatisticCounters);
  }
}

export default UserDayStatisticView;
