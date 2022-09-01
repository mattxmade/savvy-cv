import React, { Component } from "react";
import Input from "../inputs/Input";

class Experience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employer: "",
      start: "",
      end: "",
      title: "",
      description: "",
      experience: [],

      edit: false,
      index: "",

      icon: "fa-plus-circle",
    };
  }

  componentDidMount() {
    this.setState({ experience: this.props.input });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.input !== this.props.input) {
      if (this.props.input.length === 0) {
        this.setState({
          employer: "",
          start: "",
          end: "",
          title: "",
          description: "",
          experience: this.props.input,
          edit: false,
          index: "",
        });
      }
    }

    if (prevState !== this.state) {
      this.setCheckIconStyle("lightgrey");
      if (this.state.experience.length > 0) this.setCheckIconStyle("green");

      if (prevState.experience !== this.state.experience) {
        this.props.cb("experience", this.state.experience);
      }
    }
  }

  setCheckIconStyle = (style) => {
    const checkIcon = document.querySelector(".check-experience");
    const overviewCheck = document.querySelector(".aside-check-xp");

    [checkIcon, overviewCheck].map((icon) => (icon.style.color = style));
  };

  addExperience = (set) => this.state.experience.concat(set);

  updateExperience = (set) => {
    return this.state.experience.map((item, index) => {
      if (index === this.state.index) item = set;
      return item;
    });
  };

  processExperience = (e) => {
    const { employer, start, end, title, description } = this.state;

    if (
      !employer.length ||
      !start.length ||
      !end.length ||
      !title ||
      !description
    )
      return;

    const experience = {
      employer,
      date: { start, end },
      job: { title, description },
    };

    const actionCb = this.state.edit
      ? this.updateExperience
      : this.addExperience;

    this.setState({
      experience: actionCb(experience),
      employer: "",
      start: "",
      end: "",
      title: "",
      description: "",
      job: {},
      jobs: [],
      index: "",
      edit: false,
      icon: "fa-plus-circle",
    });
  };

  editExperience = (history, index) => {
    this.setState({
      index,
      edit: true,
      employer: history.employer,
      start: history.date.start,
      end: history.date.end,
      title: history.job.title,
      description: history.job.description,
      icon: "fa-pause-circle",
    });
  };

  removeExperience = (jobToRemove, itemIndex) => {
    if (itemIndex === this.state.index) {
      this.setState({
        employer: "",
        start: "",
        end: "",
        title: "",
        description: "",
        index: "",
        edit: false,
        icon: "fa-plus-circle",
      });
    }

    this.setState({
      experience: this.state.experience.filter((item) => jobToRemove !== item),
    });
  };

  clearFields = (e) => {
    this.setState({
      employer: "",
      start: "",
      end: "",
      title: "",
      description: "",
      experience: [],

      index: "",
      edit: false,
      icon: "fa-plus-circle",
    });
  };

  lockData = (e) => {
    this.props.updateLockState("experience", !this.props.lockState);
  };

  resetSelect = (type, index) => {
    const stateArray = "experience";

    if (this.state[stateArray].length > 1) {
      const elements = document.querySelectorAll(`.${type}-para`);

      elements.forEach(
        (element) => (element.style.backgroundColor = "rgb(0 0 0 / 0.5)")
      );

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

  render() {
    return (
      <React.Fragment>
        <div className="section-nav">
          <h2>Experience</h2>
          <ul>
            <li>
              <i
                className="fas fa-unlock state-experience"
                onClick={this.lockData}
              ></i>
            </li>
            <li>
              <i
                className="fas fa-plus-circle add-experience"
                onClick={() => {
                  this.processExperience();
                  this.resetSelect("exp", "null");
                }}
              ></i>
            </li>
            <li>
              <i className="fas fa-check-circle check-experience"></i>
            </li>
            <li>
              <i
                className="far fa-trash-alt clear-experience"
                onClick={this.clearFields}
              ></i>
            </li>
          </ul>
        </div>

        <fieldset id="experience">
          <legend></legend>
          <Input
            id="employer"
            type="text"
            value={this.state.employer}
            placeholder={"Company Name"}
            label={"Company"}
            handleInput={(e) => this.setState({ employer: e.target.value })}
          />

          <div className="study-dates">
            <Input
              id="work-date-start"
              className="study-date"
              type="date"
              value={this.state.start}
              label={"Start"}
              placeholder={"Start"}
              handleInput={(e) => this.setState({ start: e.target.value })}
            />
            <Input
              id="work-date-end"
              className="study-date"
              type="date"
              value={this.state.end}
              label={"End"}
              placeholder={"End"}
              handleInput={(e) => this.setState({ end: e.target.value })}
            />
          </div>

          <div className="jobs">
            <div className="job-inputs">
              <Input
                id="job-title"
                type="text"
                value={this.state.title}
                placeholder={"Job Title"}
                label={"Title"}
                handleInput={(e) => this.setState({ title: e.target.value })}
              />

              <label htmlFor="job-description">
                <span>Description</span>
                <textarea
                  id="job-description"
                  name="job-description"
                  value={this.state.description}
                  placeholder="Job description"
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </label>
            </div>
          </div>
        </fieldset>

        <ul className="add-list">
          {this.state.experience.map((job, index) => (
            <li key={index} className="add-list-title">
              <p
                className="exp-para"
                onClick={(e) => {
                  this.editExperience(job, index);
                  this.resetSelect("exp", "null");
                  this.setSelect(e.target);
                }}
              >
                {job.employer}
              </p>
              <i
                className="fas fa-times-circle tag-icon"
                onClick={(e) => {
                  this.resetSelect("exp", index);
                  this.removeExperience(job, index);
                }}
              ></i>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Experience;
