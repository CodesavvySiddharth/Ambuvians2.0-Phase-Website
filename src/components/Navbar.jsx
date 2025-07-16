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
    let lastScrollY = window.scrollY;
    let ticking = false;
    const navbar = document.querySelector('.navbar');

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Don't hide navbar if mobile menu is open
      if (isMenuOpen) {
        navbar.classList.remove('navbar--hidden');
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show/hide navbar based on scroll direction
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            navbar.classList.add('navbar--hidden');
          } else {
            // Scrolling up or at top
            navbar.classList.remove('navbar--hidden');
          }

          // Update scrolled state for styling
          const scrolled = currentScrollY > 40;
          if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
      navbar.classList.remove('navbar--hidden');
    };
  }, [isScrolled, isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  }, [location]);

  const toggleMenu = () => {
    const newIsMenuOpen = !isMenuOpen;
    setIsMenuOpen(newIsMenuOpen);
    
    // Toggle body scroll and update body class
    if (newIsMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }
    
    // Close all submenus when closing the menu
    if (!newIsMenuOpen) {
      setOpenSubmenu(null);
    }
  };

  const toggleSubmenu = (index, e) => {
    e.stopPropagation();
    setOpenSubmenu(openSubmenu === index ? null : index);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.navbar__mobile') && !e.target.closest('.navbar__menu-button')) {
        toggleMenu();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = ''; // Reset body overflow on unmount
    };
  }, [isMenuOpen]);

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
            className={`navbar__menu-button ${isMenuOpen ? 'navbar__menu-button--active' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="navbar__menu-icon-wrapper">
              <FontAwesomeIcon
                icon={isMenuOpen ? faXmark : faBars}
                className="navbar__menu-icon"
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav 
        id="mobile-menu"
        className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="navbar__mobile-list">
          {navItems.map((item, index) => (
            <li key={item.path} className="navbar__mobile-item">
              {!item.submenu ? (
                <Link 
                  to={item.path} 
                  className={`navbar__mobile-link ${location.pathname === item.path ? 'navbar__mobile-link--active' : ''}`}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ) : (
                <div className="navbar__mobile-link-wrapper">
                  <Link 
                    to={item.path} 
                    className={`navbar__mobile-link ${location.pathname === item.path ? 'navbar__mobile-link--active' : ''}`}
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                  <button
                    className="navbar__mobile-dropdown-toggle"
                    onClick={(e) => toggleSubmenu(index, e)}
                    aria-expanded={openSubmenu === index}
                    aria-controls={`submenu-${index}`}
                    aria-haspopup="true"
                  >
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`navbar__mobile-dropdown-icon ${openSubmenu === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div 
                    id={`submenu-${index}`}
                    className={`navbar__mobile-submenu ${openSubmenu === index ? 'open' : ''}`}
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="navbar__mobile-submenu-item"
                        onClick={toggleMenu}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="navbar__mobile-cta">
          <a href="#contact" className="navbar__cta" onClick={toggleMenu}>
            Contact Us
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
