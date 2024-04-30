import React, { useState } from 'react';
import '../styles.css'; 
import axios from 'axios';
import Header from './header.js';

const LogIn = () => {
  const [yourPassword, setYourPassword] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
      switch (e.target.id) {
          case 'yourPassword':
              setYourPassword(e.target.value);
              break;
          case 'yourEmail':
              setYourEmail(e.target.value);
              break;
          default:
              break;
      }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!yourEmail ) {
      newErrors.yourEmail = 'Please enter email address.';
    }
    if (!yourPassword ) {
      newErrors.password = 'Please enter password';
    }
    setErrors(newErrors);  
    if(Object.keys(errors).length > 0){
      return;
    }
    const formData = {
      yourPassword,
      yourEmail
    };
    console.log(formData);

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        const newErrors = {};
        if (!response.ok) {
            // Handle non-successful response (HTTP error)
            if (response.status === 404) {
                newErrors.yourEmail = 'User with this email doesn\'t exist';
            } else if (response.status === 401) {
                newErrors.password = 'Incorrect password';
            } 
            else if (response.status === 400) {
                newErrors.yourEmail = 'Type in information';
            }
            else {
                newErrors.yourEmail('Error occurred');
            }
        }
        setErrors(newErrors);
        console.log(data);  // Handle response (e.g., show message to user)
    } catch (error) {
        console.error('Error:', error);
    }

  };

  return (
    <div>
        <Header/>
        <div className="container">
        <form className="signin-box" onSubmit={handleSubmit}>
            <h2 className="create-account-title">Sign in</h2>
            <div className="signform-fields">
                <div className="signform-group">
                    <label htmlFor="yourEmail" className="field-label">Email</label>
                    <input type="text" id="yourEmail" className="form-control" value={yourEmail} onChange={handleInputChange} />
                    {errors.yourEmail && <p className="error-message">{errors.yourEmail}</p>}
                </div>
                <div className="signform-group">
                    <label htmlFor="yourPassword" className="field-label">Password</label>
                    <input type="password" id="yourPassword" className="form-control" value={yourPassword} onChange={handleInputChange} />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
            </div>
            <button type="submit" className="signin-submit-button">
                Sign in
            </button>
            <div className="sign-up-link">
                <hr className="separator-signin" />
                <span className="separator-text">New to <span className="bold-er">Life's</span> <span className="bold-more">Library</span>?</span>
                <hr className="separator-signin" />
            </div>
            <button className="signup-link-button">
                Sign up
            </button>
        </form>
            <div className="copyright-text">
            ©AlAskA Corporation
            </div>
        </div>  

    </div>
  );
};

export default LogIn;