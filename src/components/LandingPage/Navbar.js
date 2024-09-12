import React, { useState } from 'react';
import LoginModal from '../Auth/LoginModal';
import SignUpModal from '../Auth/SignUpModal';
import ForgotPasswordModal from '../Auth/ForgotPasswordModal';
import Button from "npm-forsico-ui/dist/Button"
import Dropdown from "npm-forsico-ui/dist/Dropdown"
import '../../styles/navbar.css';

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showSForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
        console.log("selected item", item)
        console.log("select", selectedItem)
    };

    const projectItems = [
        { value: '1', label: 'project 1', image: '', link:"/" },
        { value: '2', label: 'project 2', image: 'https://via.placeholder.com/24', link:"/" },
        { value: '3', label: 'project 3', image: 'https://via.placeholder.com/24' , link:"/"},
    ];

    const solutionsItems = [
        { value: '1', label: 'solutions 1', image: '', link:"/" },
        { value: '2', label: 'solutions 2', image: 'https://via.placeholder.com/24', link:"/" },
        { value: '3', label: 'solutions 3', image: 'https://via.placeholder.com/24' , link:"/"},
    ];

    const pricingItems = [
        { value: '1', label: 'pricing 1', image: '', link:"/" },
        { value: '2', label: 'pricing 2', image: 'https://via.placeholder.com/24', link:"/" },
        { value: '3', label: 'pricing 3', image: 'https://via.placeholder.com/24' , link:"/"},
    ];

    const enterpriseItems = [
        { value: '1', label: 'enterprise 1', image: '', link:"/" },
        { value: '2', label: 'enterprise 2', image: 'https://via.placeholder.com/24', link:"/" },
        { value: '3', label: 'enterprise 3', image: 'https://via.placeholder.com/24' , link:"/"},
    ];
    
    return (
        <div className='navbar'>
        <div className='navbar-leftside'>
            
            <a href='#' className='logo' ><img src='https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fc291f76b1f50c847e81bca18178a4646.cdn.bubble.io%2Ff1711051907000x393388361864458050%2FAds%25C4%25B1z%2520tasar%25C4%25B1m%2520%25285%2529.png?w=256&h=142&auto=compress&dpr=2&fit=max'></img></a>
            
            <div className='leftside-buttons'>
            <Dropdown items={projectItems} onSelect={handleSelect} selectedItem={selectedItem} title="Project" />
            <Dropdown items={solutionsItems} onSelect={handleSelect} selectedItem={selectedItem} title="Solutions" />
            <Dropdown items={pricingItems} onSelect={handleSelect} selectedItem={selectedItem} title="Pricing" />
            <Dropdown items={enterpriseItems} onSelect={handleSelect} selectedItem={selectedItem} title="Enterprise" />
            </div>
            </div>
            <div className='navbar-rightside'>
                <div className='navbar-demo-button'>
                    <a>Request a demo</a>
                </div>
                <div className='rightside-button login'>
                    <Button Title="Login" onClick={()=>setShowLoginModal(true)} style={{backgroundColor:"#1C3C83" ,color:"#FFF", width:"100px" , height:"40px" , borderRadius:"20px" ,border:"2px solid #FFF" ,fontSize:"15px" }} />
                </div>
                <div className='rightside-button sign-up'>
                    <Button Title="Sign Up" onClick={()=>setShowSignUpModal(true)} style={{backgroundColor:"#36C5F0" , color:"white",padding:"11px, 33px, 11px, 33px", borderRadius:"20px" , width:"100px", height:"40px" ,fontSize:"15px"}} />
                </div>
            </div>

        
        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} signUp={()=>{setShowLoginModal(false); setShowSignUpModal(true); }} forgotPassword={()=>{setShowLoginModal(false); setShowForgotPasswordModal(true); }}/>}
        {showSignUpModal && <SignUpModal onClose={() => setShowSignUpModal(false)}  login={()=>{setShowLoginModal(true); setShowSignUpModal(false); }} />}
        {showSForgotPasswordModal && <ForgotPasswordModal onClose={() => setShowForgotPasswordModal(false)}/>}
    </div>
    );
};

export default Navbar;
