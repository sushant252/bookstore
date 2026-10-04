import { NavLink, useNavigate } from "react-router-dom";
import { ListGroup, Dropdown, Image } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import logo from "../assets/logo.png";
import { useState, useEffect } from "react";

import './Sidebar.css'
// ================= LIVE CLOCK =================


function Sidebar() {
  const navigate = useNavigate();

  const [isloggedin, setIsloggedin] = useState(false);
  const [username, setUserName] = useState("");

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

  // ================= MENU ITEMS =================
  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: "bi-speedometer2",
      label: "Dashboard",
    },
    {
      path: "/books",
      icon: "bi-book",
      label: "Manage Books",
    },
    {
      path: "/discounts",
      icon: "bi-tags",
      label: "Discounts",
    },
    {
      path: "/orders",
      icon: "bi-bag-check",
      label: "Orders",
    },
    {
      path: "/customers",
      icon: "bi-people",
      label: "Customers",
    },
    {
      path: "/users",
      icon: "bi-people",
      label: "Users",
    },

  ];

  return (
    <>
      {/* ================= SIDEBAR ================= */}
      <div
        className="d-flex sidebar flex-column sticky-top "
        style={{
          width: "260px",
          height: "100vh",
          background: "linear-gradient(180deg, #f8feff 0%, #ddeef8 100%)",
          borderRight: "1px solid #cee6ea",
          boxShadow: "4px 0 18px rgba(82, 56, 30, 0.08)",
        }}
      >
     
        {/* ================= LIVE CLOCK ================= */}
        

        {/* ================= NAVIGATION ================= */}
        <div className="flex-grow-1 overflow-auto px-3 py-3 main-menu">
          {/* MAIN MENU */}
          <div
            className="text-uppercase fw-semibold mb-2 px-2"
            style={{
              fontSize: "10px",
              letterSpacing: "1.5px",
              color: "#3755a0",
            }}
          >
            Main Menu
          </div>

          <ListGroup variant="flush">
            {menuItems.map((item) => (
              <ListGroup.Item
                key={item.path}
                as={NavLink}
                to={item.path}
                className="sidebar-link border-0 rounded-3 mb-1 px-3 py-2"
                style={{
                  color: "#3c4260",
                  background: "transparent",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
              >
                <i
                  className={`bi ${item.icon} me-3`}
                  style={{
                    fontSize: "16px",
                  }}
                ></i>

                <span
                  className="fw-medium"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {item.label}
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* ================= ACCOUNT ================= */}
          <div
            className="mt-3 mb-2 px-2 text-uppercase fw-semibold"
            style={{
              fontSize: "10px",
              letterSpacing: "1.5px",
              color: "#5042a2",
            }}
          >
            Account
          </div>

          <ListGroup variant="flush">
            {/* PROFILE */}
            <ListGroup.Item
              as={NavLink}
              to="/profile"
              className="sidebar-link border-0 rounded-3 mb-1 px-3 py-2"
              style={{
                color: "#3c4960",
                background: "transparent",
                textDecoration: "none",
              }}
            >
              <i className="bi bi-person me-3 fs-6"></i>

              <span
                className="fw-medium"
                style={{
                  fontSize: "14px",
                }}
              >
                Profile
              </span>
            </ListGroup.Item>

            {/* SETTINGS */}
            <ListGroup.Item
              as={NavLink}
              to="/settings"
              className="sidebar-link border-0 rounded-3 mb-1 px-3 py-2"
              style={{
                color: "#3c4460",
                background: "transparent",
                textDecoration: "none",
              }}
            >
              <i className="bi bi-gear me-3 fs-6"></i>

              <span
                className="fw-medium"
                style={{
                  fontSize: "14px",
                }}
              >
                Settings
              </span>
            </ListGroup.Item>
          </ListGroup>

          {/* ================= QUOTE ================= */}
          <div
            className="mt-3 p-3 rounded-4"
            style={{
              background: "#37446f",
              color: "white",
              boxShadow: "0 8px 20px rgba(111, 78, 55, 0.18)",
            }}
          >
            <i className="bi bi-quote fs-5"></i>

            <p
              className="mb-1 mt-1"
              style={{
                fontSize: "11px",
                lineHeight: "1.5",
              }}
            >
              A room without books is like a body without a soul.
            </p>

            <small
              style={{
                opacity: 0.75,
                fontSize: "11px",
              }}
            >
              — 
            </small>
          </div>
        </div>

      
      </div>

     
    </>
  );
}

export default Sidebar;
