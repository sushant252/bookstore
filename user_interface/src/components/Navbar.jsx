
import { useState } from "react";
import "./Navbar.css";
import Login from "./Login";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';  

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  let navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" &&
    !!localStorage.getItem("token")
  );

  const [userName, setUserName] = useState(
    localStorage.getItem("name") || ""
  );

  const{ products }= useSelector((state) => state.cart);

  // Successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setUserName(localStorage.getItem("name") || "User");
    setShowLogin(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUserName("");
    setShowLogin(false);
    setMenuOpen(false);
  };
  function goToCartPage() {
 navigate('/cart')
}
  return (
    <>
      <header className="navbar">
        <div className="navbar-container">

          {/* Logo */}
          <a href="/" className="navbar-logo">
            <span className="logo-icon">
              <i className="bi bi-book"></i>
            </span>
            <span>BookHaven</span>
          </a>

          {/* Navigation */}
          <nav
            className={`navbar-links ${menuOpen ? "active" : ""}`}
          >
            <a href="/" onClick={() => setMenuOpen(false)}>
              Home
            </a>

            <a href="/books" onClick={() => setMenuOpen(false)}>
              Shop
            </a>

            <a href="#categories" onClick={() => setMenuOpen(false)}>
              Categories
            </a>

            <a href="#bestsellers" onClick={() => setMenuOpen(false)}>
              Bestsellers
            </a>

            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>

            {/* Mobile Login / Logout */}
            {!isLoggedIn ? (
              <button
                type="button"
                className="mobile-login"
                onClick={() => {
                  setMenuOpen(false);
                  setShowLogin(true);
                }}
              >
                <i className="bi bi-person"></i>
                Login
              </button>
            ) : (
              <button
                type="button"
                className="mobile-login"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </button>
            )}
          </nav>

          {/* Right Actions */}
          <div className="navbar-actions">

            {/* Welcome User */}
            {isLoggedIn && (
              <span className="welcome-user">
                Welcome, {userName}
              </span>
            )}

            {/* Search */}
            <button
              type="button"
              className="nav-icon-btn"
              aria-label="Search"
            >
              <i className="bi bi-search"></i>
            </button>

            {/* Cart */}
            <button
              type="button"
              className="nav-icon-btn cart-btn"
              aria-label="Cart"
              onClick={goToCartPage}
            >
              <i className="bi bi-bag"></i>
              {
                products.length > 0 && <span className="cart-count">
                   {products.length }
                  </span>
              }
            </button>

            {/* Login / Logout */}
            {!isLoggedIn ? (
              <button
                type="button"
                className="login-btn"
                onClick={() => setShowLogin(true)}
              >
                <i className="bi bi-person"></i>
                <span>Login</span>
              </button>
            ) : (
              <button
                type="button"
                className="login-btn"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Logout</span>
              </button>
            )}

            {/* Mobile Menu */}
            <button
              type="button"
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <i
                className={`bi ${
                  menuOpen ? "bi-x-lg" : "bi-list"
                }`}
              ></i>
            </button>

          </div>
        </div>
      </header>

      {/* Login Modal */}
      <Login
        show={showLogin}
        onHide={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default Navbar;
