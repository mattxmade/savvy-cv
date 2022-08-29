import React from "react";

const Aside = (props) => {
  if (props.page !== 0) return;

  return (
    <aside>
      <div className="strikethrough"></div>
      <ul className="tabs">
        <li className="tab">
          <p>About</p>
          <i className="fas fa-check-circle aside-check-ab">
            <div className="icon-bg"></div>
          </i>
        </li>
        <li className="tab">
          <p>Statement</p>
          <i className="fas fa-check-circle aside-check-ps">
            <div className="icon-bg"></div>
          </i>
        </li>
        <li className="tab">
          <p>Links</p>
          <i className="fas fa-check-circle aside-check-lk">
            <div className="icon-bg"></div>
          </i>
        </li>
        <li className="tab">
          <p>Skills</p>
          <i className="fas fa-check-circle aside-check-sk">
            <div className="icon-bg"></div>
          </i>
        </li>
        <li className="tab">
          <p>Education</p>
          <i className="fas fa-check-circle aside-check-ed">
            <div className="icon-bg"></div>
          </i>
        </li>
        <li className="tab">
          <p>Experience</p>
          <i className="fas fa-check-circle aside-check-xp">
            <div className="icon-bg"></div>
          </i>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
