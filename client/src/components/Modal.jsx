import React from 'react';
import ReactDOM from 'react-dom';
// import './Modal.css';

const Modal = ({ visible, onClose, children, title }) => {

    if (!visible) return null;
    return ReactDOM.createPortal(
        <div className='modal' onClick={() => onClose(false)}>

            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" onClick={() => onClose(false)} aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    {children}
                </section>
                <footer className="modal-card-foot">
                    <div className="buttons">
                        <button className="button" onClick={() => onClose(false)}>Закрыть</button>
                    </div>
                </footer>
            </div>

        </div>,
        document.body
    );
}

export default Modal;