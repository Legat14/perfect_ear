import Translation from '../../constants/translation';
import { LangEmitter } from '../../controllers/emitters/lang-emitter';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import UserConfig from '../../models/user-config';
import { IDayGoalsInputs, Languages } from '../../types/data-types';
import LanquageSetting from '../components/language-setting';
import TempoSetting from '../components/tempo-setting';
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

  tempoSetting: TempoSetting;

  onReset!: () => void;

  onSave!: () => void;

  constructor(config: UserConfig) {
    super({ parentNode: null, className: 'user-settings' });

    const language = Languages[config.getLanguage()] as keyof typeof Languages;
    const [volume, tempo] = [config.getVolume(), config.getTempo()];

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
      content: Translation.userSettingsHeader[language],
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
      content: Translation.userSettingsDailyGoals[language],
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
      content: Translation.dailyExercisesGoals[language],
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
      content: Translation.dailyPointsGoals[language],
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
      content: Translation.dailyMinutesGoals[language],
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
      content: Translation.settingsSaveBtn[language],
    });

    this.saveDayGoalsBtn.node.addEventListener('click', () => this.onSave());

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
      content: Translation.commonSettingsHeader[language],
    }).node;

    this.langSetting = new LanquageSetting(
      new NodeBuilder({
        parentNode: commonSettings.node,
        className: 'user-settings__setting-row',
      }).node,
      language,
    );
    this.volumeSetting = new VolumeSetting(
      new NodeBuilder({
        parentNode: commonSettings.node,
        className: 'user-settings__setting-row',
      }).node,
      { language, volume },
    );
    this.tempoSetting = new TempoSetting(
      new NodeBuilder({
        parentNode: commonSettings.node,
        className: 'user-settings__setting-row',
      }).node,
      { language, tempo },
    );

    this.resetStatsBtn = new ButtonBuilder({
      parentNode: new NodeBuilder({ parentNode: commonSettings.node, className: 'user-settings__setting-row' }).node,
      className: 'user-settings__reset-stats-btn',
      content: Translation.resetStatsBtn[language],
    });

    this.resetStatsBtn.node.addEventListener('click', () => this.onReset());

    LangEmitter.add((lang) => {
      this.userSettingsHeader.node.innerHTML = Translation.userSettingsHeader[lang];
      this.statsSettingsHeader.node.innerHTML = Translation.userSettingsDailyGoals[lang];
      this.dayGoalExercisesHeader.node.innerHTML = Translation.dailyExercisesGoals[lang];
      this.dayGoalScoreHeader.node.innerHTML = Translation.dailyPointsGoals[lang];
      this.dayGoalTimeHeader.node.innerHTML = Translation.dailyMinutesGoals[lang];
      this.saveDayGoalsBtn.node.innerHTML = Translation.settingsSaveBtn[lang];
      this.commonHeader.innerHTML = Translation.commonSettingsHeader[lang];
      this.resetStatsBtn.node.innerHTML = Translation.resetStatsBtn[lang];
    });
  }
}

export default UserSettingsView;
