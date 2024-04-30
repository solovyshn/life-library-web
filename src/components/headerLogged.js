import React from 'react';
import '../styles.css';

const HeaderLogged = () => {
    return (
        <header className="signup-header">
            <div className="header-left">
                <h1 className="header-title">
                    <span className="light-font">Life's</span> <span className="semibold-font">Library</span>
                </h1>
                <div className="search-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button className="search-button">Search</button>
                </div>
            </div>
            <div className="header-right">
                <button className="header-button">
                    <img src="/path_to_home_icon.png" alt="Home Icon" className="button-icon" />
                    Home
                </button>
                <button className="header-button">
                    <img src="/path_to_shelves_icon.png" alt="Shelves Icon" className="button-icon" />
                    Shelves
                </button>
                <div className="profile-container">
                    <img src="/path_to_profile_picture.png" alt="Profile Picture" className="profile-picture" />
                </div>
            </div>
        </header>
    );
};

export default HeaderLogged;
