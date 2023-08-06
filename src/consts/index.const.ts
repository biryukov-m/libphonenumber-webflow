export const DOM_ELEMENTS = {
  input: '#check_phone__input',
  error: '#check_phone__error',
  form: '#check_phone__form',
  submit: '#check_phone__submit'
};

export const DOM_EXIST_ERROR = `Can't initialize telephone input: one of this element ID's doesn't exist on page: ${Object.values(
  DOM_ELEMENTS
)}`;

export const VALIDATION_ERRORS_MAP = [
  'Invalid number',
  'Invalid country code',
  'Too short',
  'Too long',
  'Invalid number'
];
