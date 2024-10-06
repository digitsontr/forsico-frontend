import React, { useState, useRef, useEffect } from 'react';
import '../../styles/signUp.css';
import Authentication from '../../api/AuthApi/authentication'
const config = require("../../config");

const SignUpModal = ({ onClose, login }) => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const authentication = new Authentication();
    const modalRef = useRef(null);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    const validateForm = () => {
        if (!userName || !fullName || !email || !password) {
            setErrorMessage('Tüm alanları doldurun');
            return false;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Geçerli bir e-posta adresi girin');
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
    if (!validateForm()) return;

    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    try {
        const result = await authentication.register(userName, email, password, firstName, lastName);

        if (result.status === true) {
            onClose();
        } else {
            setErrorMessage(result.errors[0].errorMessage);
        }
    } catch (error) {
        setErrorMessage(error.message);
    }
};
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    const handleGoogleButtonClick = () => {
        const url = config.authProdUrl + "/api/Auth/Google";
        window.open(url, "_blank");
    };

    const handleMicrosoftButtonClick = () => {
        const url = config.authProdUrl + "/api/Auth/Microsoft";
        window.open(url, "_blank");
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='signup-modal-container'>
            <div className='signup-modal-card' ref={modalRef}>
                <div className='signup-modal-close'>
                    <span><img className='signup-modal-close-icon' src='./cross-icon.svg' alt="Close" onClick={onClose}></img></span>
                </div>
                <div className='signup-modal-header'>
                    <div className='signup-modal-title'>
                        <span>Welcome to</span>
                        <span>Forsico!</span>
                    </div>
                    <div className='signup-modal-login'>
                        <span>Already have an account?</span>
                        <a className='signup-modal-login-link' onClick={login}>Login</a>
                    </div>
                </div>
                <div className='signup-modal-auth-options'>
                    <button className='signup-google-auth' onClick={handleGoogleButtonClick} >
                        <span><img className='signup-google-icon' src='./google.svg' alt="Google"></img></span>
                    </button>
                    <span style={{ width: '20px' }}></span>
                    <button className='signup-microsoft-auth' onClick={handleMicrosoftButtonClick}>
                        <span><img className='signup-microsoft-icon' src='./microsoft.svg' alt="Microsoft"></img></span>
                    </button>
                </div>
                <div className='signup-modal-separator'>
                    <span>or</span>
                </div>
                <div className={`signup-modal-input ${!userName && errorMessage ? 'error' : ''}`}>
                    <div className="input-icon-wrapper">
                        <img src='./fullNameInput.svg' className='input-icon' alt='Full Name Icon' />
                        <input
                            className={`signup-input-fullname ${!userName && errorMessage ? 'error' : ''}`}
                            type='text'
                            name='fullname'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            placeholder='Username'
                        />
                    </div>
                </div>

                <div className='signup-modal-input'>
                    <div className='input-icon-wrapper'>
                        <img src='./fullNameInput.svg' className='input-icon' alt='Full Name Icon' />
                        <input
                            className='signup-input-fullname'
                            type='text'
                            name='fullname'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder='Full name'
                        />
                    </div>
                </div>
                <div className={`signup-modal-input ${!validateEmail(email) && email !== '' ? 'error' : ''}`}>
                    <div className="input-icon-wrapper">
                        <img src='./emailInput.svg' className='input-icon' alt='Email Icon' />
                        <input
                            className={`signup-input-email ${!validateEmail(email) && email !== '' ? 'error' : ''}`}
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Work e-mail address'
                        />
                        {!validateEmail(email) && email !== '' && (
                            <span className="signup-error-icon">
                                <img src="./input-error-icon.svg" alt="Error" />
                            </span>
                        )}
                    </div>
                </div>
                <div className={`signup-modal-input ${!password && errorMessage ? 'error' : ''}`}>
                    <div className="input-icon-wrapper">
                        <img src='./passwordInput.svg' className='input-icon-left' alt='Password Icon' />
                        <input
                            id='password-input'
                            className={`signup-input-password ${!password && errorMessage ? 'error' : ''}`}
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
                    <div className='signup-error-message'>
                        <p>{errorMessage}</p>
                    </div>
                )}
                <div className='signup-modal-terms'>
                    <p className='signup-terms-text'>
                        By clicking the continue button, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
                    </p>
                </div>
                <div className='signup-modal-action'>
                    <button type='button' className='signup-submit-btn' onClick={handleRegister}>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpModal;