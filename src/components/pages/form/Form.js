import React, { Component } from "react";

import About from "./parts/About";
import Links from "./parts/Links";
import Skills from "./parts/Skills";
import Statement from "./parts/Statement";
import Education from "./parts/Education";
import Experience from "./parts/Experience";

const lockState = JSON.parse(localStorage.getItem("lockState"));

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,

      fieldsetLockState: lockState
        ? lockState
        : {
            about: false,
            links: false,
            skills: false,
            statement: false,
            education: false,
            experience: false,
          },

      cvData: this.props.cvData,
    };
  }

  componentDidMount() {
    this.props.setPageIndex(0);

    for (const [key, value] of Object.entries(this.state.fieldsetLockState)) {
      this.updateIcons(key, value);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    for (const [key, value] of Object.entries(this.state.fieldsetLockState)) {
      this.updateIcons(key, value);
    }

    if (this.state !== prevState) {
      localStorage.setItem(
        "lockState",
        JSON.stringify(this.state.fieldsetLockState)
      );
    }
  }

  updateIcons = (fieldset, lockState) => {
    const lockIcon = document.querySelector(`.state-${fieldset}`);
    const mask = document.querySelector(`.fieldset-mask_${fieldset}`);

    if (!lockState) {
      lockIcon.classList.remove("fa-lock");
      lockIcon.classList.add("fa-unlock");
      mask.classList.remove("toggle-fieldset-mask");
    }

    if (lockState) {
      lockIcon.classList.remove("fa-unlock");
      lockIcon.classList.add("fa-lock");
      mask.classList.add("toggle-fieldset-mask");
    }
  };

  updateLockState = (fieldset, lockState) => {
    const newFieldsetLockState = this.state.fieldsetLockState;
    newFieldsetLockState[fieldset] = lockState;

    this.setState({
      fieldsetLockState: newFieldsetLockState,
    });
  };

  render() {
    return (
      <form>
        <ul className="form-ul">
          <li>
            <div className="fieldset-mask fieldset-mask_about"></div>
            <About
              lockState={this.state.fieldsetLockState.about}
              updateLockState={this.updateLockState}
              input={this.props.cvData.about.content}
              cb={this.props.updateCV}
            />
          </li>
          <li>
            <div className="fieldset-mask fieldset-mask_links"></div>
            <Links
              lockState={this.state.fieldsetLockState.links}
              updateLockState={this.updateLockState}
              input={this.props.cvData.links.content}
              cb={this.props.updateCV}
            />
          </li>
          <li>
            <div className="fieldset-mask fieldset-mask_skills"></div>
            <Skills
              lockState={this.state.fieldsetLockState.skills}
              updateLockState={this.updateLockState}
              input={this.props.cvData.skills.content}
              cb={this.props.updateCV}
            />
          </li>
          <li>
            <div className="fieldset-mask fieldset-mask_statement"></div>
            <Statement
              lockState={this.state.fieldsetLockState.statement}
              updateLockState={this.updateLockState}
              input={this.props.cvData.statement.content}
              cb={this.props.updateCV}
            />
          </li>
          <li>
            <div className="fieldset-mask fieldset-mask_education"></div>
            <Education
              lockState={this.state.fieldsetLockState.education}
              updateLockState={this.updateLockState}
              input={this.props.cvData.education.content}
              cb={this.props.updateCV}
            />
          </li>
          <li>
            <div className="fieldset-mask fieldset-mask_experience"></div>
            <Experience
              lockState={this.state.fieldsetLockState.experience}
              updateLockState={this.updateLockState}
              input={this.props.cvData.experience.content}
              cb={this.props.updateCV}
            />
          </li>
        </ul>
      </form>
    );
  }
}

export default Form;
