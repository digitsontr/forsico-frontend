import React, { useState } from 'react';
import '../../styles/signUp.css';

const SignUpModal = ({ onClose, login }) => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleRegister = () => {
        
        onClose();
    };

    return (
        <div className='signup-modal-container'>
            <div className='signup-modal-card'>
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
                    <button className='signup-google-auth'>
                        <span><img className='signup-google-icon' src='./google.svg' alt="Google"></img></span>
                    </button>
                    <span style={{ width: '20px' }}></span>
                    <button className='signup-microsoft-auth'>
                        <span><img className='signup-microsoft-icon' src='./microsoft.svg' alt="Microsoft"></img></span>
                    </button>
                </div>
                <div className='signup-modal-separator'>
                    <span>or</span>
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
                <div className='signup-modal-input'>
                    <div className='input-icon-wrapper'>
                        <img src='./emailInput.svg' className='input-icon' alt='Email Icon' />
                        <input
                            className='signup-input-email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Work e-mail address'
                        />
                    </div>
                </div>
                <div className='signup-modal-input'>
                    <div className='input-icon-wrapper'>
                        <img src='./passwordInput.svg' className='input-icon-left' alt='Password Icon' />
                        <input
                            id='password-input'
                            className='signup-input-password'
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
