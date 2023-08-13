const BASE_DATA_HTML_PREFIX = 'data-check-phone';
const BASE_DATASET_JS_PREFIX = 'checkPhone';

export enum QuerySelectors {
  input = `input[${BASE_DATA_HTML_PREFIX}-id="input"]`,
  error = `[${BASE_DATA_HTML_PREFIX}-id="error"]`,
  form = `form[${BASE_DATA_HTML_PREFIX}-id="form"]`,
  submit = `button[${BASE_DATA_HTML_PREFIX}-id="submit"]`
}

export enum DataAttributes {
  // data-check-phone-language in HTML
  data_check_phone_language = `${BASE_DATASET_JS_PREFIX}Language`,
  // data-check-phone-initial-country in HTML
  data_check_phone_initial_country = `${BASE_DATASET_JS_PREFIX}InitialCountry`
}

export enum Languages {
  EN = 'en',
  UA = 'ua'
}

export const VALIDATION_ERRORS_MAP = {
  [Languages.EN]: [
    'Invalid number',
    'Invalid country code',
    'Too short',
    'Too long',
    'Invalid number'
  ],
  [Languages.UA]: [
    'Невірний номер',
    'Невірний код країни',
    'Занадто короткий номер',
    'Занадто довгий номер',
    'Невірний номер'
  ]
};

export const DOM_EXIST_ERROR = `Can't initialize telephone input: one of this element ID's doesn't exist on page: ${Object.values(
  QuerySelectors
)}`;
