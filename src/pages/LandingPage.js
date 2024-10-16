import React from 'react';
import Navbar from '../components/LandingPage/Navbar';
import Introduction from '../components/LandingPage/Introduction';
import Footer from "../components/LandingPage/Footer"

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <Introduction />
            <Footer/>
        </div>
    );
};

export default LandingPage;
