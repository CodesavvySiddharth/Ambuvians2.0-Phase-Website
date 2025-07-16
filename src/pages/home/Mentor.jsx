import "./Mentor.css";
import { mentorData } from "../../config.js";
import mail from "../../assets/images/mentor-gmail.svg";
import linkedin from "../../assets/images/mentor-linkedIn.svg";
import insta from "../../assets/images/mentor-instagram.svg";

const Mentor = () => {
  return (
    <section className="mentor" id="mentors">
      <h2 className="mentor-heading">Meet Our Expert Mentors</h2>
      <div className="mentor-container">
        <div className="mentor-cards">
          {mentorData.map((mentor) => (
            <article key={mentor.id} className="mentor-card">
              <img 
                src={mentor.profile} 
                alt={mentor.name} 
                className="mentor-img" 
                loading="lazy"
              />
              <h3 className="mentor-name">{mentor.name}</h3>
              <p className="mentor-place">{mentor.place}</p>
              <p className="mentor-para" title={mentor.para}>
                {mentor.para}
              </p>
              <div className="mentor-socials">
                <a 
                  href={mentor.links.mail} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mentor-link"
                  aria-label={`Email ${mentor.name}`}
                >
                  <img src={mail} alt="Email" className="mentor-links" />
                </a>
                <a 
                  href={mentor.links.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mentor-link"
                  aria-label={`${mentor.name}'s LinkedIn`}
                >
                  <img src={linkedin} alt="LinkedIn" className="mentor-links" />
                </a>
                <a 
                  href={mentor.links.insta} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mentor-link"
                  aria-label={`${mentor.name}'s Instagram`}
                >
                  <img src={insta} alt="Instagram" className="mentor-links" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentor;
