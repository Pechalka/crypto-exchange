import { Field } from 'react-final-form';

const RadioboxField = ({ name, label, options, validate }) => {
    return (
        <Field name={name} validate={validate}>
            {({ input, meta }) => (
                <div className='field'>
                    <legend className='label'>{label}</legend>

                    <div className='is-flex is-flex-direction-column'>
                        {options.map(option => (
                            <label className='' key={option.id}>
                                <input
                                    {...input}
                                    type="radio"
                                    value={option.id}
                                    className="mr-2"
                                    checked={input.value === option.id}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>

                    {/* Общая ошибка для всей группы */}
                    {meta.error && meta.touched && (
                        <span style={{ color: 'red' }}>{meta.error}</span>
                    )}
                </div>
            )}
        </Field>
    )
}
export default RadioboxField;
