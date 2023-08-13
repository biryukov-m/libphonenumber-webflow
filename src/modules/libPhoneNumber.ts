import intlTelInput from 'intl-tel-input';
import {
  OptionsAttributes,
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

    // settings read from attributes of form element
    this.language = this.determineLanguage();
    this.initialCountry = this.determineInitialCountry();
  }

  readonly initialize = () => {
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
  };

  private readonly determineLanguage = () => {
    const dataLang = this.formElement
      .getAttribute(OptionsAttributes.language)
      ?.toLowerCase() as Languages;
    return validLanguages.has(dataLang) ? dataLang : Languages.EN;
  };

  private readonly determineInitialCountry = () => {
    return (
      this.formElement
        .getAttribute(OptionsAttributes.initial_country)
        ?.toLowerCase() || 'us'
    );
  };

  private readonly resetError = () => {
    this.errorElement.innerText = '';
    this.inputElement.classList.remove('has-error');
  };

  private readonly setErrorField = (error: string) => {
    this.errorElement.innerText = error;
  };

  private readonly validatePhoneNumber = () => {
    this.resetError();
    this.inputElement.value = this.inputElement.value.trim();

    if (!this.inputPlugin.isValidNumber()) {
      this.inputElement.classList.add('has-error');
      const errorCode = this.inputPlugin.getValidationError();
      const errorMsg = VALIDATION_ERRORS_MAP[this.language][errorCode];

      console.error('VALIDATION ERROR >>>', errorMsg);
      this.setErrorField(errorMsg);
      return false;
    }
    return true;
  };

  private readonly submitHandler = (e: Event) => {
    e.preventDefault();
    const valid = this.validatePhoneNumber();
    if (valid) {
      console.log('VALID, submitting');
      this.formElement.submit();
    }
  };

  private readonly getUserCountry = async (callback: Function) => {
    const url = `https://ipinfo.io/json?token=${token}`;
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
