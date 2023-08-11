import intlTelInput from 'intl-tel-input';
import {
  DataAttributes,
  Languages,
  VALIDATION_ERRORS_MAP
} from '../consts/index.consts';
import {
  ErrorElement,
  FormElement,
  IPhoneNumberConstructor,
  InputElement,
  SubmitElement
} from './libPhoneNumber.types';
import token from '../consts/token';

const validLanguages: Set<Languages> = new Set(Object.values(Languages));

class PhoneNumber {
  private readonly inputElement: InputElement;

  private readonly errorElement: ErrorElement;

  private readonly submitElement: SubmitElement;

  private readonly formElement: FormElement;

  private inputPlugin!: intlTelInput.Plugin;

  private readonly language: Languages;

  private readonly initialCountry: string;

  constructor({
    inputElement,
    errorElement,
    submitElement,
    formElement
  }: IPhoneNumberConstructor) {
    this.inputElement = inputElement;
    this.errorElement = errorElement;
    this.submitElement = submitElement;
    this.formElement = formElement;
    this.language = this.determineLanguage();
    this.initialCountry =
      this.formElement.dataset[DataAttributes.InitialCountry]?.toLowerCase() ||
      'us';
  }

  initialize() {
    const options: intlTelInput.Options = {
      initialCountry: 'auto',
      geoIpLookup: this.getUserCountry,
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
    };
    this.inputPlugin = intlTelInput(this.inputElement, options);
    this.inputElement.addEventListener('blur', this.validatePhoneNumber);
    this.inputElement.addEventListener('keyup', this.resetError);
    this.inputElement.addEventListener('countrychange', this.resetError);
    this.submitElement.addEventListener('click', this.submitHandler);
  }

  private determineLanguage = () => {
    const dataLang = this.errorElement.dataset[
      DataAttributes.Language
    ] as Languages;
    return validLanguages.has(dataLang) ? dataLang : Languages.EN;
  };

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

  private getUserCountry = async (callback: Function) => {
    const url = `https://ipinfo.ioй/json?token=${token}`;
    const headers = { Accept: 'application/json' };
    try {
      const resp = await fetch(url, { headers });
      const json = await resp.json();
      return callback(json.country);
    } catch {
      return callback(this.initialCountry);
    }
  };
}

export default PhoneNumber;
