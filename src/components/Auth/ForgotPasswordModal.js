import React, { useState, useEffect, useRef } from 'react';
import Authentication from '../../api/AuthApi/authentication';
import '../../styles/loginModal.css';

const ForgotPasswordModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); 
    const authentication = new Authentication();
    const modalRef = useRef(null); // Ref to track modal

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await authentication.forgotPassword(email);
            
            if (response.status === true) {
                setMessage("Email başarıyla gönderildi.");
            } else {
                setMessage(response.errors[0].errorMessage);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    // Close modal on click outside
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
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
                    <span><img className='login-modal-close-icon' src='./cross-icon.svg' alt="Close" onClick={onClose}></img></span>
                </div>
                <div className='login-modal-header'>
                    <div className='login-modal-title'>
                        <span>Forgot</span>
                        <span>Password</span>
                    </div>
                </div>
                <div className='login-modal-input'>
                    <div className='input-icon-wrapper'>
                        <img src='./emailInput.svg' className='input-icon' alt='Email Icon' />
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

                {message && (
                    <div className='login-modal-message'>
                        <p>{message}</p>
                    </div>
                )}

                <div className='login-modal-action'>
                    <button type='button' className='login-submit-btn' onClick={handleForgotPassword}>Send Email</button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;