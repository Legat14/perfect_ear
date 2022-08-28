import { IUserRegInputs } from '../../types/data-types';

class UserEnterDataHandler {
  nameInput: HTMLElement;

  passInput: HTMLElement;

  repeatPassInput: HTMLElement;

  regSubmiteBtn: HTMLElement;

  constructor({
    nameInput,
    passInput,
    repeatPassInput,
    regSubmiteBtn,
  }: IUserRegInputs) {
    this.nameInput = nameInput;
    this.passInput = passInput;
    this.repeatPassInput = repeatPassInput;
    this.regSubmiteBtn = regSubmiteBtn;
    this.addSubmitEvent();
  }

  public getName(): string {
    return (this.nameInput as HTMLInputElement).value;
  }

  public getPass(): string {
    return (this.passInput as HTMLInputElement).value;
  }

  public getRpeatPass(): string {
    return (this.repeatPassInput as HTMLInputElement).value;
  }

  public cleanName(): void {
    (this.nameInput as HTMLInputElement).value = '';
  }

  public cleanPass(): void {
    (this.passInput as HTMLInputElement).value = '';
  }

  public cleanRepeatPass(): void {
    (this.repeatPassInput as HTMLInputElement).value = '';
  }

  addSubmitEvent() {
    this.regSubmiteBtn.addEventListener('click', (event): void => {
      event.preventDefault();
      const name = this.getName();
      const pass = this.getPass();
      const repeatPass = this.getRpeatPass();
      if (name.length > 2 && pass.length > 2 && repeatPass.length > 2 && pass === repeatPass) {
        console.log(`Name: ${name}, Password: ${pass}, Repeat: ${repeatPass}`);
        this.cleanName();
        this.cleanPass();
        this.cleanRepeatPass();
      } else {
        console.log('Name and passwords should be at least 3 letters long, passes should match');
        console.log(`Name: ${name}, Password: ${pass}, Repeat: ${repeatPass}`);
      }
    });
  }
}

export default UserEnterDataHandler;
