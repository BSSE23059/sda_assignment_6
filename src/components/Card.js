import React from 'react';
import './Card.css';

const Card = ({ title, children }) => {
    return (
        <div className="card custom-card">
            {title && <div className="card-header">{title}</div>}
            <div className="card-body">{children}</div>
        </div>
    );
};

export default Card;
