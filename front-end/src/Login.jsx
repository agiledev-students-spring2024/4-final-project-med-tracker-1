import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <>
            <h1>Login</h1>
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
            <small id="changePassword"><a href="/forgetpassword">Forget Password</a></small>
            <small id="register"><a href="/register">Register for an account?</a></small>
        </>
    );
}

export default Login;
