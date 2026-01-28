import { useState } from 'react'
import "./NavBar.css";

import home_image from "./assets/home.svg"
import explore_image from "./assets/explore.svg"
import notification_image from "./assets/notification.svg"
import message_image from "./assets/message.svg"
import profile_image from "./assets/profile.svg"

import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
            <nav className="navbar">
                <Link to="/home"><img src={home_image}></img><span>Home</span></Link>
                <Link to="/explore"><img src={explore_image}></img><span>Explore</span></Link>
                <Link to="/notifications"><img src={notification_image}></img><span>Notifications</span></Link>
                <Link to="/messages"><img src={message_image}></img><span>Messages</span></Link>
                <Link to="/profile"><img src={profile_image} className='profileNavImg'></img><span className='profileNavSpan'>Profile</span></Link>
            </nav>    
        </>
    )
}

export default NavBar