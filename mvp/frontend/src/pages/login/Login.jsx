import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const formBoxRef = useRef(null);

  const [mode, setMode] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [regFirstname, setRegFirstname] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const goLogin = () => {
    setMode("login");
    setErrorMessage("");
    setSuccessMessage("");
    formBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goRegister = () => {
    setMode("register");
    setErrorMessage("");
    setSuccessMessage("");
    formBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const loginUser = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("http://localhost:5173/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || data.error || "Invalid credentials");
      }

      console.log("Login success:", data);

      navigate("/profile"); // redirect after login
    } catch (err) {
      setErrorMessage("Login error: " + err.message);
    }
  };

  const registerUser = async () => {
    if (!regFirstname || !regEmail || !regPassword) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("http://localhost:5173/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regFirstname,
          email: regEmail,
          password: regPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Registration failed");
      }

      setSuccessMessage("Account created successfully!");
      setTimeout(() => navigate("/profile"), 800);
    } catch (err) {
      setErrorMessage("Register error: " + err.message);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    mode === "login" ? loginUser() : registerUser();
  };

  return (
    <div className="container">
      <div className="auth-buttons">
        <button className="btn" onClick={goLogin}>Sign In</button>
        <button className="btn" onClick={goRegister}>Sign Up</button>
      </div>

      <div className="form-box" ref={formBoxRef}>
        <div className={`login-container ${mode !== "login" ? "slide-left" : ""}`}>
          <header>Sign In</header>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="submit">Login</button>
          </form>
        </div>

        <div className={`register-container ${mode === "register" ? "active" : ""}`}>
          <header>Create account</header>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="First name"
              className="input-field"
              value={regFirstname}
              onChange={(e) => setRegFirstname(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />
            <button className="submit">Create account</button>
          </form>
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default Login;
