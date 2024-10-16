import React from 'react';
import '../../styles/Footer.css';
import fullNameIcon from '../../assets/footer-fullname-icon.svg';
import emailIcon from '../../assets/footer-email-icon.svg';
import linkedInIcon from '../../assets/linkedin-icon.svg';
import instagramIcon from '../../assets/instagram-icon.svg';
import twitterIcon from '../../assets/x-icon.svg';


const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className='background'></div>
                <div className='footer-left-area'>
                    <div className='left-area-title'>
                        <h2>Contact us for more information</h2>
                    </div>
                    <div className='left-area-content'>
                        <p>
                            Regístrate y disfruta de todas las ventajas que te ofrecemos, introduce tus platos y empieza la transformación de tu restaurante.
                        </p>
                    </div>
                </div>
                <div className='footer-input-group'>
                    <form>
                        <div className="input-group">
                            <img src={fullNameIcon} alt="fullname" />
                            <input type="text" placeholder="Full name" required />
                        </div>

                        <div className="input-group">
                            <img src={emailIcon} alt="email" />
                            <input type="email" placeholder="E-mail address" required />
                        </div>

                        <div className="input-group">
                            <input className='message' placeholder="Message" required></input>
                        </div>

                        <div className="privacy-policy ">
                            <input type="checkbox" required />
                            <label>I have read and accept the privacy policy.</label>
                        </div>

                        <button type="submit" className="send-btn">Send</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="logo">
                    <span href="#"><img src="./forsico-logo.svg" alt="logo" /></span>
                </div>
                <div className='footer-middle'><p>© 2024 Forsico. All rights reserved.</p></div>
                <div className="social-icons">
                    <span className='icon linkedin-icon' href="#"><img src={linkedInIcon} alt="linkedin" /></span>
                    <span className='icon instagram-icon' href="#"><img src={instagramIcon} alt="instagram" /></span>
                    <span className='icon linkedin-icon' href="#"><img src={twitterIcon} alt="x" /></span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;