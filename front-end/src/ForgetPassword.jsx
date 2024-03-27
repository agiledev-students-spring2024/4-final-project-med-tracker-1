import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './icons/favicon.png'
import './Login.css';

export const ForgetPassword = () => {
    return (
        <div className="forget-password-page full-white-bg register-page">
            <img className="app-logo" src={logo} alt="app logo"/>
            <h1 className="app-title">Med Tracker</h1>
            <h2>Enter Email below</h2>
            <h2>get link to reset password</h2>
            <form className="input-form register-form">
                <input type="email" id="username" placeholder="Email" />
                <Link to="/reset-password" className="blue-btn">Request link</Link>
            </form>
        </div>
    );
}

function changePassword(newPassword) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // make the actual request to server
      // simulating a successful password change now
      resolve({ success: true });
      // If there was an error during the password change,reject the promise
      // reject({ success: false, message: 'An error occurred' });
    }, 1000);
  });
};

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(password === passwordConfirm){
            changePassword(password)
                .then((result) => {
                    if (result.success) {
                        navigate('/login');
                    } else {
                        setError(result.message); // Show backend provided error message
                    }
                })
                .catch((error) => {
                    setError('Failed to change password. Please try again.');
                });
        }
        else {
            setError('Passwords do not match. Please try again.')
        }
    }
    return (
        <div className="full-white-bg reset-password-page register-page">
            <img className="app-logo" src={logo} alt="app logo"/>
            <h2>Change password for</h2>
            <h1 className="app-title">Med Tracker</h1>
            <form className="input-form register-form">
                <input 
                    type="password" 
                    id="password"
                    value={password} 
                    placeholder="Password" 
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type="password" 
                    id="confirm-password" 
                    value={passwordConfirm} 
                    placeholder="Confirm Password"
                    onChange={e => setPasswordConfirm(e.target.value)}
                />
                <button type="submit" onClick={event => handleSubmit(event)} className="blue-btn">Save</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}
