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
  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        {/* Root path: redirect to login if not logged in */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/signin" replace />}
        />

        {/* Home page */}
        <Route path="/home" element={<Home />} />

        {/* Other pages */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />

        {/* Login */}
        <Route
          path="/signin"
          element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />}
        />

        {/* Catch-all unknown routes */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/signin"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
