import { Dropdown, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "../assets/logo.png";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  const [isloggedin, setIsloggedin] = useState(false);
  const [username, setUserName] = useState("");

  // ================= CLOCK =================
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ================= LOGIN CHECK =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token) {
      setIsloggedin(true);
      setUserName(name || "Admin");
    }
  }, []);

  // ================= LOGOUT =================
  function doLogout() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    setIsloggedin(false);
    setUserName("");

    navigate("/");
  }

  // ================= FORMAT TIME =================
  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <nav className="admin-navbar">

      {/* ================= LOGO ================= */}
      <div className="navbar-logo">

        <div className="logo-box">
          <Image
            src={logo}
            width={32}
            height={32}
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        <div className="logo-text">

          <div className="logo-title">
            RDEC
          </div>

         

          {/* ================= REAL TIME CLOCK ================= */}
          
          <div className="navbar-clock">
            <i className="bi bi-clock me-1"></i>
            {formattedTime}
          </div>

        </div>

      </div>


      {/* ================= PROFILE ================= */}
      <div className="navbar-profile">

        <Dropdown drop="down" className="profile-dropdown">

          <Dropdown.Toggle
            variant="light"
            className="border-0 rounded-3 p-1 profile-toggle"
          >

            <div className="d-flex align-items-center text-start">

              {/* USER ICON */}
              <div className="user-icon">
                <i className="bi bi-person-fill"></i>
              </div>

              {/* USER INFO */}
              <div className="user-info">

                <div className="username">
                  {username || "Admin"}
                </div>

                <small className="user-role">
                  Admin
                </small>

              </div>

            </div>

          </Dropdown.Toggle>


          {/* ================= DROPDOWN ================= */}
          <Dropdown.Menu className="profile-menu">

            <Dropdown.Item
              as={NavLink}
              to="/profile"
              className="rounded-2 py-2"
            >
              <i className="bi bi-person me-2"></i>
              Profile
            </Dropdown.Item>

            <Dropdown.Item
              as={NavLink}
              to="/settings"
              className="rounded-2 py-2"
            >
              <i className="bi bi-gear me-2"></i>
              Settings
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item
              onClick={doLogout}
              className="rounded-2 py-2 text-danger"
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </Dropdown.Item>

          </Dropdown.Menu>

        </Dropdown>

      </div>

    </nav>
  );
}

export default NavBar;