import React from "react";
import './style/navBar.css';
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="navbar">
            <div className="navbar__logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1280px-Marvel_Logo.svg.png" alt="logo" />
            </div>
            <div className="navbar__menu">
                <Link to="/" className="navbar__menu-item">Home</Link>
            </div>
        </div>
    );
}

export default NavBar;

