import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logo from "../assets/images/ambu logo.webp";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setOpenSubmenu(null);
    }
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { 
      path: "/services", 
      label: "Services",
      submenu: [
        { path: "/categorized_ambulance", label: "Categorized Ambulance" },
        { path: "/Medicine_delivery", label: "Medicine Delivery" },
        { path: "/home_lab_test", label: "Home Lab Test" }
      ]
    },
    { path: "/hiring", label: "Careers" },
    { path: "/contact", label: "Contact Us" }
  ];

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <img 
            src={logo} 
            alt="Ambuvians Logo" 
            className="navbar__logo-img"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar__desktop-nav">
          <ul className="navbar__nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="navbar__nav-item">
                <div className="navbar__nav-link-wrapper">
                  <Link 
                    to={item.path} 
                    className={`navbar__nav-link ${
                      location.pathname === item.path ? 'navbar__nav-link--active' : ''
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <FontAwesomeIcon icon={faChevronDown} className="navbar__dropdown-icon" />
                    )}
                  </Link>
                </div>
                {item.submenu && (
                  <div className="navbar__dropdown">
                    {item.submenu.map((subItem) => (
                      <Link 
                        key={subItem.path} 
                        to={subItem.path}
                        className="navbar__dropdown-item"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__right">
          {/* CTA Button */}
          <Link to="/login" className="navbar__cta">
            Login | Sign Up
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="navbar__menu-button"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} className="navbar__menu-icon" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-list">
          {navItems.map((item, index) => (
            <li key={item.path} className="navbar__mobile-item">
              <div className="navbar__mobile-link-wrapper">
                <Link 
                  to={item.path} 
                  className="navbar__mobile-link"
                  onClick={() => !item.submenu && setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <button 
                    className="navbar__mobile-dropdown-toggle"
                    onClick={() => toggleSubmenu(index)}
                    aria-expanded={openSubmenu === index}
                  >
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`navbar__mobile-dropdown-icon ${openSubmenu === index ? 'rotate-180' : ''}`} 
                    />
                  </button>
                )}
              </div>
              {item.submenu && (
                <div 
                  className={`navbar__mobile-submenu ${openSubmenu === index ? 'open' : ''}`}
                >
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className="navbar__mobile-submenu-item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        
        <div className="navbar__mobile-cta">
          <Link to="/contact" className="navbar__cta">
            Get in Touch
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
