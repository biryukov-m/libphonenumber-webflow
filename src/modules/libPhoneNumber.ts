import intlTelInput from 'intl-tel-input';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { CountryCode } from 'libphonenumber-js/types';

// const PHONE_SUBMIT = document.querySelector('#check_phone__submit');

class PhoneNumber {
  inputElement: HTMLInputElement;

  errorElement: HTMLElement;

  constructor(inputElement: HTMLInputElement, errorElement: HTMLElement) {
    this.inputElement = inputElement;
    this.errorElement = errorElement;
    //
  }

  initialize() {
    const input = intlTelInput(this.inputElement, {
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
    });
    this.inputElement.addEventListener('blur', this.onBlurHandler);
  }

  private clearErrorField() {
    this.errorElement.innerText = '';
  }

  private setErrorField(error: string) {
    const PHONE_ERROR = document.querySelector('#check_phone__error');
    if (PHONE_ERROR !== null && PHONE_ERROR instanceof HTMLSpanElement)
      PHONE_ERROR.innerText = error;
  }

  private validatePhoneNumber(value: string, country: CountryCode = 'UA') {
    const phoneNumber = parsePhoneNumberFromString(value, country);
    return phoneNumber && phoneNumber.isValid();
  }

  private onBlurHandler(e: Event): void {
    this.clearErrorField();
    const target = e.target as HTMLInputElement;
    const { value } = target;
    target.classList.remove('--has_error');
    if (!this.validatePhoneNumber(value)) {
      target.classList.add('--has_error');
      this.setErrorField('number invalid');
    }
  }
}

export default PhoneNumber;
