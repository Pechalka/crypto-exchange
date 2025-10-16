import { Field } from 'react-final-form';

const DatePickerField = ({
    name,
    defaultValue = '',
    validate,
    label,
    description,
    containerStyle,
}) => {
    

    return (
        <Field name={name} defaultValue={defaultValue} validate={validate}>
            {({ input, meta }) => {
                const hasErrro = (meta.error || meta.submitError) && meta.touched;
                return (
                    <div className='field' style={containerStyle}>
                        <label className='label'>{label}</label>
                        <div className='control'>
                            <input {...input} style={{"width": "auto"}} className={"input " + (hasErrro ? 'is-danger' : '')} type="datetime-local" />
                            <div>{description}</div>
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

export default DatePickerField;
