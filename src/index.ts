import 'intl-tel-input/build/css/intlTelInput.css';
import './scss/style.scss';
import PhoneNumber from './modules/libPhoneNumber';
import { QUERY_SELECTORS } from './consts/index.consts';
import {
  ErrorElement,
  FormElement,
  InputElement,
  SubmitElement
} from './modules/libPhoneNumber.types';

window.onload = () => {
  const PHONE_INPUT = document.querySelector(QUERY_SELECTORS.input);
  const ERROR_INPUT = document.querySelector(QUERY_SELECTORS.error);
  const FORM = document.querySelector(QUERY_SELECTORS.form);
  const SUBMIT_BTN = document.querySelector(QUERY_SELECTORS.submit);

  const verifyElements = () => {
    const errors = [];
    if (!(PHONE_INPUT instanceof HTMLInputElement)) {
      errors.push(
        `Phone input must be HTML input item and have corresponding attribute (${QUERY_SELECTORS.input}) ${PHONE_INPUT};`
      );
    }
    if (!(ERROR_INPUT instanceof HTMLElement)) {
      errors.push(
        `Error text field must be HTML item and have corresponding attribute (${QUERY_SELECTORS.error}) ${ERROR_INPUT};`
      );
    }
    if (!(FORM instanceof HTMLFormElement)) {
      errors.push(
        `Form must be HTML form element and have corresponding attribute (${QUERY_SELECTORS.form}). ${FORM};`
      );
    }
    if (!(SUBMIT_BTN instanceof HTMLElement)) {
      errors.push(
        `Submit button must be HTML element and have corresponding attribute (${QUERY_SELECTORS.submit}). ${SUBMIT_BTN};`
      );
    }
    return errors;
  };

  try {
    const errors = verifyElements();
    if (errors.length > 0) throw new Error(errors.toString());
    const phoneNumber = new PhoneNumber({
      inputElement: PHONE_INPUT as InputElement,
      errorElement: ERROR_INPUT as ErrorElement,
      submitElement: SUBMIT_BTN as SubmitElement,
      formElement: FORM as FormElement
    });
    phoneNumber.initialize();
  } catch (err) {
    if (err instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  }
};
