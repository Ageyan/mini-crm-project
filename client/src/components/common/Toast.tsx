import { useEffect } from 'react';

import { IoMdClose } from 'react-icons/io';

type ToastProps = {
    show: boolean;
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
};

const Toast = ({ message, type, onClose, show }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast toast--${type} ${show ? 'show' : ''}`}>
            <div className="toast__content">
                <p className="toast__message">{message}</p>
            </div>
            <button
                className="toast__close-btn"
                onClick={onClose}
                type="button"
            >
                <IoMdClose className="toast__close-btn-icon" />
            </button>
        </div>
    );
};

export default Toast;
