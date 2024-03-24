import React from 'react';
import { Link } from 'react-router-dom'
import {ReactComponent as HomeIcon} from './icons/Home.svg';
import {ReactComponent as HistoryIcon} from './icons/History.svg';
import {ReactComponent as MedIcon} from './icons/Pill.svg';
import {ReactComponent as SettingIcon} from './icons/Setting.svg';
import './NavBar.css'

const NavBar = props => {
    return(
        <>
            <nav className="nav-bar">
                <ul className="nav-links">
                    <li className="nav-item">
                        <div className="nav-box">
                        <Link className="links" to="/home">
                            <HomeIcon className="icon"/>
                            <p className="nav-text">Home</p>
                        </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-box">
                        <Link className="links" to="/history">
                            <HistoryIcon className="icon"/>
                            <p className="nav-text">History</p>
                        </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-box">
                        <Link className="links" to="/medicines">
                            <MedIcon className="icon"/>
                            <p className="nav-text">Medicines</p>
                        </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-box">
                        <Link className="links" to="/setting">
                            <SettingIcon className="icon"/>
                            <p className="nav-text">Setting</p>
                        </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar;