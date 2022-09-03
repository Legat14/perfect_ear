import UserConfig from '../../models/user-config';
import { IDayGoalsInputs } from '../../types/data-types';

class UserConfigHandler {
  private userConfig: UserConfig;

  private dayGoalExercisesInput: HTMLInputElement;

  private dayGoalScoreInput: HTMLInputElement;

  private dayGoalTimeInput: HTMLInputElement;

  constructor(userConfig: UserConfig, dayGoalsInputs: IDayGoalsInputs) {
    this.userConfig = userConfig;
    this.dayGoalExercisesInput = dayGoalsInputs.dayGoalExercisesInput;
    this.dayGoalScoreInput = dayGoalsInputs.dayGoalScoreInput;
    this.dayGoalTimeInput = dayGoalsInputs.dayGoalTimeInput;
    this.addRestrictionEvent(this.dayGoalExercisesInput);
    this.addRestrictionEvent(this.dayGoalScoreInput);
    this.addRestrictionEvent(this.dayGoalTimeInput);
    this.refreshDayGoalInputsValues();
  }

  private async refreshDayExercisesGoalInputValue() {
    const input = this.dayGoalExercisesInput;
    const value = this.userConfig.getDayExercisesGoal();
    input.value = value.toString();
  }

  private refreshDayScoreGoalInputValue() {
    const input = this.dayGoalScoreInput;
    const value = this.userConfig.getDayScoreGoal();
    input.value = value.toString();
  }

  private refreshDayTimeGoalInputValue() {
    const input = this.dayGoalTimeInput;
    const value = this.userConfig.getDayTimeGoal();
    input.value = value.toString();
  }

  public refreshDayGoalInputsValues() {
    this.refreshDayExercisesGoalInputValue();
    this.refreshDayScoreGoalInputValue();
    this.refreshDayTimeGoalInputValue();
  }

  private saveDayExercisesGoalInputValue() {
    const input = this.dayGoalExercisesInput;
    const value = +input.value;
    this.userConfig.setDayExercisesGoal(value);
  }

  private saveDayScoreGoalInputValue() {
    const input = this.dayGoalScoreInput;
    const value = +input.value;
    this.userConfig.setDayScoreGoal(value);
  }

  private saveDayTimeGoalInputValue() {
    const input = this.dayGoalTimeInput;
    const value = +input.value;
    this.userConfig.setDayTimeGoal(value);
  }

  public saveDayGoalInputsValues() {
    this.saveDayExercisesGoalInputValue();
    this.saveDayScoreGoalInputValue();
    this.saveDayTimeGoalInputValue();
  }

  private addRestrictionEvent(input: HTMLInputElement) {
    const reassignableInput = input;
    reassignableInput.addEventListener('change', (): void => {
      const min = +reassignableInput.min;
      const max = +reassignableInput.max;
      if (+reassignableInput.value < min) {
        reassignableInput.value = min.toString();
      }
      if (+reassignableInput.value > max) {
        reassignableInput.value = max.toString();
      }
    });
  }
}

export default UserConfigHandler;
