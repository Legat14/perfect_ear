import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';
import { IDayGoalsInputs } from '../types/data-types';

class UserSettingsView extends NodeBuilder {
  backToMainBtn: ButtonBuilder;

  userSettingsHeader: NodeBuilder;

  resetStatsBtn: ButtonBuilder;

  statsSettingsHeader: NodeBuilder;

  statsSettings: NodeBuilder;

  dayGoalExercisesDiv: NodeBuilder;

  dayGoalExercisesHeader: NodeBuilder;

  dayGoalExercisesInput: NodeBuilder<HTMLInputElement>;

  dayGoalScoreDiv: NodeBuilder;

  dayGoalScoreHeader: NodeBuilder;

  dayGoalScoreInput: NodeBuilder<HTMLInputElement>;

  dayGoalTimeDiv: NodeBuilder;

  dayGoalTimeHeader: NodeBuilder;

  dayGoalTimeInput: NodeBuilder<HTMLInputElement>;

  dayGoalsInputs: IDayGoalsInputs;

  changeLangBtn: ButtonBuilder;

  saveDayGoalsBtn: ButtonBuilder;

  divForButton: HTMLElement;

  constructor() {
    super({ parentNode: null, className: 'user-settings' });

    this.backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    });

    this.backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#';
    });

    this.userSettingsHeader = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      className: 'user-settings__header',
      content: 'Настройки',
    });

    this.statsSettings = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'user-settings__stats-settings',
    });

    this.statsSettingsHeader = new NodeBuilder({
      parentNode: this.statsSettings.node,
      tagName: 'h3',
      className: 'user-settings__stats-header',
      content: 'Дневные цели',
    });

    this.dayGoalExercisesDiv = new NodeBuilder({
      parentNode: this.statsSettings.node,
      tagName: 'div',
      className: 'user-settings__stat-div',
    });

    this.dayGoalExercisesHeader = new NodeBuilder({
      parentNode: this.dayGoalExercisesDiv.node,
      tagName: 'p',
      className: 'user-settings__stat-header',
      content: 'Упражнений в день',
    });

    this.dayGoalExercisesInput = new NodeBuilder<HTMLInputElement>({
      parentNode: this.dayGoalExercisesDiv.node,
      tagName: 'input',
      className: 'user-settings__stat-input',
      attributes: {
        type: 'number',
        min: '1',
        max: '100',
        step: '1',
      },
    });

    this.dayGoalScoreDiv = new NodeBuilder({
      parentNode: this.statsSettings.node,
      tagName: 'div',
      className: 'user-settings__stat-div',
    });

    this.dayGoalScoreHeader = new NodeBuilder({
      parentNode: this.dayGoalScoreDiv.node,
      tagName: 'p',
      className: 'user-settings__stat-header',
      content: 'Очков в день',
    });

    this.dayGoalScoreInput = new NodeBuilder<HTMLInputElement>({
      parentNode: this.dayGoalScoreDiv.node,
      tagName: 'input',
      className: 'user-settings__stat-input',
      attributes: {
        type: 'number',
        min: '1000',
        max: '250000',
        step: '1000',
      },
    });

    this.dayGoalTimeDiv = new NodeBuilder({
      parentNode: this.statsSettings.node,
      tagName: 'div',
      className: 'user-settings__stat-div',
    });

    this.dayGoalTimeHeader = new NodeBuilder({
      parentNode: this.dayGoalTimeDiv.node,
      tagName: 'p',
      className: 'user-settings__stat-header',
      content: 'Минут в день',
    });

    this.dayGoalTimeInput = new NodeBuilder<HTMLInputElement>({
      parentNode: this.dayGoalTimeDiv.node,
      tagName: 'input',
      className: 'user-settings__stat-input',
      attributes: {
        type: 'number',
        min: '10',
        max: '200',
        step: '1',
      },
    });

    this.dayGoalsInputs = {
      dayGoalExercisesInput: this.dayGoalExercisesInput.node,
      dayGoalScoreInput: this.dayGoalScoreInput.node,
      dayGoalTimeInput: this.dayGoalTimeInput.node,
    };

    this.saveDayGoalsBtn = new ButtonBuilder({
      parentNode: this.statsSettings.node,
      className: 'user-settings__save-day-goals-btn',
      content: 'Сохранить',
    });

    this.divForButton = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'user-settings__row',
    }).node;

    this.changeLangBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'user-settings__change-btn',
      content: 'Сменить язык',
    });

    this.resetStatsBtn = new ButtonBuilder({
      parentNode: this.divForButton,
      className: 'user-settings__reset-stats-btn',
      content: 'Сбросить статистику',
    });
  }
}

export default UserSettingsView;
