import intlTelInput from 'intl-tel-input';
import { VALIDATION_ERRORS_MAP } from '../consts/index.const';

class PhoneNumber {
  inputElement: HTMLInputElement;

  errorElement: HTMLElement;

  submitElement: HTMLButtonElement;

  formElement: HTMLFormElement;

  inputPlugin: intlTelInput.Plugin;

  constructor(
    inputElement: HTMLInputElement,
    errorElement: HTMLElement,
    submitElement: HTMLButtonElement,
    formElement: HTMLFormElement
  ) {
    this.inputElement = inputElement;
    this.errorElement = errorElement;
    this.submitElement = submitElement;
    this.formElement = formElement;
    this.inputPlugin = intlTelInput(inputElement, {
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
    });
  }

  initialize() {
    this.inputElement.addEventListener('blur', this.validatePhoneNumber);
    this.inputElement.addEventListener('keyup', this.resetError);
    this.submitElement.addEventListener('click', this.submitHandler);
  }

  private resetError = () => {
    this.errorElement.innerText = '';
    this.inputElement.classList.remove('--has_error');
  };

  private setErrorField(error: string) {
    this.errorElement.innerText = error;
  }

  private validatePhoneNumber = () => {
    this.resetError();
    this.inputElement.value = this.inputElement.value.trim();

    if (!this.inputPlugin.isValidNumber()) {
      this.inputElement.classList.add('--has_error');
      const errorCode = this.inputPlugin.getValidationError();
      const errorMsg = VALIDATION_ERRORS_MAP[errorCode];
      console.error('VALIDATION ERROR >>>', errorMsg);
      this.setErrorField(errorMsg);
      return false;
    }
    return true;
  };

  private submitHandler = (e: Event) => {
    e.preventDefault();
    const valid = this.validatePhoneNumber();
    if (valid) {
      console.log('VALID, submitting');
      this.formElement.submit();
    }
  };
}

export default PhoneNumber;
