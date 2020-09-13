import validationErrors from '../constants/validationErrors';
import BaseComponent from '../components/BaseComponent';

const validator = require('validator');

export default class Form extends BaseComponent {
  constructor(form, button) {
    super();
    this.form = form;
    this.button = button;   
  }

  _validateInputElement(input) {
    const errorField = input.nextElementSibling;

    if (input.validity.valueMissing) {
      this._setError(input, errorField);
      errorField.textContent = validationErrors.REQUIRE_ERROR;
      return false;
    } 
    if (input.validity.tooShort || input.validity.tooLong) {
      this._setError(input, errorField);
      errorField.textContent = validationErrors.LENGTH_ERROR;
      return false;
    } 
    if ((input.type === 'email') && (!validator.isEmail(input.value))) {
      this._setError(input, errorField);
      errorField.textContent = validationErrors.EMAIL_ERROR;
      return false;
    }
    if ((input.type === 'password') && (input.validity.tooShort)) {
      this._setError(input, errorField);
      errorField.textContent = validationErrors.PASSWORD_ERROR;
      return false;
    }
    if ((input.type !== 'email') && (validator.isURL(input.value))) {
      this._setError(input, errorField);
      errorField.textContent = validationErrors.URL_ERROR;
      return false;
    }
    errorField.textContent = '';
    input.classList.remove('popup__input_invalid');
    errorField.classList.remove('popup__error_active');
    return true;
  }

  _validateForm() {
    const formInputs = Array.from(this.form.querySelectorAll('input'));
    let isValidForm = true;

    formInputs.forEach((input) => {
      if (input.type !== 'submit') {
        if (!this._validateInputElement(input)) {
          isValidForm = false;
        }
      }
    });
    if (isValidForm) {
      this._setSubmitButtonState(true);
    } else {
      this._setSubmitButtonState(false);
    }
  }

  _setError(input, errorField) {
    input.classList.add('popup__input_invalid');
    errorField.classList.add('popup__error_active');
  }

  _disableError(input, errorField) {
    input.classList.remove('popup__input_invalid');
    errorField.classList.remove('popup__error_active');
    errorField.textContent = '';
  }

  setServerError(message) {
    this.serverErrorElement.classList.add('popup__error_active');
    this.serverErrorElement.textContent = message;
  }

  _setSubmitButtonState(isValidForm) {
    if (isValidForm === true) {
      this.button.classList.add("popup__button_valid");
      this.button.removeAttribute("disabled");
    } else {
      this.button.classList.remove("popup__button_valid");
      this.button.setAttribute("disabled", true);
    }
  }

  setEventListeners() {
    this._setListeners([
      {
        element: this.form,
        event: 'input',
        callback: () => this._validateForm()
      },
      {
        element: this.form,
        event: 'input',
        callback: () => this._resetServerError(this.button)
      },
    ])
  }

  clear() {
    this.form.reset();
    this._setSubmitButtonState(false);
    this._resetServerError(this.form.querySelector('button'));
    const formInputs = Array.from(this.form.querySelectorAll('input'));
    formInputs.forEach((input) => {
      const errorField = input.nextElementSibling;
      this._disableError(input, errorField);
    });
  }
  
  setServerError(message) {
    const button = this.form.querySelector('button');
    const serverError = this.form.querySelector('#server-error');
    serverError.classList.add('popup__error_active');
    serverError.textContent = message;
  }

  _resetServerError(button) {
    button.previousElementSibling.classList.remove('popup__error_active');
    button.previousElementSibling.textContent = '';
  }
}
