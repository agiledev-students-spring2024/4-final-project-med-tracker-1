import React from 'react';
import './Login.css';

const ForgetPassword = () => {
    return (
        <>
            <h1>Forget Password</h1>

            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="username" id="username" aria-describedby="usernameHelp" placeholder="Enter username" />
                </div>
            </form>
            <form>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" />
                </div>
                
            </form>
            
            <button type="submit">Submit</button>
            <small><a href="/">Back</a></small>
        </>
    );
}

export default ForgetPassword;
