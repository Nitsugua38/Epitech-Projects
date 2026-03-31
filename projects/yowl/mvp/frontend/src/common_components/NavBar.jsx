import "./NavBar.css";
import { Link } from "react-router-dom";

import home_image from "./assets/home.svg";
import explore_image from "./assets/explore.svg";
import notification_image from "./assets/notification.svg";
import message_image from "./assets/message.svg";
import profile_image from "./assets/profile.svg";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/home"><img src={home_image} alt="Home"/><span>Home</span></Link>
      <Link to="/explore"><img src={explore_image} alt="Explore"/><span>Explore</span></Link>
      <Link to="/notifications"><img src={notification_image} alt="Notifications"/><span>Notifications</span></Link>
      <Link to="/messages"><img src={message_image} alt="Messages"/><span>Messages</span></Link>
      <Link to="/profile"><img src={profile_image} className='profileNavImg' alt="Profile"/><span className='profileNavSpan'>Profile</span></Link>
      <Link to="/newpost" className="newpost-link">
        <span>New Post</span>
      </Link>
    </nav>
  );
}

export default NavBar;

