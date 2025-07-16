import { useState, useEffect } from 'react';
import "./Experience.css";
import experienceImg from "../../assets/images/experience.svg";
import { FaCheck } from 'react-icons/fa';
import { FaArrowRight, FaGooglePlay, FaApple } from 'react-icons/fa';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.experience');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const featuresLeft = [
    "24/7 patient support",
    "Customized and Reliable Ambulance Service",
    "Book medicines on one tap"
  ];

  const featuresRight = [
    "Track your daily dosage",
    "Emergency assistance time of 15 minutes or less",
    "Get one tap analysis of your medicines, prescriptions"
  ];

  return (
    <section className={`experience ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Our Features</span>
          <h2 className="section-title">What makes us <span className="highlight">Different</span></h2>
          <p className="section-lead">Experience the all-in-one portal for all your healthcare needs</p>
        </div>

        <div className="experience-content">
          <div className="features-container">
            <div className="features-column">
              {featuresLeft.map((feature, index) => (
                <div key={`left-${index}`} className="feature-card">
                  <div className="feature-icon">
                    <FaCheck className="check-icon" />
                  </div>
                  <p className="feature-text">{feature}</p>
                </div>
              ))}
              <button className="btn btn-primary">
                Explore More <FaArrowRight className="btn-icon" />
              </button>
            </div>

            <div className="experience-image">
              <img 
                src={experienceImg} 
                alt="Healthcare Experience" 
                className="main-image"
                loading="lazy"
              />
            </div>

            <div className="features-column">
              {featuresRight.map((feature, index) => (
                <div key={`right-${index}`} className="feature-card">
                  <div className="feature-icon">
                    <FaCheck className="check-icon" />
                  </div>
                  <p className="feature-text">{feature}</p>
                </div>
              ))}
              <button className="btn btn-secondary">
                <FaGooglePlay className="store-icon" />
                <div className="download-text">
                  <span>Download on</span>
                  <span>Google Play</span>
                </div>
              </button>
              <button className="btn btn-secondary mt-2">
                <FaApple className="store-icon" />
                <div className="download-text">
                  <span>Download on the</span>
                  <span>App Store</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
