// import phoneInputOnBlurHandler from './modules/libPhoneNumber';
import './scss/style.scss';
import initializeIntlTelInput from './modules/intlTelInput';

window.onload = () => {
  const PHONE_INPUT = document.querySelector('#check_phone__input');
  if (PHONE_INPUT !== null && PHONE_INPUT instanceof HTMLInputElement) {
    initializeIntlTelInput(PHONE_INPUT);
    // PHONE_INPUT.addEventListener('blur', phoneInputOnBlurHandler);
    // const flagBlock = document.querySelector('.iti_flag') as HTMLElement;
    // flagBlock.style.background = flags;
  }
};
