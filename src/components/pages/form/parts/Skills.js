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
          edit: false,
          index: "",
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
      if (index === this.state.index) item = skill;
      return item;
    });
  };

  submitSkill = () => {
    if (this.state.skill === "") return;

    const callback = this.state.edit ? this.updateSkill : this.addSkill;

    this.setState({
      skills: callback(this.state.skill),
      skill: "",
      index: "",
      edit: false,
      icon: "fa-plus-circle",
    });

    this.props.cb("skills", this.state.skills);
  };

  editSkill = (skill, index) => {
    this.setState({
      skill,
      index,
      edit: true,
      icon: "fa-pause-circle",
    });
  };

  removeSkill = (skillToRemove, skillIndex) => {
    const { skills, index } = this.state;

    if (skillIndex === index) {
      this.setState({
        skill: "",
        icon: "fa-plus-circle",
        index: "",
        edit: false,
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
      edit: false,
      index: "",
      icon: "fa-plus-circle",
    });

    this.props.cb("skills", this.state.skills);
  };

  resetSelect = (type, index) => {
    const stateArray = "skills";

    if (this.state[stateArray].length > 1) {
      const elements = document.querySelectorAll(`.${type}-para`);

      elements.forEach((element) => {
        element.style.backgroundColor = "rgb(0 0 0 / 0.5)";
      });

      if (Number(index) && index !== this.state.index) {
        if (this.state.index !== "")
          elements[this.state.index].style.backgroundColor = "black";
      }
    }

    if (this.state[stateArray].length === 1) {
      const element = document.querySelector(`.${type}-para`);
      element.style.backgroundColor = "rgb(0 0 0 / 0.5)";
    }
  };

  setSelect = (element) => {
    element.style.backgroundColor = "black";
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
              onClick={(e) => {
                this.submitSkill();
                this.resetSelect("skill", "null");
              }}
            ></i>

            <ul className="skills-container">
              {this.state.skills.map((skill, index) => (
                <li key={index} className="add-list-title">
                  <p
                    className="skill-para"
                    onClick={(e) => {
                      this.editSkill(skill, index);
                      this.resetSelect("skill", "null");
                      this.setSelect(e.target);
                    }}
                  >
                    {skill}
                  </p>
                  <i
                    aria-hidden="true"
                    className="fas fa-times-circle tag-icon"
                    onClick={(e) => {
                      this.resetSelect("skill", index);
                      this.removeSkill(skill, index);
                    }}
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
