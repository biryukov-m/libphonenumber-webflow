import 'intl-tel-input/build/css/intlTelInput.css';
import './scss/style.scss';
import PhoneNumber from './modules/libPhoneNumber';

window.onload = () => {
  const PHONE_INPUT = document.querySelector('#check_phone__input');
  const ERROR_INPUT = document.querySelector('#check_phone__error');

  if (
    PHONE_INPUT instanceof HTMLInputElement &&
    ERROR_INPUT instanceof HTMLElement
  ) {
    const phoneNumber = new PhoneNumber(PHONE_INPUT, ERROR_INPUT);
    phoneNumber.initialize();
  }
};
