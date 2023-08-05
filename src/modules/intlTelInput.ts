import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

function initializeIntlTelInput(input: Element) {
  if (input) {
    intlTelInput(input, {
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
    });
  }
}

export default initializeIntlTelInput;
