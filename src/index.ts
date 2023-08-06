import 'intl-tel-input/build/css/intlTelInput.css';
import './scss/style.scss';
import PhoneNumber from './modules/libPhoneNumber';
import { DOM_ELEMENTS, DOM_EXIST_ERROR } from './consts/index.const';

window.onload = () => {
  const PHONE_INPUT = document.querySelector(DOM_ELEMENTS.input);
  const ERROR_INPUT = document.querySelector(DOM_ELEMENTS.error);
  const FORM = document.querySelector(DOM_ELEMENTS.form);
  const SUBMIT_BTN = document.querySelector(DOM_ELEMENTS.submit);

  if (
    PHONE_INPUT instanceof HTMLInputElement &&
    ERROR_INPUT instanceof HTMLElement &&
    FORM instanceof HTMLFormElement &&
    SUBMIT_BTN instanceof HTMLButtonElement
  ) {
    const phoneNumber = new PhoneNumber(
      PHONE_INPUT,
      ERROR_INPUT,
      SUBMIT_BTN,
      FORM
    );
    phoneNumber.initialize();
  } else {
    throw new Error(DOM_EXIST_ERROR);
  }
};
