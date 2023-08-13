const BASE_DATA_HTML_PREFIX = 'check-phone';

export enum QuerySelectors {
  input = `input[${BASE_DATA_HTML_PREFIX}-id="input"]`,
  error = `[${BASE_DATA_HTML_PREFIX}-id="error"]`,
  form = `form[${BASE_DATA_HTML_PREFIX}-id="form"]`,
  submit = `[${BASE_DATA_HTML_PREFIX}-id="submit"]`
}

export enum OptionsAttributes {
  // check-phone-language in HTML
  language = `${BASE_DATA_HTML_PREFIX}-language`,
  // check-phone-initial-country in HTML
  initial_country = `${BASE_DATA_HTML_PREFIX}-initial-country`
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
