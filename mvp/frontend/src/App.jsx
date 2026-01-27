import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home.jsx';
import Explore from './pages/explore/Explore.jsx';
import Notifications from './pages/notifications/Notifications.jsx';
import Messages from './pages/messages/Messages.jsx';
import Profile from './pages/profile/Profile.jsx';

import NavBar from './common_components/NavBar.jsx';





function App() {

    return (
        <>
            <BrowserRouter>

                <NavBar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
