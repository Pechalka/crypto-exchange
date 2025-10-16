import React from 'react';
import { Form } from 'react-final-form';

const ModalForm = ({
  isOpen,
  setIsOpen,
  modalTitle,
  saveButtonText,
  renderContent,
  onSave,
  initialValues = {},
  closeOnSave = true,
  cancelButtonText = '',
}) => {
  const onSubmit = (form) => {
    return new Promise((resolve, reject) => {
      const result = onSave(form);
      if (result && result.then) {
        result
          .then(() => {
            if (closeOnSave) setIsOpen(false);
            resolve();
          })
          .catch((e) => {
            resolve(e);
          });
      } else {
        if (closeOnSave) setIsOpen(false);
        resolve();
      }
    });
  };

//footer className='modal-card-foot is-justify-content-center'
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
      render={({
        handleSubmit,
        form: {
          mutators: { setValue },
        },
        submitting,
        pristine,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={'modal ' + (isOpen ? 'is-active' : '')}>
            <div className='modal-background'></div>
            <div className='modal-card'>
              <header className='modal-card-head'>
                <p className='modal-card-title'>{modalTitle}</p>
                <button
                  type='button'
                  onClick={() => setIsOpen(false)}
                  className='delete'
                  aria-label='close'
                ></button>
              </header>
              <section className='modal-card-body'>
                {renderContent({
                  handleSubmit,
                  setValue,
                  submitting,
                  pristine,
                  values,
                })}
              </section>
              <footer className='modal-card-foot'>
                <button type='submit' className='button is-success'>
                  {saveButtonText}
                </button>
                {cancelButtonText && (
                  <button
                    type='button'
                    onClick={() => setIsOpen(false)}
                    className='button '
                  >
                    {cancelButtonText}
                  </button>
                )}
              </footer>
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default ModalForm;
