import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL, DASHBOARD_URL } from "../../config";

function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setIsLoading(true);

    const wakeTimer = setTimeout(() => {
      setIsWakingUp(true);
    }, 2500);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.identifier,
          password: formData.password,
        }),
      });

      const data = await response.json();
      clearTimeout(wakeTimer);
      setIsWakingUp(false);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        if (data.user?.username) localStorage.setItem("username", data.user.username);
        if (data.user?.email) localStorage.setItem("email", data.user.email);

        setIsError(false);
        setMessage("Login successful! Redirecting to your Kite dashboard...");

        // Cross-domain redirection: Pass token in URL query params so dashboard receives it
        const targetUrl = new URL(DASHBOARD_URL);
        targetUrl.searchParams.set("token", data.token);
        if (data.user?.username) targetUrl.searchParams.set("username", data.user.username);
        if (data.user?.email) targetUrl.searchParams.set("email", data.user.email);

        setTimeout(() => {
          window.location.href = targetUrl.toString();
        }, 1200);
      } else {
        setIsError(true);
        setMessage(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      clearTimeout(wakeTimer);
      setIsWakingUp(false);
      setIsError(true);
      setMessage("Server connection failed. The backend service may still be waking up on Render. Please try again in 10-15 seconds.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "36px 32px",
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <img
            src="/media/images/logo.svg"
            alt="Zerodha"
            style={{ width: "140px", marginBottom: "16px" }}
          />
          <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#424242", margin: 0 }}>
            Login to Kite
          </h2>
          <p style={{ color: "#757575", fontSize: "14px", marginTop: "6px" }}>
            Zerodha's trading and investment platform
          </p>
        </div>

        {isWakingUp && (
          <div
            style={{
              backgroundColor: "#e8f4fd",
              border: "1px solid #b8daff",
              color: "#004085",
              fontSize: "13px",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          >
            ⏱️ Connecting to server... Free cloud servers take ~30s to wake up on first load.
          </div>
        )}

        {message && (
          <div
            style={{
              backgroundColor: isError ? "#fce8e6" : "#e6f4ea",
              border: `1px solid ${isError ? "#f5c6cb" : "#c3e6cb"}`,
              color: isError ? "#c5221f" : "#137333",
              fontSize: "13px",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
              Email or Username
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="e.g. user@domain.com or trader1"
              required
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#387ed1",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "600",
              border: "none",
              borderRadius: "4px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "background-color 0.2s",
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#387ed1", textDecoration: "none", fontWeight: "500" }}>
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

