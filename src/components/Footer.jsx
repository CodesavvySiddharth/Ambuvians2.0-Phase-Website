import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Footer.css";

// Icons
import playStoreIcon from "../assets/images/play-store.svg";
import appStoreIcon from "../assets/images/apple.svg";
import instagramIcon from "../assets/images/insta.svg";
import whatsappIcon from "../assets/images/whatsapp.svg";
import twitterIcon from "../assets/images/x.svg";
import linkedinIcon from "../assets/images/linkedin.svg";
import locationIcon from "../assets/images/Location.webp";
import emailIcon from "../assets/images/Gmail.svg";
import phoneIcon from "../assets/images/call.svg";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Set initial state
    toggleVisibility();

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Clean up
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Newsletter form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

  // Handle newsletter form submission
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    // Basic email validation
    if (!email) {
      setSubmitStatus({
        success: false,
        message: 'Please enter your email address'
      });
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitStatus({
        success: false,
        message: 'Please enter a valid email address'
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });
    
    try {
      // Simulate API call (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the email to your backend
      console.log('Subscribing email:', email);
      
      setSubmitStatus({
        success: true,
        message: 'Thank you for subscribing to our newsletter!'
      });
      
      // Reset form after successful submission
      form.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ success: false, message: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Subscription failed:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to subscribe. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/official.ambuvians/",
      icon: instagramIcon,
      className: "footer__social-link--instagram"
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/+7505853812",
      icon: whatsappIcon,
      className: "footer__social-link--whatsapp"
    },
    {
      name: "Twitter",
      url: "https://www.threads.net/@official.ambuvians",
      icon: twitterIcon,
      className: "footer__social-link--twitter"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/ambuvians-healthcare-pvt-ltd/",
      icon: linkedinIcon,
      className: "footer__social-link--linkedin"
    }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
    { name: "Enquiry", path: "/enquiry" }
  ];

  const services = [
    { name: "Categorized Ambulance", path: "/services/categorized-ambulance" },
    { name: "Medicine Delivery", path: "/services/medicine-delivery" },
    { name: "Ambuvian Cloud", path: "/services/ambuvian-cloud" },
    { name: "Home Lab Tests", path: "/services/home-lab-tests" }
  ];

  const contactInfo = [
    {
      icon: locationIcon,
      text: "4th Floor TBI KIET Group Of Institutions, Ghaziabad Delhi NCR 201206",
      type: "address"
    },
    {
      icon: emailIcon,
      text: "contact@ambuvians.in",
      type: "email"
    },
    {
      icon: emailIcon,
      text: "info@ambuvians.in",
      type: "email"
    },
    {
      icon: phoneIcon,
      text: "+91 75058 53812",
      type: "tel"
    },
    {
      icon: phoneIcon,
      text: "+91 86307 29931",
      type: "tel"
    }
  ];

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__container">
          <div className="footer__grid">
            {/* Quick Links */}
            <div className="footer__links-section">
              <h3 className="footer__links-title">Quick Links</h3>
              <ul className="footer__links-list">
                {quickLinks.map((link) => (
                  <li key={link.path} className="footer__links-item">
                    <Link 
                      to={link.path} 
                      className="footer__link"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Our Services */}
            <div className="footer__links-section">
              <h3 className="footer__links-title">Our Services</h3>
              <ul className="footer__links-list">
                {services.map((service) => (
                  <li key={service.path} className="footer__links-item">
                    <Link to={service.path} className="footer__link">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Get the App */}
            <div className="footer__links-section">
              <h3 className="footer__links-title">Get the App</h3>
              <div className="footer__app-buttons">
                <a 
                  href="#" 
                  className="footer__app-button"
                  aria-label="Download from Google Play"
                >
                  <img 
                    src={playStoreIcon} 
                    alt="" 
                    className="footer__app-icon" 
                    loading="lazy"
                  />
                  <div className="footer__app-info">
                    <span className="footer__app-availability">Get It On</span>
                    <span className="footer__app-store">Google Play</span>
                  </div>
                </a>
                
                <a 
                  href="#" 
                  className="footer__app-button"
                  aria-label="Download from App Store"
                  style={{ marginTop: '10px' }}
                >
                  <img 
                    src={appStoreIcon} 
                    alt="" 
                    className="footer__app-icon" 
                    loading="lazy"
                  />
                  <div className="footer__app-info">
                    <span className="footer__app-availability">Download on the</span>
                    <span className="footer__app-store">App Store</span>
                  </div>
                </a>
              </div>
              
              <div className="footer__social" style={{ marginTop: '1.5rem' }}>
                <h3 className="footer__section-title">Follow Us</h3>
                <div className="footer__social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`footer__social-link ${social.className}`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <img 
                        src={social.icon} 
                        alt={social.name} 
                        className="footer__social-icon"
                        loading="lazy"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Us */}
            <div className="footer__links-section">
              <h3 className="footer__links-title">Contact Us</h3>
              <ul className="footer__contact-info">
                {contactInfo.map((contact, index) => (
                  <li key={index} className="footer__contact-item">
                    <div className="footer__contact-icon">
                      <img 
                        src={contact.icon} 
                        alt="" 
                        loading="lazy"
                      />
                    </div>
                    {contact.type === 'email' ? (
                      <a 
                        href={`mailto:${contact.text}`}
                        className="footer__contact-link"
                      >
                        {contact.text}
                      </a>
                    ) : contact.type === 'tel' ? (
                      <a 
                        href={`tel:${contact.text.replace(/\D/g, '')}`}
                        className="footer__contact-link"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="footer__contact-text">
                        {contact.text}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="footer__tagline">
            India's First Unified Health Care Services
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="footer__newsletter-outer">
        <div className="footer__newsletter">
          <div className="footer__newsletter-content">
            <div className="footer__newsletter-text">
              <h3 className="footer__newsletter-title">Subscribe to our Newsletter</h3>
              <p className="footer__newsletter-description">Get the latest updates, news and product offers</p>
            </div>
            
            <form 
              className="footer__newsletter-form"
              onSubmit={handleNewsletterSubmit}
              noValidate
            >
              <div className="footer__newsletter-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="footer__newsletter-input"
                  aria-label="Email address for newsletter subscription"
                  aria-invalid={submitStatus.message && !submitStatus.success}
                  disabled={isSubmitting}
                  required
                />
                <button 
                  type="submit" 
                  className={`footer__newsletter-button ${isSubmitting ? 'footer__newsletter-button--loading' : ''}`}
                  aria-label="Subscribe to newsletter"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="footer__button-loader"></span>
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              
              {submitStatus.message && (
                <div 
                  className={`footer__newsletter-status ${submitStatus.success ? 'footer__newsletter-status--success' : 'footer__newsletter-status--error'}`}
                  role="status"
                  aria-live="polite"
                >
                  {submitStatus.message}
                </div>
              )}
              
              <p className="footer__newsletter-hint">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <div className="footer__container">
          <div className="footer__copyright">
            &copy; {currentYear} Ambuvians Healthcare. All rights reserved.
          </div>
          <div className="footer__legal-links">
            <Link to="/privacy-policy" className="footer__legal-link">
              Privacy Policy
            </Link>
            <span className="footer__separator">|</span>
            <Link to="/terms" className="footer__legal-link">
              Terms of Service
            </Link>
            <span className="footer__separator">|</span>
            <Link to="/cookies" className="footer__legal-link">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
      
      <button 
        className={`footer__back-to-top ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
      
      <a 
        href="https://wa.me/+917505853812" 
        className="footer__whatsapp-float"
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <img 
          src={whatsappIcon} 
          alt="WhatsApp" 
          className="footer__whatsapp-icon"
          loading="lazy"
        />
      </a>
      
      <a 
        href="https://heyzine.com/flip-book/c538e2deab.html#page/1" 
        className="footer__brochure"
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Download our brochure"
      >
        Download Brochure
      </a>
    </footer>
  );
}

export default Footer;
