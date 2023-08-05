import parsePhoneNumberFromString from 'libphonenumber-js';
import { CountryCode } from 'libphonenumber-js/types';

// const PHONE_SUBMIT = document.querySelector('#check_phone__submit');

function setErrorField(error: string) {
  const PHONE_ERROR = document.querySelector('#check_phone__error');
  if (PHONE_ERROR !== null && PHONE_ERROR instanceof HTMLSpanElement)
    PHONE_ERROR.innerText = error;
}

function validatePhoneNumber(value: string, country: CountryCode = 'UA') {
  const phoneNumber = parsePhoneNumberFromString(value, country);
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

export default phoneInputOnBlurHandler;
