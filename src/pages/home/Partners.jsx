import "./Partners.css";
import teific from "../../assets/images/teific.webp";
import kiet from "../../assets/images/kiet.webp";
import club from "../../assets/images/club.webp";
import school from "../../assets/images/school.webp";

const Partners = () => {
  const partners = [
    { id: 1, logo: teific, alt: "TEIFIC" },
    { id: 2, logo: kiet, alt: "KIET Group of Institutions" },
    { id: 3, logo: club, alt: "Tech Club" },
    { id: 4, logo: school, alt: "School of Engineering" },
  ];

  return (
    <section className="partners" id="partners">
      <h2 className="partners-heading">Our Valued Partners</h2>
      <div className="partners-container">
        <div className="partners-logos">
          {partners.map((partner) => (
            <img
              key={partner.id}
              src={partner.logo}
              alt={partner.alt}
              className="partners-logo"
              loading="lazy"
              onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
