import React, { useState } from 'react';
import './Form.css'

const Form = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(newPassword.length >= 8);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordValid(newConfirmPassword === password);
  };

  const handleSubmit = () => {
    if (emailValid && passwordValid && confirmPasswordValid) {
      alert('Form submitted successfully');
    } else {
      alert('Can’t submit the form. Please check your inputs.');
    }
  };

  return (
    <div style={{flex:1, height: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display:'flex'}}>
        <div className='inputDiv'>
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={handleEmailChange}
        style={{  border: `2px solid ${emailValid ? 'green' : 'red'}` }}
      />
      {!emailValid && <p style={{ color: 'red' }}>Invalid email format</p>}
      </div>
      <div className='inputDiv'>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        style={{ border: `2px solid ${passwordValid ? 'green' : 'red'}` }}
      />
      {!passwordValid && (
        <p style={{ color: 'red' }}>Password must be at least 8 characters long</p>
      )}
      </div>

        <div className='inputDiv'>
      <label>Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        style={{ border: `2px solid ${confirmPasswordValid ? 'green' : 'red'}` }}
      />
      {!confirmPasswordValid && (
        <p style={{ color: 'red' }}>Passwords do not match</p>
      )}
      </div>

      <button onClick={handleSubmit} style={{color:'white', backgroundColor:'#0074B7', padding:'10px', fontSize:'15px', borderRadius:'5px', border:'none'}}>Sign Up</button>
    </div>
  );
};

export default Form