import '../styles/navbar.css';

import { useState } from 'react';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <a href="/">
          <div className="logo">
            <img src="images/logo.svg" alt="Logo" className="logo" />
          </div>
        </a>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src="images/hamburger.svg" alt="Logo" className="logo" />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <a href="/">Home</a>
            </li>
            <li className={location.pathname === '/employee' ? 'active' : ''}>
              <a href="/employee">Employee</a>
            </li>
            <li className="user-state">
              <a href="" className="userprofile-link">
                <img
                  src="images/userprofile.svg"
                  alt="Logo"
                  className="userprofile"
                />
              </a>
              <div className="user-state-btn">
                <button className="login">Login</button>
                <button className="logout">Signup</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
