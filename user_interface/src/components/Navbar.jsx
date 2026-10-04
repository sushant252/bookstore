import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>

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

          {/* Mobile Login */}
          <a
            href="#login"
            className="mobile-login"
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-person"></i>
            Login
          </a>

        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">

          {/* Search */}
          <button
            className="nav-icon-btn"
            aria-label="Search"
          >
            <i className="bi bi-search"></i>
          </button>

          {/* Cart */}
          <button
            className="nav-icon-btn cart-btn"
            aria-label="Cart"
          >
            <i className="bi bi-bag"></i>

            <span className="cart-count">
              2
            </span>
          </button>

          {/* Login */}
          <button className="login-btn">
            <i className="bi bi-person"></i>
            <span>Login</span>
          </button>

          {/* Mobile Menu */}
          <button
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
  );
}

export default Navbar;