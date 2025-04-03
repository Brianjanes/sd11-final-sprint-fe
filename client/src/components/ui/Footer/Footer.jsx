import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Film } from "lucide-react";
import AdminLink from "../../AdminLink";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-column">
            <h3 className="footer-heading">CineFlex</h3>
            <Link to="/" className="footer-logo-link">
              <Film className="footer-logo-icon" />
              <span className="footer-logo-text">CineFlex</span>
            </Link>
            <p className="footer-text">
              Your premium movie experience destination.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Twitter className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Instagram className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Youtube className="social-icon" />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">About</h3>
            <nav className="footer-nav">
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <Link to="/careers" className="footer-link">
                Careers
              </Link>
              <Link to="/news" className="footer-link">
                News
              </Link>
              <Link to="/investors" className="footer-link">
                Investors
              </Link>
              <Link to="/contact" className="footer-link">
                Contact Us
              </Link>
              <AdminLink />
            </nav>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Movies</h3>
            <nav className="footer-nav">
              <Link to="/movies" className="footer-link">
                Now Playing
              </Link>
              <Link to="/coming-soon" className="footer-link">
                Coming Soon
              </Link>
              <Link to="/imax" className="footer-link">
                IMAX
              </Link>
              <Link to="/vip" className="footer-link">
                VIP
              </Link>
              <Link to="/screenx" className="footer-link">
                ScreenX
              </Link>
            </nav>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Membership</h3>
            <nav className="footer-nav">
              <Link to="/scene" className="footer-link">
                SCENE+
              </Link>
              <Link to="/subscribe" className="footer-link">
                CineFlex Subscription
              </Link>
              <Link to="/gift-cards" className="footer-link">
                Gift Cards
              </Link>
              <Link to="/benefits" className="footer-link">
                Corporate Benefits
              </Link>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <Link to="/privacy" className="footer-link-small">
              Privacy Policy
            </Link>
            <Link to="/terms" className="footer-link-small">
              Terms of Use
            </Link>
            <Link to="/cookies" className="footer-link-small">
              Cookie Policy
            </Link>
          </div>
          <p className="copyright">
            © 2024 CineFlex Entertainment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
