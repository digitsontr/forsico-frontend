import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import '../../styles/loginModal.css';
import Authentication from '../../api/AuthApi/authentication.js';
const config = require("../../config");

const LoginModal = ({ onClose, signUp, forgotPassword }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Error mesajı state
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authentication = new Authentication();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await authentication.login(email, password);

        if (response.success) {
            dispatch(
                setCredentials({
                    user: response.data.user,
                    token: response.data.token,
                })
            );

            onClose();
            navigate('/projects');
        } else {
            setErrorMessage(response.errors[0].errorMessage); 
        }
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    const handleGoogleButtonClick = () => {
        const url = config.baseUrl + "/api/Auth/Google";
        window.open(url, "_blank");
    };

    const handleMicrosoftButtonClick = () => {
        const url = config.baseUrl + "/api/Auth/Microsoft";
        window.open(url, "_blank");
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='login-modal-container'>
            <div className='login-modal-card' ref={modalRef}>
                <div className='login-modal-close'>
                    <span>
                        <img
                            className='login-modal-close-icon'
                            src='./cross-icon.svg'
                            alt='Close'
                            onClick={onClose}
                        />
                    </span>
                </div>
                <div className='login-modal-header'>
                    <div className='login-modal-title'>
                        <span>Welcome</span>
                        <span>back!</span>
                    </div>
                    <div className='login-modal-signup'>
                        <span>Don't have an account yet?</span>
                        <a className='login-modal-signup-link' onClick={signUp}>
                            Sign up
                        </a>
                    </div>
                </div>
                <div className='login-modal-auth-options'>
                    <button className='login-google-auth' onClick={handleGoogleButtonClick}>
                        <span>
                            <img
                                className='login-google-icon'
                                src='./google.svg'
                                alt='Google'
                            />
                        </span>
                    </button>
                    <span style={{ width: '20px' }}></span>
                    <button className='login-microsoft-auth' onClick={handleMicrosoftButtonClick}>
                        <span>
                            <img
                                className='login-microsoft-icon'
                                src='./microsoft.svg'
                                alt='Microsoft'
                            />
                        </span>
                    </button>
                </div>
                <div className='login-modal-separator'>
                    <span>or</span>
                </div>
                <div className='login-modal-input'>
                    <div className='input-icon-wrapper'>
                        <img
                            src='./emailInput.svg'
                            className='input-icon'
                            alt='Icon'
                        />
                        <input
                            className='login-input-email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Work e-mail address'
                        />
                    </div>
                </div>
                <div className='login-modal-input'>
                    <div className='input-icon-wrapper'>
                        <img
                            src='./passwordInput.svg'
                            className='input-icon-left'
                            alt='Password Icon'
                        />
                        <input
                            id='password-input'
                            className='login-input-password'
                            type={passwordVisible ? 'text' : 'password'}
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                        />
                        <img
                            src='./passwordInputEye.svg'
                            className='input-icon-right'
                            alt='Toggle Visibility'
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                </div>
                {errorMessage && (
                    <div className='login-error-message'>
                        <p>{errorMessage}</p>
                    </div>
                )}
                <div className='login-modal-options'>
                    <div className='login-remember-me'>
                        <input type='checkbox' className='login-remember-check'></input>
                        <p className='login-remember-text'>Remember me</p>
                    </div>
                    <a className='login-forgot-password' onClick={forgotPassword}>
                        Forgot password?
                    </a>
                </div>
                <div className='login-modal-action'>
                    <button type='button' className='login-submit-btn' onClick={handleLogin}>
                        Login
                    </button>
                </div>
                <div>
                    <a className='login-help-link' href='#'>
                        Help?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;