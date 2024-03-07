import React from 'react';
const Register = () => {
    return (<>
        <h1>Register</h1>

        <form>
            <div>
                <label htmlFor="username">Username</label>
                <input type="email" id="username" placeholder="Enter username" />
            </div>
        </form>
        <form>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" />
            </div>
        </form>
        <form>
            <div>
                <label htmlFor="password">Confirms password</label>
                <input type="password" id="password" placeholder="Password" />
            </div>
        </form>

        <button type="submit">Save</button>
        <small id="register"><a href="/">Back</a></small>
    </>)
}

export default Register