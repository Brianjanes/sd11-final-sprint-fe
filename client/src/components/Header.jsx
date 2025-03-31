import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container flex justify-between items-center">
        <h1>Final Sprint</h1>
        <nav className="flex gap-4">
          <Link to="/" className="py-2 px-4">
            Home
          </Link>
          <Link to="/about" className="py-2 px-4">
            About
          </Link>
          <Link to="/contact" className="py-2 px-4">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
