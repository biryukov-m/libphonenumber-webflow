import intlTelInput from 'intl-tel-input';
import { Language, VALIDATION_ERRORS_MAP } from '../consts/index.const';

const validLanguages: Set<Language> = new Set(Object.values(Language));
class PhoneNumber {
  private inputElement: HTMLInputElement;

  private errorElement: HTMLElement;

  private submitElement: HTMLButtonElement;

  private formElement: HTMLFormElement;

  private inputPlugin: intlTelInput.Plugin;

  private language: Language;

  constructor(
    inputElement: HTMLInputElement,
    errorElement: HTMLSpanElement,
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

    this.language = validLanguages.has(
      this.errorElement.dataset.lang as Language
    )
      ? (this.errorElement.dataset.lang as Language)
      : Language.EN;
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
      const errorMsg = VALIDATION_ERRORS_MAP[this.language][errorCode];

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
