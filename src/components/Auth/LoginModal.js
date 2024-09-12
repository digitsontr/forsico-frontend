import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/loginModal.css'
import Authentication  from '../../api/AuthApi/authentication.js'

const LoginModal = ({ onClose, signUp, forgotPassword }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authentication = new Authentication();
    //const user = useSelector((state) => state.auth.token);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // useEffect(()=>{
    //     console.log(user.token)
    // },[])
    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await authentication.login(email, password);
       
        if (response.success) {
            dispatch(setCredentials({
                user: response.data.user,
                token: response.data.token,
            }));

            onClose();
            navigate('/projects');
        } else {
            setErrorMessage(response.errors[0].errorMessage);
        }
    };

    return (
        <div className='login-modal-container'>
            <div className='login-modal-card'>
                <div className='login-modal-close'>
                    <span><img className='login-modal-close-icon' src='./cross-icon.svg' alt="Close" onClick={onClose}></img></span>
                </div>
                <div className='login-modal-header'>
                    <div className='login-modal-title'>
                        <span>Welcome</span>
                        <span>back!</span>
                    </div>
                    <div className='login-modal-signup'>
                        <span>Don't have an account yet?</span>
                        <a className='login-modal-signup-link' onClick={signUp}>Sign up</a>
                    </div>
                </div>
                <div className='login-modal-auth-options'>
                    <button className='login-google-auth'>
                        <span><img className='login-google-icon' src='./google.svg' alt="Google"></img></span>
                    </button>
                    <span style={{width:'20px'}}></span>
                    <button className='login-microsoft-auth'>
                        <span><img className='login-microsoft-icon' src='./microsoft.svg' alt="Microsoft"></img></span>
                    </button>
                </div>
                <div className='login-modal-separator'>
                    <span>or</span>
                </div>
                <div className='login-modal-input'>
                    <div className='input-icon-wrapper'>
                        <img src='./emailInput.svg' className='input-icon' alt='Icon' />
                        <input className='login-input-email' type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Work e-mail address' />
                    </div>
                </div>
                <div className='login-modal-input'>
                    <div className='input-icon-wrapper'>
                        <img src='./passwordInput.svg' className='input-icon-left' alt='Password Icon' />
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
                <div className='login-modal-options'>
                    <div className='login-remember-me'>
                        <input type='checkbox' className='login-remember-check'></input>
                        <p className='login-remember-text'>Remember me</p>
                    </div>
                    <a className='login-forgot-password' onClick={forgotPassword} >Forgot password?</a>
                </div>
                <div className='login-modal-action'>
                    <button type='button' className='login-submit-btn' onClick={handleLogin}>Login</button>
                </div>
                <div>
                    <a className='login-help-link' href='#'>Help?</a>
                </div>
            </div>
        </div>
    );
};
export default LoginModal;
