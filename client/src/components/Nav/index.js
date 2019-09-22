import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="/">
                Google Books
            </Link>
            <div>
                <ul className="navbar-nav">
                    <li className="nav-item link">
                        <Link to="/search">Search</Link>
                        {/* <a className="nav-link" onClick={props.switch}>Search Page</a> */}
                    </li>
                    <li className="nav-item link">
                        <Link to="/saved">Saved</Link>
                        {/* <a className="nav-link" onClick={props.switch}>Saved Page</a> */}
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar;