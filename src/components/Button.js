import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', type = 'button', onClick }) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} custom-button`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
