import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Authentication from '../api/AuthApi/authentication';
import '../styles/confirmEmailPage.css';

const ConfirmEmailPage = () => {
    const [message, setMessage] = useState('Email confirmation is in progress...');
    const authentication = new Authentication();
    const navigate = useNavigate();
    
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await authentication.confirmEmail(token.replaceAll(" ","+"), email);
                
                if (response.status === true) {
                    setMessage("Email confirmation successful.");
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                } else {
                    setMessage("Email confirmation failed: " + response.errors[0].errorMessage);
                }
            } catch (error) {
                setMessage("Email confirmation failed. Please try again.");
            }
        };

        confirmEmail();
    }, [token, email, authentication, navigate]);

    return (
        <div className='confirm-email-container'>
            <div className='confirm-email-message'>
                <h2 className='confirm-email-h2'>{message}</h2>
            </div>
        </div>
    );
};

export default ConfirmEmailPage;
