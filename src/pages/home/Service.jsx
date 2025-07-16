import { Link } from 'react-router-dom';
import "./Service.css";
import { FaAmbulance, FaPills, FaFlask, FaCloud } from 'react-icons/fa';

const Service = () => {
  const services = [
    {
      icon: <FaAmbulance className="service-icon" />,
      title: "Customized Ambulances",
      description: "24/7 emergency medical transportation with advanced life support"
    },
    {
      icon: <FaPills className="service-icon" />,
      title: "On-Demand Medicine Delivery",
      description: "Fast and reliable delivery of prescribed medications to your doorstep"
    },
    {
      icon: <FaFlask className="service-icon" />,
      title: "Home Lab Tests",
      description: "Comprehensive diagnostic tests conducted in the comfort of your home"
    },
    {
      icon: <FaCloud className="service-icon" />,
      title: "Ambuvians Cloud",
      description: "Secure digital health records accessible anytime, anywhere"
    }
  ];

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-title animate-fade-in">
          <span className="subtitle">Our Services</span>
          <h2>Comprehensive Healthcare Solutions</h2>
          <p className="lead">Delivering exceptional medical services with care and compassion</p>
        </div>

        <div className="services-container">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to="/services" className="service-link">
                Learn more <span>→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="service-feature">
          <div className="feature-content">
            <span className="subtitle">Why Choose Us</span>
            <h2>Your Wellness, Our Priority</h2>
            <p className="lead">
              We're revolutionizing healthcare with innovative solutions that put you first. 
              Our integrated platform connects you with medical professionals, emergency 
              services, and health resources—all in one place.
            </p>
            <div className="feature-highlights">
              <div className="highlight">
                <div className="highlight-icon">✓</div>
                <span>24/7 Emergency Response</span>
              </div>
              <div className="highlight">
                <div className="highlight-icon">✓</div>
                <span>Certified Medical Professionals</span>
              </div>
              <div className="highlight">
                <div className="highlight-icon">✓</div>
                <span>Advanced Medical Equipment</span>
              </div>
              <div className="highlight">
                <div className="highlight-icon">✓</div>
                <span>Patient-Centric Care</span>
              </div>
            </div>
            <Link to="/about" className="btn btn-outline">Discover More</Link>
          </div>
          <div className="feature-image">
            <div className="image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Healthcare professionals" 
                className="img-fluid"
              />
              <div className="experience-badge">
                <span className="years">10+</span>
                <span className="text">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
