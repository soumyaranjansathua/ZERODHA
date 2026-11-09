import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import { FRONTEND_URL } from "../config";

const Menu = () => {
  const location = useLocation();
  const { user, logout } = useContext(GeneralContext);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    window.location.href = `${FRONTEND_URL}/signup`;
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const getMenuClass = (path) => {
    return location.pathname === path ? activeMenuClass : menuClass;
  };

  const username = user?.username || "Trader";
  const initials = username.substring(0, 2).toUpperCase();

  return (
    <div className="menu-container">
      <Link to="/">
        <img src="/logo.png" alt="Zerodha Logo" style={{ width: "50px" }} />
      </Link>
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/">
              <p className={getMenuClass("/")}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders">
              <p className={getMenuClass("/orders")}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings">
              <p className={getMenuClass("/holdings")}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions">
              <p className={getMenuClass("/positions")}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds">
              <p className={getMenuClass("/funds")}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps">
              <p className={getMenuClass("/apps")}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />

        <div style={{ position: "relative" }}>
          <div className="profile" onClick={handleProfileClick} title="Account Menu">
            <div className="avatar">{initials}</div>
            <p className="username">{username.toUpperCase()}</p>
          </div>

          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                right: "0",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                borderRadius: "6px",
                width: "210px",
                padding: "12px",
                zIndex: 9999,
                border: "1px solid #e0e0e0",
              }}
            >
              <div style={{ borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "8px" }}>
                <p style={{ margin: 0, fontWeight: "600", fontSize: "14px", color: "#333" }}>{username}</p>
                {user?.email && (
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#777" }}>{user.email}</p>
                )}
              </div>

              <a
                href={FRONTEND_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  padding: "6px 0",
                  color: "#387ed1",
                  textDecoration: "none",
                  fontSize: "13px",
                }}
              >
                🌐 Visit Zerodha Home
              </a>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  padding: "6px 10px",
                  backgroundColor: "#fbebe8",
                  color: "#d9534f",
                  border: "1px solid #f5c6cb",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
