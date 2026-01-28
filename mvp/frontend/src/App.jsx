import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home.jsx";
import Explore from "./pages/explore/Explore.jsx";
import Notifications from "./pages/notifications/Notifications.jsx";
import Messages from "./pages/messages/Messages.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Login from "./pages/login/Login.jsx";

import NavBar from "./common_components/NavBar.jsx";

function App() {
  return (
    <BrowserRouter>

      <NavBar />

      <Routes>
        {/* Redirect root to signup/login */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
