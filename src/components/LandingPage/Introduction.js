import React from 'react';
import '../../styles/introduction.css'
const Introduction = () => {
    return (
        <div className='introduction-main'>
            <div className='introdoction-get-start'>
                <h2>Manage your business <br /> plan with <span>Forsico AI</span></h2>
                <p>Create business plans with artificial <br /> intelligence, track your work, stay connected <br /> with your teammates</p>
                <button>Get Started</button>
            </div>
            <div className='introduction-design'></div>
            <div className='introduction-board'></div>
        </div>
    );
};

export default Introduction;
