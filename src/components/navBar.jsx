import React from "react";
import './style/navBar.css';

function NavBar() {
    return (
        <div className="navbar">
            <div className="navbar__logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1280px-Marvel_Logo.svg.png" alt="logo" />
            </div>
            <div className="navbar__menu">
                <button className="navbar__menu-item">Home</button>
                <button className="navbar__menu-item">About</button>
                <button className="navbar__menu-item">Services</button>
            </div>
        </div>
    );
}

export default NavBar;

