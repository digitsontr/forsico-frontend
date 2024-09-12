import React, { useState } from 'react';
import Authentication from '../api/AuthApi/authentication';
import '../styles/resetPasswordPage.css';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [token, setToken] = useState(''); 
    const [message, setMessage] = useState(''); 
    const authentication = new Authentication();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await authentication.resetPassword(email, token, newPassword);
            
            if (response.status === true) {
                setMessage("Şifre başarıyla sıfırlandı.");
            } else {
                setMessage(response.errors[0].errorMessage);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className='reset-password-container'>
            <div className='reset-password-card'>
                <h2>Reset Your Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className='input-group'>
                        <label>Email Address</label>
                        <input
                            className='input-email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Work e-mail address'
                        />
                    </div>
                    <div className='input-group'>
                        <label>New Password</label>
                        <input
                            className='input-password'
                            type='password'
                            name='newPassword'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            placeholder='New Password'
                        />
                    </div>
                    <div className='input-group'>
                        <label>Reset Token</label>
                        <input
                            className='input-token'
                            type='text'
                            name='token'
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                            placeholder='Enter the reset token'
                        />
                    </div>

                    {message && (
                        <div className='message'>
                            <p>{message}</p>
                        </div>
                    )}

                    <button type='submit' className='submit-btn'>Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
