import phoneInputOnBlurHandler from './modules/libPhoneNumber';
import './scss/style.scss';

window.onload = () => {
  const PHONE_INPUT = document.querySelector('#check_phone__input');
  if (PHONE_INPUT !== null && PHONE_INPUT instanceof HTMLInputElement) {
    PHONE_INPUT.addEventListener('blur', phoneInputOnBlurHandler);
  }
};
