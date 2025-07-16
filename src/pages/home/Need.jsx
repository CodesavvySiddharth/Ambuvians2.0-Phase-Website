import { useState, useEffect } from 'react';
import "./Need.css";
import need1 from "../../assets/images/need1.webp";
import need2 from "../../assets/images/need2.webp";
import need3 from "../../assets/images/need3.webp";
import need4 from "../../assets/images/need4.webp";
import { FaHeartbeat, FaAmbulance, FaHospital, FaUserMd } from 'react-icons/fa';

const Need = () => {
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

    const element = document.querySelector('.need-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const features = [
    {
      icon: <FaHeartbeat className="feature-icon" />,
      title: "24/7 Emergency Support",
      description: "Immediate medical assistance whenever you need it, day or night."
    },
    {
      icon: <FaAmbulance className="feature-icon" />,
      title: "Rapid Response",
      description: "Fastest emergency response times with our advanced tracking system."
    },
    {
      icon: <FaHospital className="feature-icon" />,
      title: "Network of Hospitals",
      description: "Access to the best healthcare facilities and specialists."
    },
    {
      icon: <FaUserMd className="feature-icon" />,
      title: "Expert Medical Team",
      description: "Qualified healthcare professionals at your service."
    }
  ];

  return (
    <section className={`need-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Our Mission</span>
          <h2 className="section-title">Why We Need <span className="highlight">Ambuvians</span></h2>
          <p className="section-lead">Transforming healthcare accessibility through innovation and technology</p>
        </div>

        <div className="need-content">
          <div className="need-grid">
            <div className="need-text">
              <div className="mission-card">
                <h3>Ambuvians is on a mission to address these problems</h3>
                <p>
                  Ambuvians is dedicated to solving critical healthcare challenges,
                  making quality medical solutions accessible to everyone. We simplify
                  the complex healthcare system to ensure no one is left behind.
                </p>
                <div className="features-grid">
                  {features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <div className="feature-icon-container">
                        {feature.icon}
                      </div>
                      <div>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="need-gallery">
              <div className="gallery-row">
                <div className="gallery-item">
                  <img src={need1} alt="Healthcare Professional" loading="lazy" className="gallery-img" />
                  <div className="gallery-overlay">
                    <span>Emergency Response</span>
                  </div>
                </div>
                <div className="gallery-item">
                  <img src={need2} alt="Medical Team" loading="lazy" className="gallery-img" />
                  <div className="gallery-overlay">
                    <span>Expert Team</span>
                  </div>
                </div>
              </div>
              <div className="gallery-row">
                <div className="gallery-item">
                  <img src={need3} alt="Ambulance Service" loading="lazy" className="gallery-img" />
                  <div className="gallery-overlay">
                    <span>Ambulance Service</span>
                  </div>
                </div>
                <div className="gallery-item">
                  <img src={need4} alt="Healthcare Access" loading="lazy" className="gallery-img" />
                  <div className="gallery-overlay">
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Need;
