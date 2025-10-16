import { Field } from 'react-final-form';

const CheckboxField = ({
    name,
    defaultValue = '',
    validate,
    label,
    description,
    containerStyle,
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
                            <label className="checkbox">
                                <input {...input}
                                    className="mr-2"
                                    type="checkbox"
                                />
                                {description}
                            </label>
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

export default CheckboxField;
