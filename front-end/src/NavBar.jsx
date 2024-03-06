import React from 'react';
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = props => {
    return(
        <>
            <nav className="nav-bar">
                <ul className="nav-links">
                    <li className="nav-item">
                        <Link className="links" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="links" to="/history">History</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="links" to="/medicines">Medicines</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="links" to="/setting">Setting</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar;