export type InputElement = HTMLInputElement;
export type ErrorElement = HTMLElement;
export type SubmitElement = HTMLButtonElement;
export type FormElement = HTMLFormElement;

export interface IPhoneNumberConstructor {
  inputElement: InputElement;
  errorElement: ErrorElement;
  submitElement: SubmitElement;
  formElement: FormElement;
}
