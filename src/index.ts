import { parsePhoneNumberFromString } from 'libphonenumber-js';
import './scss/style.scss';

const PHONE_FORM = document.querySelector('#check_phone__form') as HTMLFormElement | null;
const PHONE_SUBMIT = document.querySelector('#check_phone__submit');

function setErrorField(error: string) {
  const PHONE_ERROR = document.querySelector('#check_phone__error');
  if (PHONE_ERROR !== null && PHONE_ERROR instanceof HTMLSpanElement) PHONE_ERROR.innerText = error;
}

function validatePhoneNumber(value: string) {
  const phoneNumber = parsePhoneNumberFromString(value, 'UA');
  return phoneNumber && phoneNumber.isValid();
}

function phoneInputOnBlurHandler(e: Event): void {
  setErrorField('');
  const target = e.target as HTMLInputElement;
  const { value } = target;
  target.classList.remove('--has_error');
  if (validatePhoneNumber(value)) {
    console.log('valid');
  } else {
    target.classList.add('--has_error');
    setErrorField('number invalid');
  }
}

window.onload = () => {
  const PHONE_INPUT = document.querySelector('#check_phone__input');
  if (PHONE_INPUT !== null && PHONE_INPUT instanceof HTMLInputElement) {
    PHONE_INPUT.addEventListener('blur', phoneInputOnBlurHandler);
  }
};
