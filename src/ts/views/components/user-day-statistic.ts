import LangPack from '../../constants/translation';
import LangEmitter from '../../controllers/emitters/lang-emitter';
import NodeBuilder from '../../helpers/node-builder';
import { IUserDayStatisticCounters, Languages } from '../../types/data-types';

class UserDayStatisticView extends NodeBuilder {
  userDayStatisticCounters: IUserDayStatisticCounters;

  constructor(parentNode: HTMLElement, state: keyof typeof Languages = 'RUS') {
    super({ parentNode, className: 'main-menu__user-day-statistic' });

    const userDayStatisticTitle = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: LangPack[state]['19'],
      className: 'user-day-statistic__title',
    });
    LangEmitter.add((content) => {
      userDayStatisticTitle.node.innerHTML = content['19'];
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
      content: LangPack[state]['20'],
      className: 'user-day-statistic__exercises-counter-title',
    });
    LangEmitter.add((content) => {
      exercisesCounterTitle.node.innerHTML = content['20'];
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
      content: LangPack[state]['21'],
      className: 'user-day-statistic__score-counter-title',
    });
    LangEmitter.add((content) => {
      scoreCounterTitle.node.innerHTML = content['21'];
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
      content: LangPack[state]['22'],
      className: 'user-day-statistic__time-counter-title',
    });
    LangEmitter.add((content) => {
      timeCounterTitle.node.innerHTML = content['22'];
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
