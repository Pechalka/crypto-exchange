/* eslint-disable react-refresh/only-export-components */
import ModalForm from './ModalForm.jsx';
import InputField from './InputField.jsx';
import CheckboxField from './CheckboxField.jsx';
import DatePickerField from './DatePickerField.jsx';
import RadioboxField from './RadioboxField.jsx';
import SimpleForm from './SimpleForm.jsx';

export { ModalForm };
export { InputField };
export { CheckboxField };
export { DatePickerField };
export { RadioboxField };
export { SimpleForm };

export const validateEmail = (email) => {
  if (!email) return undefined;

  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? undefined
    : 'email incorrect';
};

export const validateDateAfterToday = (date) => {
  const inputDate = new Date(date);
  const now = new Date();

  // Разница в миллисекундах
  const diff = inputDate.getTime() - now.getTime();

  // Одного часа в миллисекундах
  const oneHour = 60 * 60 * 1000;

  return diff >= oneHour ? undefined : "Дата Должна быть не меньше часа от создания";

}

export const hasNumber = (myString) => {
  return /\d/.test(myString) ? undefined : 'should contains number';
};

export const hasLetter = (myString) => {
  return /[a-z]/i.test(myString) ? undefined : 'At least 1 letter';
};

export const minLength = (length, message) => (value) =>
(value && value.length >= length
  ? undefined
  : message
    ? message.replace('{0}', length)
    : 'lenght must be more then ' + length);

export const maxLength = (length, message) => (value) =>
(value.length < length
  ? undefined
  : message
    ? message.replace('{0}', length)
    : 'lenght must be less then ' + length);

export const required = (value) => (value ? undefined : 'required field');
export const mustBeNumber = (value) =>
  isNaN(value) ? 'must Be Number' : undefined;

export const mustBeInteger = (value) => {
  if (isNaN(value) || +value !== parseInt(value, 10)) return 'must be integer';
};

export const minValue = (min, message) => (value) =>
  isNaN(value) || value >= min
    ? undefined
    : message
      ? message.replace('{0}', min)
      : `should be greater than ${min}`;
export const maxValue = (max, message) => (value) =>
  isNaN(value) || value <= max
    ? undefined
    : message
      ? message.replace('{0}', max)
      : `should be less than ${max}`;
export const composeValidators =
  (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );
