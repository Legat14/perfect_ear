import NodeBuilder from '../helpers/node-builder';
import { IUserRegInputs } from '../types/data-types';

class RegForm extends NodeBuilder<HTMLElement> {
  inputs: IUserRegInputs;

  constructor(parentNode: HTMLElement) {
    super({
      parentNode,
      tagName: 'form',
      className: 'reg-form',
      attributes: { id: 'reg-form' },
    });

    const regFormHeader = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      className: 'reg-form__header',
      content: 'Введите ваше имя и придумайте пароль',
    });

    const textFieldDiv = new NodeBuilder({
      parentNode: this.node,
      className: 'reg-form__text-field-div',
    });

    const textFieldInputName = new NodeBuilder({
      parentNode: textFieldDiv.node,
      tagName: 'input',
      className: 'reg-form__text-field-input-name',
      attributes: {
        id: 'reg-form__text-field-input-name',
        type: 'text',
        placeholder: 'Ваше имя',
      },
    });

    const textFieldLabelName = new NodeBuilder({
      parentNode: textFieldDiv.node,
      tagName: 'label',
      className: 'reg-form__text-field-label-name',
      attributes: { for: 'reg-form__text-field-label-name' },
    });

    const textFieldInputPass = new NodeBuilder({
      parentNode: textFieldDiv.node,
      tagName: 'input',
      className: 'reg-form__text-field-input-pass',
      attributes: {
        id: 'reg-form__text-field-input-pass',
        type: 'password',
        placeholder: 'Введите пароль',
      },
    });

    const textFieldLabelPass = new NodeBuilder({
      parentNode: textFieldDiv.node,
      tagName: 'label',
      className: 'reg-form__text-field-label-pass',
      attributes: { for: 'reg-form__text-field-label-pass' },
    });

    const textFieldInputPassRepeat = new NodeBuilder({
      parentNode: textFieldDiv.node,
      tagName: 'input',
      className: 'reg-form__text-field-input-pass-repeat',
      attributes: {
        id: 'reg-form__text-field-input-pass-repeat',
        type: 'password',
        placeholder: 'Повторите пароль',
      },
    });

    const textFieldLabelPassRepeat = new NodeBuilder({
      parentNode: textFieldDiv.node,
      tagName: 'label',
      className: 'reg-form__text-field-label-pass-repeat',
      attributes: { for: 'reg-form__text-field-label-pass-repeat' },
    });

    const regSubmitBtn = new NodeBuilder({
      parentNode: this.node,
      tagName: 'button',
      className: 'reg-form__registraton-submit-btn',
      content: 'Зарегистрироваться',
      attributes: { type: 'submit' },
    });

    this.inputs = {
      nameInput: textFieldInputName.node,
      passInput: textFieldInputPass.node,
      repeatPassInput: textFieldInputPassRepeat.node,
      regSubmiteBtn: regSubmitBtn.node,
    };

    console.log(textFieldInputName);
    console.log(textFieldLabelName);
    console.log(textFieldInputPass);
    console.log(textFieldLabelPass);
    console.log(textFieldInputPassRepeat);
    console.log(textFieldLabelPassRepeat);
    console.log(regFormHeader);
    console.log(regSubmitBtn);
  }
}

export default RegForm;
