import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../services/authService';
import type { ToastState } from '../types/toast';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import axios from 'axios';
import Toast from '../components/Toast';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        type: 'success',
    });

    const navigate = useNavigate();

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoader(true);

        try {
            const response = await handleLogin(email, password);

            if (response && response.token) {
                localStorage.setItem('token', response.token);
                navigate('/dashboard');
            }

            setEmail('');
            setPassword('');
        } catch (err) {
            let errorMessage = 'Сталася непередбачувана помилка';
            if (axios.isAxiosError(err)) {
                errorMessage =
                    err.response?.data.message || 'Помилка при вході';
            } else {
                console.error('Невідома помилка:', err);
            }
            setToast({
                show: true,
                message: errorMessage,
                type: 'error',
            });
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-page__container">
                <div className="login-page__title-container">
                    <h2 className="login-page__title">MINI - CRM</h2>
                    <h3 className="login-page__text">Please log in</h3>
                </div>
                <form className="login-page__form" onSubmit={handleSubmit}>
                    <div className="login-page__label-container">
                        <label className="login-page__label">Email: </label>
                        <div className="login-page__input-container">
                            <MdEmail className="login-page__input-icon" />
                            <input
                                className="login-page__input"
                                type="mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="login-page__label-container">
                        <label className="login-page__label">Password: </label>
                        <div className="login-page__input-container">
                            <RiLockPasswordFill className="login-page__input-icon" />
                            <input
                                className="login-page__input"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button
                        className="login-page__form-button"
                        disabled={loader}
                    >
                        Login
                    </button>
                </form>
            </div>
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(prev => ({ ...prev, show: false }))}
                />
            )}
        </div>
    );
}

export default Login;
