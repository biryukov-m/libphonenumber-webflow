import 'intl-tel-input/build/css/intlTelInput.css';
import './scss/style.scss';
import PhoneNumber from './modules/libPhoneNumber';
import { DomElements, DOM_EXIST_ERROR } from './consts/index.consts';

window.onload = () => {
  const PHONE_INPUT = document.querySelector(DomElements.input);
  const ERROR_INPUT = document.querySelector(DomElements.error);
  const FORM = document.querySelector(DomElements.form);
  const SUBMIT_BTN = document.querySelector(DomElements.submit);

  if (
    PHONE_INPUT instanceof HTMLInputElement &&
    ERROR_INPUT instanceof HTMLElement &&
    FORM instanceof HTMLFormElement &&
    SUBMIT_BTN instanceof HTMLButtonElement
  ) {
    const phoneNumber = new PhoneNumber({
      inputElement: PHONE_INPUT,
      errorElement: ERROR_INPUT,
      submitElement: SUBMIT_BTN,
      formElement: FORM
    });
    phoneNumber.initialize();
  } else {
    throw new Error(DOM_EXIST_ERROR);
  }
};
