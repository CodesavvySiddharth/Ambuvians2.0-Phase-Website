import { useState, useEffect, useRef } from 'react';
import "./Statistics.css";
import { FaAmbulance, FaUserMd, FaProcedures, FaFileMedical, FaHospital } from 'react-icons/fa';

const StatCard = ({ icon, end, title, delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const startValue = 0;
    const endValue = parseInt(end.replace(/\D/g, '')); // Remove non-numeric characters
    
    const animate = () => {
      const currentTime = Date.now();
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease-out function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };
    
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isVisible, end, delay]);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="stat-card" ref={cardRef}>
      <div className="stat-icon">{icon}</div>
      <h3 className="stat-number">{formatNumber(count)}+</h3>
      <p className="stat-title">{title}</p>
    </div>
  );
};

const Statistics = () => {
  const statsData = [
    {
      icon: <FaAmbulance className="icon" />,
      count: "46,328",
      title: "Ambulances",
      delay: 100
    },
    {
      icon: <FaUserMd className="icon" />,
      count: "46,328",
      title: "Health Professionals",
      delay: 200
    },
    {
      icon: <FaProcedures className="icon" />,
      count: "100,000",
      title: "Patients Served",
      delay: 300
    },
    {
      icon: <FaFileMedical className="icon" />,
      count: "5,000",
      title: "Health Policies",
      delay: 400
    },
    {
      icon: <FaHospital className="icon" />,
      count: "46,328",
      title: "Hospital Tie-ups",
      delay: 500
    }
  ];

  return (
    <section className="statistics-section">
      <div className="container">
        
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              end={stat.count}
              title={stat.title}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
