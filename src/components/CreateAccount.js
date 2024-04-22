import React, { useState } from 'react';
import '../styles.css'; 
import citiesData from './regions.js'; // Import the cities data

const CreateAccount = () => {
  // const [formData, setFormData] = useState({
  //   Name: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add your registration logic here, such as sending data to a backend API
  //   console.log("yay");
  // };
  return (
    <div className="container">
    <div className="create-account-box">
      <h2 className="create-account-title">Create account</h2>
      <div className="form-fields">
        <div className="form-group">
          <label htmlFor="yourName" className="field-label">Your name</label>
          <input type="text" id="yourName" className="form-control" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="field-label">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Enter your password" />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="field-label">Email</label>
          <input type="email" id="email" className="form-control" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="reEnterPassword" className="field-label">Re-enter password</label>
          <input type="password" id="reEnterPassword" className="form-control" placeholder="Re-enter your password" />
        </div>
        <div className="form-group">
          <label htmlFor="birthday" className="field-label">Birthday</label>
          <input type="date" id="birthday" className="form-control" placeholder="Enter your birthday" />
        </div>
        <div className="form-group">
          <label htmlFor="city" className="field-label">City</label>
          <select id="city" className="form-control">
            <option value="">Select city</option>
            {citiesData.map(city => (
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>
      </div>
        <button type="submit" className="submit-button">
          Sign up
        </button>
        <div className="sign-in-link">
          <hr className="separator" />
          <span className="separator-text">Already have an account? <a href="https://example.com" className="sign-in-text">Sign in</a></span>
          <hr className="separator" />
        </div>
    </div>
          <div className="copyright-text">
          ©AlAskA Corporation
        </div>
</div>  
  );
};

export default CreateAccount;