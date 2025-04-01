import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Search, MapPin, User, Menu, Film } from "lucide-react";

const Header = () => {
  return (
    <header>
      <div className="header-top">
        <div className="header-container">
          <div className="location-selector">
            <MapPin className="location-icon" />
            <span>Find a Theatre</span>
          </div>
          <div className="header-actions">
            <a href="#" className="header-link">
              Sign In
            </a>
            <span className="divider">|</span>
            <a href="#" className="header-link">
              Join
            </a>
            <span className="divider">|</span>
            <a href="#" className="header-link">
              SCENE+
            </a>
          </div>
        </div>
      </div>
      <div className="header-main">
        <div className="header-container">
          <Link to="/" className="logo-link">
            <Film className="logo-icon" />
            <span className="logo-text">CineFlex</span>
          </Link>
          <nav className="header-nav">
            <Link to="/movies" className="nav-link">
              Movies
            </Link>
            <Link to="/theatres" className="nav-link">
              Theatres
            </Link>
            <Link to="/food" className="nav-link">
              Food & Drink
            </Link>
            <Link to="/events" className="nav-link">
              Events
            </Link>
            <Link to="/vip" className="nav-link">
              VIP
            </Link>
            <Link to="/imax" className="nav-link">
              IMAX
            </Link>
          </nav>
          <div className="header-right">
            <div className="search-container">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#222",
                  borderRadius: "4px",
                  padding: "8px",
                }}
              >
                <Search size={16} color="#999" style={{ marginRight: "8px" }} />
                <input
                  type="search"
                  placeholder="Search for movies, theatres..."
                  style={{
                    background: "none",
                    border: "none",
                    color: "#fff",
                    width: "300px",
                    fontSize: "14px",
                    padding: 0,
                  }}
                />
              </div>
            </div>
            <button className="menu-button">
              <Menu className="menu-icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-container">
          <div className="buy-tickets-container">
            <Link to="/tickets" className="buy-tickets-button">
              Buy Tickets
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
