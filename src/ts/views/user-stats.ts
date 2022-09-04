import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';
import { IUserStatisticCounters } from '../types/data-types';

class UserStatsView extends NodeBuilder {
  backToMainBtn: ButtonBuilder;

  userStatsHeader: NodeBuilder;

  todayDiv: NodeBuilder;

  todaySubDiv1: NodeBuilder;

  todaySubDiv2: NodeBuilder;

  todaySubDiv3: NodeBuilder;

  dayExercisesHeader: NodeBuilder;

  dayExercisesCount: NodeBuilder;

  dayScoreHeader: NodeBuilder;

  dayScoreCount: NodeBuilder;

  dayTimeHeader: NodeBuilder;

  dayTimeCount: NodeBuilder;

  userTotalDiv: NodeBuilder;

  totalSubDiv1: NodeBuilder;

  totalSubDiv2: NodeBuilder;

  totalSubDiv3: NodeBuilder;

  totalSubDiv4: NodeBuilder;

  totalSubDiv5: NodeBuilder;

  totalSubDiv6: NodeBuilder;

  totalExercisesHeader: NodeBuilder;

  totalExercisesCount: NodeBuilder;

  totalScoreHeader: NodeBuilder;

  totalScoreCount: NodeBuilder;

  totalTimeHeader: NodeBuilder;

  totalTimeCount: NodeBuilder;

  totalIntervalGameScoreHeader: NodeBuilder;

  totalIntervalGameScoreCount: NodeBuilder;

  totalScaleGameScoreHeader: NodeBuilder;

  totalScaleGameScoreCount: NodeBuilder;

  totalChordsGameScoreHeader: NodeBuilder;

  totalChordsGameScoreCount: NodeBuilder;

  statisticCounters: IUserStatisticCounters;

