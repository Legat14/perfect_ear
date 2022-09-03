import UserConfig from '../../models/user-config';
import { IDayGoalsInputs } from '../../types/data-types';

class UserConfigHandler {
  private userConfig: UserConfig;

  private dayGoalExercisesInput: HTMLElement;

  private dayGoalScoreInput: HTMLElement;

  private dayGoalTimeInput: HTMLElement;

  constructor(userConfig: UserConfig, dayGoalsInputs: IDayGoalsInputs) {
    this.userConfig = userConfig;
    this.dayGoalExercisesInput = dayGoalsInputs.dayGoalExercisesInput;
    this.dayGoalScoreInput = dayGoalsInputs.dayGoalScoreInput;
    this.dayGoalTimeInput = dayGoalsInputs.dayGoalTimeInput;
    this.refreshDayGoalInputsValues();
  }

  private async refreshDayExercisesGoalInputValue() {
    const input = this.dayGoalExercisesInput as HTMLInputElement;
    const value = this.userConfig.getDayExercisesGoal();
    input.value = value.toString();
  }

  private refreshDayScoreGoalInputValue() {
    const input = this.dayGoalScoreInput as HTMLInputElement;
    const value = this.userConfig.getDayScoreGoal();
    input.value = value.toString();
  }

  private refreshDayTimeGoalInputValue() {
    const input = this.dayGoalTimeInput as HTMLInputElement;
    const value = this.userConfig.getDayTimeGoal();
    input.value = value.toString();
  }

  public refreshDayGoalInputsValues() {
    this.refreshDayExercisesGoalInputValue();
    this.refreshDayScoreGoalInputValue();
    this.refreshDayTimeGoalInputValue();
  }

  private saveDayExercisesGoalInputValue() {
    const input = this.dayGoalExercisesInput as HTMLInputElement;
    const value = +input.value;
    this.userConfig.setDayExercisesGoal(value);
  }

  private saveDayScoreGoalInputValue() {
    const input = this.dayGoalScoreInput as HTMLInputElement;
    const value = +input.value;
    this.userConfig.setDayScoreGoal(value);
  }

  private saveDayTimeGoalInputValue() {
    const input = this.dayGoalTimeInput as HTMLInputElement;
    const value = +input.value;
    this.userConfig.setDayTimeGoal(value);
  }

  public saveDayGoalInputsValues() {
    this.saveDayExercisesGoalInputValue();
    this.saveDayScoreGoalInputValue();
    this.saveDayTimeGoalInputValue();
  }
}

export default UserConfigHandler;
