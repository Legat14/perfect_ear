import Translation from '../../constants/translation';
import { LangEmitter } from '../../controllers/emitters/emitters';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import TextNodeBuilder from '../../helpers/text-node-builder';
import { IUserStatisticCounters, Languages } from '../../types/data-types';

class UserStatsView extends NodeBuilder {
  backToMainBtn: ButtonBuilder;

  userStatsHeader: NodeBuilder;

  todayDiv: NodeBuilder;

  todayDivHeader: TextNodeBuilder;

  userTotalDivHeader: TextNodeBuilder;

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

  achievementsBtn: ButtonBuilder;

  achievementNew: HTMLElement | null;

  constructor(state: keyof typeof Languages) {
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
      content: Translation.userStatsPageHeader[state],
      className: 'user-stats__header',
    });

    this.todayDiv = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'user-stats__today-div',
    });

    this.todayDivHeader = new TextNodeBuilder({
      parentNode: this.todayDiv.node,
      content: Translation.userDayStatisticTitle[state],
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
      content: Translation.exercisesCounterTitle[state],
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
      content: Translation.scoreCounterTitle[state],
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
      content: Translation.timeCounterTitle[state],
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
      className: 'user-stats__all-time-div',
    });

    this.userTotalDivHeader = new TextNodeBuilder({
      parentNode: this.userTotalDiv.node,
      content: Translation.userTotalTime[state],
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
      content: Translation.exercisesCounterTitle[state],
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
      content: Translation.scoreCounterTitle[state],
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
      content: Translation.timeCounterTitle[state],
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
      content: Translation.totalIntervalGameScore[state],
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
      content: Translation.totalScaleGameScore[state],
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
      content: Translation.totalChordsGameScore[state],
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

    this.achievementNew = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'user-stats__achievements',
    }).node;
    this.achievementsBtn = new ButtonBuilder({
      parentNode: this.achievementNew,
      className: 'user-stats__achievements-btn',
      content: Translation.userStatsAchievements[state],
    });

    this.achievementsBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#/user-stats/achievements';
    });

    LangEmitter.add((lang) => {
      this.userStatsHeader.node.innerHTML = Translation.userStatsPageHeader[lang];
      this.todayDivHeader.node.nodeValue = Translation.userDayStatisticTitle[lang];
      this.dayExercisesHeader.node.innerHTML = Translation.exercisesCounterTitle[lang];
      this.dayScoreHeader.node.innerHTML = Translation.scoreCounterTitle[lang];
      this.dayTimeHeader.node.innerHTML = Translation.timeCounterTitle[lang];
      this.userTotalDivHeader.node.nodeValue = Translation.userTotalTime[lang];
      this.totalExercisesHeader.node.innerHTML = Translation.exercisesCounterTitle[lang];
      this.totalScoreHeader.node.innerHTML = Translation.scoreCounterTitle[lang];
      this.totalTimeHeader.node.innerHTML = Translation.timeCounterTitle[lang];
      this.totalIntervalGameScoreHeader.node.innerHTML = Translation.totalIntervalGameScore[lang];
      this.totalScaleGameScoreHeader.node.innerHTML = Translation.totalScaleGameScore[lang];
      this.totalChordsGameScoreHeader.node.innerHTML = Translation.totalChordsGameScore[lang];
      this.achievementsBtn.node.innerHTML = Translation.userStatsAchievements[lang];
    });
  }
}

export default UserStatsView;
