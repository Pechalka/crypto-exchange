import { Field } from 'react-final-form';

const InputField = ({
    name,
    defaultValue = '',
    validate,
    label,
    containerStyle,
    inputProps = {},
    placeholder = '',
    isMultiline = false,
}) => {
    // 

    return (
        <Field name={name} defaultValue={defaultValue} validate={validate}>
            {({ input, meta }) => {
                const hasErrro = (meta.error || meta.submitError) && meta.touched;
                return (
                    <div className='field' style={containerStyle}>
                        <label className='label'>{label}</label>
                        <div className='control'>
                            {isMultiline ? (
                                <textarea
                                    {...input}
                                    className={'textarea ' + (hasErrro ? 'is-danger' : '')}
                                    placeholder={placeholder || label}
                                    {...inputProps}
                                />
                            )
                                : (
                                    <input
                                        {...input}
                                        className={'input ' + (hasErrro ? 'is-danger' : '')}
                                        type='text'
                                        placeholder={placeholder || label}
                                        {...inputProps}
                                    />
                                )}
                        </div>
                        {hasErrro && (
                            <p className='help is-danger'>{meta.error || meta.submitError}</p>
                        )}
                    </div>
                );
            }}
        </Field>
    );
};

export default InputField;
