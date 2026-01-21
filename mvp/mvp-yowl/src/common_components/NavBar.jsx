import { useState } from 'react'
import "./NavBar.css";

import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
            <nav className="navbar">
                <Link to="/">Home</Link><br/>
                <Link to="/explore">Explore</Link><br/>
                <Link to="/notifications">Notifications</Link><br/>
                <Link to="/messages">Messages</Link><br/>
                <Link to="/profile">Profile</Link>
            </nav>    
        </>
    )
}

export default NavBar