  constructor() {
    super({ parentNode: null, className: 'user-stats' });

    this.backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    });

    this.backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });

    this.userStatsHeader = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: 'Статистика',
      className: 'user-stats__header',
    });

    this.todayDiv = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      content: 'Сегодня',
      className: 'user-stats__today-div',
    });

    this.todaySubDiv1 = new NodeBuilder({
      parentNode: this.todayDiv.node,
      tagName: 'div',
      className: 'user-stats__today-sub-div',
    });

    this.dayExercisesHeader = new NodeBuilder({
      parentNode: this.todaySubDiv1.node,
      tagName: 'p',
      className: 'user-stats__day-exercises-header',
      content: 'Упражнений',
    });

    this.dayExercisesCount = new NodeBuilder({
      parentNode: this.todaySubDiv1.node,
      tagName: 'p',
      className: 'user-stats__day-exercises-count',
      content: '0',
    });

    this.todaySubDiv2 = new NodeBuilder({
      parentNode: this.todayDiv.node,
      tagName: 'div',
      className: 'user-stats__today-sub-div',
    });

    this.dayScoreHeader = new NodeBuilder({
      parentNode: this.todaySubDiv2.node,
      tagName: 'p',
      className: 'user-stats__day-score-header',
      content: 'Очков',
    });

    this.dayScoreCount = new NodeBuilder({
      parentNode: this.todaySubDiv2.node,
      tagName: 'p',
      className: 'user-stats__day-score-count',
      content: '0',
    });

    this.todaySubDiv3 = new NodeBuilder({
      parentNode: this.todayDiv.node,
      tagName: 'div',
      className: 'user-stats__today-sub-div',
    });

    this.dayTimeHeader = new NodeBuilder({
      parentNode: this.todaySubDiv3.node,
      tagName: 'p',
      className: 'user-stats__day-time-header',
      content: 'Времени',
    });

    this.dayTimeCount = new NodeBuilder({
      parentNode: this.todaySubDiv3.node,
      tagName: 'p',
      className: 'user-stats__day-time-count',
      content: '0',
    });

    this.userTotalDiv = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      content: 'За все время',
      className: 'user-stats__all-time-div',
    });

    this.totalSubDiv1 = new NodeBuilder({
      parentNode: this.userTotalDiv.node,
      tagName: 'div',
      className: 'user-stats__total-sub-div',
    });

    this.totalExercisesHeader = new NodeBuilder({
      parentNode: this.totalSubDiv1.node,
      tagName: 'p',
      className: 'user-stats__total-exercises-header',
      content: 'Упражнений',
    });

    this.totalExercisesCount = new NodeBuilder({
      parentNode: this.totalSubDiv1.node,
      tagName: 'p',
      className: 'user-stats__total-exercises-count',
      content: '0',
    });

    this.totalSubDiv2 = new NodeBuilder({
      parentNode: this.userTotalDiv.node,
      tagName: 'div',
      className: 'user-stats__total-sub-div',
    });

    this.totalScoreHeader = new NodeBuilder({
      parentNode: this.totalSubDiv2.node,
      tagName: 'p',
      className: 'user-stats__total-score-header',
      content: 'Очков',
    });

    this.totalScoreCount = new NodeBuilder({
      parentNode: this.totalSubDiv2.node,
      tagName: 'p',
      className: 'user-stats__total-score-count',
      content: '0',
    });

    this.totalSubDiv3 = new NodeBuilder({
      parentNode: this.userTotalDiv.node,
      tagName: 'div',
      className: 'user-stats__total-sub-div',
    });

    this.totalTimeHeader = new NodeBuilder({
      parentNode: this.totalSubDiv3.node,
      tagName: 'p',
      className: 'user-stats__total-time-header',
      content: 'Времени',
    });

    this.totalTimeCount = new NodeBuilder({
      parentNode: this.totalSubDiv3.node,
      tagName: 'p',
      className: 'user-stats__total-time-count',
      content: '0',
    });

    this.totalSubDiv4 = new NodeBuilder({
      parentNode: this.userTotalDiv.node,
      tagName: 'div',
      className: 'user-stats__total-sub-div',
    });

    this.totalIntervalGameScoreHeader = new NodeBuilder({
      parentNode: this.totalSubDiv4.node,
      tagName: 'p',
      className: 'user-stats__interval-game-score-header',
      content: 'Очков за упражнения на интервалы',
    });

    this.totalIntervalGameScoreCount = new NodeBuilder({
      parentNode: this.totalSubDiv4.node,
      tagName: 'p',
      className: 'user-stats__interval-game-score-count',
      content: '0',
    });

    this.totalSubDiv5 = new NodeBuilder({
      parentNode: this.userTotalDiv.node,
      tagName: 'div',
      className: 'user-stats__total-sub-div',
    });

    this.totalScaleGameScoreHeader = new NodeBuilder({
      parentNode: this.totalSubDiv5.node,
      tagName: 'p',
      className: 'user-stats__scale-game-score-header',
      content: 'Очков за упражнения на гаммы',
    });

    this.totalScaleGameScoreCount = new NodeBuilder({
      parentNode: this.totalSubDiv5.node,
      tagName: 'p',
      className: 'user-stats__scale-game-score-count',
      content: '0',
    });

    this.totalSubDiv6 = new NodeBuilder({
      parentNode: this.userTotalDiv.node,
      tagName: 'div',
      className: 'user-stats__total-sub-div',
    });

    this.totalChordsGameScoreHeader = new NodeBuilder({
      parentNode: this.totalSubDiv6.node,
      tagName: 'p',
      className: 'user-stats__chords-game-score-header',
      content: 'Очков за упражнения на аккорды',
    });

    this.totalChordsGameScoreCount = new NodeBuilder({
      parentNode: this.totalSubDiv6.node,
      tagName: 'p',
      className: 'user-stats__chords-game-score-count',
      content: '0',
    });

    this.statisticCounters = {
      dayExercisesCounter: this.dayExercisesCount.node,
      dayScoreCounter: this.dayScoreCount.node,
      dayTimeCounter: this.dayTimeCount.node,
      totalExercisesCounter: this.totalExercisesCount.node,
      totalScoreCounter: this.totalScoreCount.node,
      totalTimeCounter: this.totalTimeCount.node,
      totalIntervalGameScoreCounter: this.totalIntervalGameScoreCount.node,
      totalScaleGameScoreCounter: this.totalScaleGameScoreCount.node,
      totalChordsGameScoreCounter: this.totalChordsGameScoreCount.node,
    };
  }
}

export default UserStatsView;
