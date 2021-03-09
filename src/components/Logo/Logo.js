import React from 'react';
import './Logo.css';
import burgerLogo from '../../assets/Images/burgerLogo.png'

const logo = (props) => {
    return (
        <div className="Logo">
            <img src = {burgerLogo} alt="My Burger Logo"/>
        </div>
    );
};

export default logo;