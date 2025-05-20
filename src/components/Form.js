import React from 'react';
import './Form.css';

const Form = ({ onSubmit, children }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit} className="custom-form">
            {children}
        </form>
    );
};

export default Form;
