import React, { useState } from 'react';
import { Field } from 'react-final-form';
import CurrencyInput from 'react-currency-input-field';

const CurrencyField = ({
  name,
  defaultValue,
  validate,
  label,
  containerStyle,
  allowNegativeValue,
  prefix,
  disableAbbreviations,
  suffix,
  decimalsLimit,
  decimalSeparator,
}) => {
  return (
    <Field name={name} defaultValue={defaultValue} validate={validate}>
      {({ input, meta }) => {
        const hasError = (meta.error || meta.submitError) && meta.touched;
        return (
          <div className='field' style={containerStyle}>
            <label className='label'>{label}</label>
            <div className='control'>
              <CurrencyInput
                className={'input ' + (hasError ? 'is-danger' : '')}
                name={name}
                defaultValue={defaultValue}
                allowNegativeValue={allowNegativeValue}
                prefix={prefix}
                disableAbbreviations={disableAbbreviations}
                suffix={suffix}
                decimalsLimit={decimalsLimit}
                decimalSeparator={decimalSeparator}
                onValueChange={(value) => {
                  input.onChange({ target: { value } });
                  input.onBlur();
                }}
                value={input.value}
              />
            </div>
            {hasError && (
              <p className='help is-danger'>{meta.error || meta.submitError}</p>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default CurrencyField;
