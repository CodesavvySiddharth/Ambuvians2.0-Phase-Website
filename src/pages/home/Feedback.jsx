import "./Feedback.css";
import { feedbackData } from "../../config.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Feedback = () => {
  return (
    <section className="feedback">
      <h2 className="feedback-heading">What Our Clients Say</h2>
      <div className="feedback-cards-container">
        <div className="feedback-cards">
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="feedback-card">
              <img 
                src={feedback.profile} 
                alt={feedback.name} 
                className="feedback-imgs" 
                loading="lazy"
              />
              <p className="feedback-para">{feedback.para}</p>
              <div className="feedback-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    style={{ 
                      color: i < feedback.stars ? "#ffc107" : "#e0e0e0",
                      fontSize: "1.1rem"
                    }}
                  />
                ))}
              </div>
              <h3 className="feedback-name">{feedback.name}</h3>
              <p className="feedback-text">{feedback.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
