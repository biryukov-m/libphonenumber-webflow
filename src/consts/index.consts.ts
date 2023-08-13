export enum QuerySelectors {
  input = 'input[data-id="check-phone-input"]',
  error = '[data-id="check-phone-error"]',
  form = 'form[data-id="check-phone-form"]',
  submit = 'button[data-id="check-phone-submit"]'
}

export enum DataAttributes {
  // data-lang in HTML
  data_language = 'language',
  // data-initial-country in HTML
  data_initial_country = 'initialCountry'
}

export enum Languages {
  EN = 'EN',
  UA = 'UA'
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
