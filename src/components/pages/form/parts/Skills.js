import React, { Component, Fragment } from "react";
import Input from "../inputs/Input";

class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      skill: "",
      skills: [],

      edit: { skill: false, links: false },
      index: { skill: "", links: "" },

      icon: "fa-plus-circle",
    };
  }

  componentDidMount() {
    this.setState({ skills: this.props.input });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.setCheckIconStyle("lightgrey");
      if (this.state.skills.length > 0) this.setCheckIconStyle("green");

      if (this.state.skills !== prevState.skills) {
        this.props.cb("skills", this.state.skills);
      }
    }

    if (prevProps.input !== this.props.input) {
      if (this.props.input.length === 0) {
        this.setState({
          title: "",
          skill: "",
          skills: this.props.input,
          edit: { skill: false, skills: false },
          index: { skill: "", skills: "" },
          icon: "fa-plus-circle",
        });
      }
    }
  }

  setCheckIconStyle = (style) => {
    const checkIcon = document.querySelector(".check-skills");
    const overviewCheck = document.querySelector(".aside-check-sk");

    [checkIcon, overviewCheck].map((icon) => (icon.style.color = style));
  };

  addSkill = (skill) => this.state.skills.concat(skill);
  updateSkill = (skill) => {
    return this.state.skills.map((item, index) => {
      if (index === this.state.index.skill) item = skill;
      return item;
    });
  };

  submitSkill = () => {
    if (this.state.skill === "") return;

    const callback = this.state.edit.skill ? this.updateSkill : this.addSkill;

    this.setState({
      skills: callback(this.state.skill),
      skill: "",
      index: { skill: "", links: this.state.index.links },
      edit: { skill: false, links: this.state.edit.links },
      icon: "fa-plus-circle",
    });

    this.props.cb("skills", this.state.skills);
  };

  editSkill = (skill, index) => {
    this.setState({
      skill,
      index: { skill: index, links: this.state.index.links },
      edit: { skill: true, links: this.state.edit.links },
      icon: "fa-pause-circle",
    });
  };

  removeSkill = (skillToRemove, skillIndex) => {
    const { skills, index, edit } = this.state;

    if (skillIndex === index) {
      this.setState({
        skill: "",
        icon: "fa-plus-circle",
        index: { skill: "", links: index.links },
        edit: { skill: false, links: edit.links },
      });
    }

    this.setState({
      skills: skills.filter((skill) => skillToRemove !== skill),
    });
  };

  clearFields = (e) => {
    this.setState({
      title: "",
      skill: "",
      skills: [],
      edit: { skill: false, skills: false },
      index: { skill: "", skills: "" },
      icon: "fa-plus-circle",
    });

    this.props.cb("skills", this.state.skills);
  };

  lockData = (e) => {
    this.props.updateLockState("skills", !this.props.lockState);
  };

  render() {
    return (
      <Fragment>
        <div className="section-nav">
          <h2>Skills</h2>
          <ul>
            <li>
              <i
                aria-hidden="true"
                className="fas fa-unlock state-skills"
                onClick={this.lockData}
              ></i>
            </li>
            <li>
              <i
                aria-hidden="true"
                className="fas fa-check-circle check-skills"
              ></i>
            </li>
            <li>
              <i
                aria-hidden="true"
                className="far fa-trash-alt clear-skills"
                onClick={this.clearFields}
              ></i>
            </li>
          </ul>
        </div>

        <fieldset id="skills">
          <legend></legend>
          <div className="skills">
            <Input
              id="skill"
              type="text"
              value={this.state.skill}
              placeholder={"Skill name or description"}
              label={"Skill"}
              handleInput={(e) => {
                this.setState({ skill: e.target.value });
              }}
            />

            <i
              aria-hidden="true"
              className={`fas ${this.state.icon}`}
              onClick={() => this.submitSkill()}
            ></i>

            <ul className="skills-container">
              {this.state.skills.map((skill, index) => (
                <li key={index} className="add-list-title">
                  <p onClick={() => this.editSkill(skill, index)}>{skill}</p>
                  <i
                    aria-hidden="true"
                    className="fas fa-times-circle tag-icon"
                    onClick={() => this.removeSkill(skill, index)}
                  ></i>
                </li>
              ))}
            </ul>
          </div>
        </fieldset>
      </Fragment>
    );
  }
}

export default Skills;
