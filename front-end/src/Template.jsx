import React from 'react';
import NavBar from './NavBar';

const Template = () => {
    return (
        <>
        <div className="half-color-bg">
            <div className="page-header">
                <h1 className="title">Hi, Katie!</h1>
                <p className="subtitle">February 14, 2024</p>
            </div>
        </div>
        <div className="body-container">
            <NavBar />
        </div>
        </>
    );
};

export default Template;