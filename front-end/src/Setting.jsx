import React from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom' 
const Setting = () => {
    return(
    <>
    <NavBar />
        <h1>Settings</h1>

        <form>
            <div>
                <label htmlFor="username">Username</label>
                <input type="username" id="username" placeholder="Enter username" />
            </div>
        </form>
        <form>
            <div>
                <label htmlFor="emergencycontact">Emergency contact</label>
                <input type="name" id="name" placeholder="Enter contact name" />
                <input type="phone" id="phone" placeholder="Enter contact phone number" />
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
                <label htmlFor="password">Confirm password</label>
                <input type="password" id="password" placeholder="Password" />
            </div>
        </form>

        <Link to="/home" className="button-link">Submit</Link>
    </>
    )
}

export default Setting