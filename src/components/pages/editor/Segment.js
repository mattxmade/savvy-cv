import React from "react";

const Segment = (() => {
  const About = (content) => (
    <ul className="format-ab">
      {content.name ? (
        <li>
          <p>{content.name}</p>
        </li>
      ) : (
        <p />
      )}

      <li>
        {content.email ? (
          <p>
            <span>
              <i className="fas fa-at"></i>
            </span>
            {content.email}
          </p>
        ) : (
          ""
        )}

        {content.telephone ? (
          <p>
            <span style={{ left: 4 }}>
              <i className="fas fa-mobile-alt"></i>
            </span>
            {content.telephone}
          </p>
        ) : (
          ""
        )}

        {content.portfolio ? (
          <p style={{ marginTop: 25 }}>
            <span style={{ left: 3 }}>
              <i className="fas fa-portrait"></i>
            </span>
            {content.portfolio}
          </p>
        ) : (
          ""
        )}
      </li>
    </ul>
  );

  const validIcon = (type) => {
    switch (type) {
      case "Discord":
        return <i aria-hidden="true" className="fab fa-discord-square"></i>;
      case "Facebook":
        return <i aria-hidden="true" className="fab fa-facebook-square"></i>;
      case "GitHub":
        return <i aria-hidden="true" className="fab fa-github-square"></i>;
      case "Instagram":
        return <i aria-hidden="true" className="fab fa-instagram-square"></i>;
      case "LinkedIn":
        return <i aria-hidden="true" className="fab fa-linkedin-square"></i>;
      case "Pinterest":
        return <i aria-hidden="true" className="fab fa-pinterest-square"></i>;
      case "Snapchat":
        return <i aria-hidden="true" className="fab fa-snapchat-square"></i>;
      case "TikTok":
        return <i aria-hidden="true" className="fab fa-tiktok-square"></i>;
      case "Twitter":
        return <i aria-hidden="true" className="fab fa-twitter"></i>;
      case "WhatsApp":
        return <i aria-hidden="true" className="fab fa-whatsapp-square"></i>;
      case "YouTube":
        return <i aria-hidden="true" className="fab fa-youtube-square"></i>;

      default:
        return <i aria-hidden="true" className="fas fa-globe"></i>;
    }
  };

  const Links = (content) => (
    <ul className="format-lk">
      {content.map((link, index) => {
        const icon = validIcon(link.type);
        return (
          <li key={index}>
            <p>{icon ? icon : link.type + " "}</p>
            <span>{link.url}</span>
          </li>
        );
      })}
    </ul>
  );

  const Skills = (content) => (
    <ul className="format-sk">
      {content.map((skill, index) => (
        <li key={index}>
          <p>{skill}</p>
        </li>
      ))}
    </ul>
  );

  const Statement = (content) => <p className="format-st">{content}</p>;

  const Education = (content) => (
    <ul className="format-ed-list">
      {content.map((knowledge, index) => {
        return (
          <li className="format-ed-item" key={index}>
            <ul className="format-ql-list">
              {knowledge.quals.map((qual, index) => (
                <li className="format-ql-item" key={index}>
                  <p>{qual}</p>
                </li>
              ))}
            </ul>

            <ul>
              <li>
                <h3>{knowledge.institute}</h3>
              </li>
              <li className="format-ed-date">
                <p>{knowledge.date.start}</p>
                <p>{knowledge.date.end}</p>
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );

  const Experience = (content) => (
    <ul className="format-xp-list">
      {content.map((xperience, index) => (
        <li className="format-xp-item" key={index}>
          <ul className="format-xp-job">
            <li className="job-title-li-cont">
              <h3>{xperience.job.title}</h3>
            </li>
            <li>
              <p>{xperience.job.description}</p>
            </li>
          </ul>

          <ul>
            <li>
              <h3>{xperience.employer}</h3>
            </li>
            <li className="format-xp-date">
              <p>{xperience.date.start}</p>
              <p>{xperience.date.end}</p>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );

  return { About, Links, Skills, Statement, Education, Experience };
})();

export default Segment;
