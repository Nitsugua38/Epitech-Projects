import { useState } from 'react'
import "./Notifications.css";

import NotifPost from './NotifPost';

function Notifications() {


    const [activeTab, setActiveTab] = useState("all");


    return (
        <>
            <div id='TopBar'>
                <div className={activeTab === "all" ? "activeTAB" : ""} onClick={() => setActiveTab("all")}>All</div>
                <div className={activeTab === "unread" ? "activeTAB" : ""} onClick={() => setActiveTab("unread")}>Unread</div>
                <div className={activeTab === "jobs" ? "activeTAB" : ""} onClick={() => setActiveTab("jobs")}>Jobs</div>
                <div className={activeTab === "follows" ? "activeTAB" : ""} onClick={() => setActiveTab("follows")}>Follows</div>
                <div className={activeTab === "likes" ? "activeTAB" : ""} onClick={() => setActiveTab("likes")}>Likes</div>
            </div>


            <main>
                <NotifPost aT={activeTab} />
                <NotifPost aT={activeTab} />
                <NotifPost aT={activeTab} />
                <NotifPost aT={activeTab} />
                <NotifPost aT={activeTab} />
                <NotifPost aT={activeTab} />
            </main>
        </>
    )
}

export default Notifications