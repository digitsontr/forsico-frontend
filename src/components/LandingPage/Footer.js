import React, { useState } from "react";
import "../../styles/Footer.css";
import fullNameIcon from "../../assets/footer-fullname-icon.svg";
import emailIcon from "../../assets/footer-email-icon.svg";
import linkedInIcon from "../../assets/linkedin-icon.svg";
import instagramIcon from "../../assets/instagram-icon.svg";
import twitterIcon from "../../assets/x-icon.svg";
import Support from "../../api/SupportApi/index";
import FooterLogo from "../../assets/forsico-logo.svg";

const Footer = () => {
  const support = new Support();
  const [ticketState, setTicketState] = useState({
    email: "",
    fullName: "",
    content: "",
    privacyAccepted: false,
  });

  const handleFullNameChange = (e) => {
    setTicketState((previousState) => ({
      ...previousState,
      fullName: e.target.value || "",
    }));
  };

  const handleContentChange = (e) => {
    setTicketState((previousState) => ({
      ...previousState,
      content: e.target.value || "",
    }));
  };

  const handleEmailChange = (e) => {
    setTicketState((previousState) => ({
      ...previousState,
      email: e.target.value || "",
    }));
  };

  const handlePrivacyChange = (e) => {
    console.log("Privacy", e);
    setTicketState((previousState) => ({
      ...previousState,
      privacyAccepted: e.target.checked || false,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (ticketState.privacyAccepted) {
      await support.createContactTicket(ticketState.content, ticketState.fullName, ticketState.email);
    } else {
      //TODO show alert
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="background"></div>
        <div className="footer-left-area">
          <div className="left-area-title">
            <h2 className="footer-left-h2">Contact us for more information</h2>
          </div>
          <div className="left-area-content">
            <p className="footer-left-p">
              Regístrate y disfruta de todas las ventajas que te ofrecemos,
              introduce tus platos y empieza la transformación de tu
              restaurante.
            </p>
          </div>
        </div>
        <div className="footer-input-group">
          <form className="footer-form" type="post" onSubmit={handleFormSubmit}>
            <div className="input-group-footer">
              <img
                className="input-group-image"
                src={fullNameIcon}
                alt="fullname"
              />
              <input
                className="footer-input"
                type="text"
                value={ticketState.fullName}
                onChange={handleFullNameChange}
                placeholder="Full name"
                required
              />
            </div>
            <div className="input-group-footer">
              <img
                className="input-group-image"
                src={emailIcon}
                alt="fullname"
              />
              <input
                className="footer-input"
                type="email"
                value={ticketState.email}
                onChange={handleEmailChange}
                placeholder="E-Mail Address"
                required
              />
            </div>

            <div className="input-group-footer">
              <textarea
                className="footer-message"
                value={ticketState.content}
                onChange={handleContentChange}
                placeholder="Message"
                required
              ></textarea>
            </div>

            <div className="privacy-policy ">
              <input
                className="privacy-input"
                onChange={handlePrivacyChange}
                type="checkbox"
                required
              />
              <label className="privacy-label">
                I have read and accept the privacy policy.
              </label>
            </div>

            <button type="submit" className="send-btn">
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="logo">
          <span href="#">
            <img className="footer-bottom-image" src={FooterLogo} alt="logo" />
          </span>
        </div>
        <div className="footer-middle">
          <p className="footer-bottom-p">
            © 2024 Forsico. All rights reserved.
          </p>
        </div>
        <div className="social-icons">
          <span className="icon linkedin-icon footer-social-icon" href="#">
            <img src={linkedInIcon} alt="linkedin" />
          </span>
          <span className="icon instagram-icon footer-social-icon" href="#">
            <img src={instagramIcon} alt="instagram" />
          </span>
          <span className="icon linkedin-icon footer-social-icon" href="#">
            <img src={twitterIcon} alt="x" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
