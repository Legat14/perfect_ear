import LangPack from '../../constants/translation';
import LangEmitter from '../../controllers/emitters/lang-emitter';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { IDayGoalsInputs, Languages } from '../../types/data-types';
import LanquageSetting from '../components/language-setting';
import VolumeSetting from '../components/volume-setting';

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

  saveDayGoalsBtn: ButtonBuilder;

  divForButton: HTMLElement;

  commonHeader: HTMLElement;

  langSetting: LanquageSetting;

  volumeSetting: VolumeSetting;

  constructor(state: keyof typeof Languages = 'RUS') {
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
      content: LangPack[state]['6'],
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
      content: LangPack[state]['7'],
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
      content: LangPack[state]['8'],
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
      content: LangPack[state]['9'],
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
      content: LangPack[state]['10'],
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
      content: LangPack[state]['2'],
    });

    this.divForButton = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'user-settings__row',
    }).node;

    const commonSettings = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'user-settings__stats-settings',
    });

    this.commonHeader = new NodeBuilder({
      parentNode: commonSettings.node,
      tagName: 'h3',
      className: 'user-settings__stats-header',
      content: LangPack[state]['11'],
    }).node;

    this.langSetting = new LanquageSetting(new NodeBuilder({ parentNode: commonSettings.node, className: 'user-settings__setting-row' }).node);
    this.volumeSetting = new VolumeSetting(new NodeBuilder({ parentNode: commonSettings.node, className: 'user-settings__setting-row' }).node);

    this.resetStatsBtn = new ButtonBuilder({
      parentNode: new NodeBuilder({ parentNode: commonSettings.node, className: 'user-settings__setting-row' }).node,
      className: 'user-settings__reset-stats-btn',
      content: LangPack[state]['12'],
    });

    LangEmitter.add((content) => {
      this.userSettingsHeader.node.innerHTML = content['6'];
      this.statsSettingsHeader.node.innerHTML = content['7'];
      this.dayGoalExercisesHeader.node.innerHTML = content['8'];
      this.dayGoalScoreHeader.node.innerHTML = content['9'];
      this.dayGoalScoreHeader.node.innerHTML = content['10'];
      this.saveDayGoalsBtn.node.innerHTML = content['2'];
      this.commonHeader.innerHTML = content['11'];
      this.resetStatsBtn.node.innerHTML = content['12'];
    });
  }
}

export default UserSettingsView;
