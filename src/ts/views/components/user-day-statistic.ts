import Translation from '../../constants/translation';
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
      content: Translation.userDayStatisticTitle[state],
      className: 'user-day-statistic__title',
    });
    LangEmitter.add((lang) => {
      userDayStatisticTitle.node.innerHTML = Translation.userDayStatisticTitle[lang];
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
      content: Translation.exercisesCounterTitle[state],
      className: 'user-day-statistic__exercises-counter-title',
    });
    LangEmitter.add((lang) => {
      exercisesCounterTitle.node.innerHTML = Translation.exercisesCounterTitle[lang];
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
      content: Translation.scoreCounterTitle[state],
      className: 'user-day-statistic__score-counter-title',
    });
    LangEmitter.add((lang) => {
      scoreCounterTitle.node.innerHTML = Translation.scoreCounterTitle[lang];
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
      content: Translation.timeCounterTitle[state],
      className: 'user-day-statistic__time-counter-title',
    });
    LangEmitter.add((lang) => {
      timeCounterTitle.node.innerHTML = Translation.timeCounterTitle[lang];
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
  }
}

export default UserDayStatisticView;
