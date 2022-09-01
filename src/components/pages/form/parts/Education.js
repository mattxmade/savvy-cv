import { element } from "prop-types";
import React, { Component } from "react";
import Input from "../inputs/Input";

class Education extends Component {
  constructor(props) {
    super(props);

    this.state = {
      institute: "",
      start: "",
      end: "",
      quals: [],
      qualification: "",
      education: [],

      edit: { qual: false, edu: false },
      index: { qual: "", edu: "" },

      icon: { section: "fa-plus-circle", subsection: "fa-plus-circle" },
    };
  }

  componentDidMount() {
    this.setState({ education: this.props.input });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.setCheckIconStyle("lightgrey");
      if (this.state.education.length > 0) this.setCheckIconStyle("green");

      if (this.state.education !== prevState.education) {
        this.props.cb("education", this.state.education);
      }
    }

    if (prevProps.input !== this.props.input) {
      if (this.props.input.length === 0) {
        this.setState({
          institute: "",
          start: "",
          end: "",
          quals: [],
          qualification: "",
          education: this.props.input,
          edit: { qual: false, edu: false },
          index: { qual: "", edu: "" },
        });
      }
    }
  }

  setCheckIconStyle = (style) => {
    const checkIcon = document.querySelector(".check-education");
    const overviewCheck = document.querySelector(".aside-check-ed");

    [checkIcon, overviewCheck].map((icon) => (icon.style.color = style));
  };

  addQualification = (qual) => this.state.quals.concat(qual);
  updateQualification = (qual) => {
    return this.state.quals.map((item, index) => {
      if (index === this.state.index.qual) item = qual;
      return item;
    });
  };

  submitQualification = () => {
    const qualification = this.state.qualification;
    const quals = this.state.quals;

    if (qualification === "") return;

    // if same index and already added?
    //if (quals.includes(qualification) || qualification === "") return;

    const callback = this.state.edit.qual
      ? this.updateQualification
      : this.addQualification;

    this.setState({
      quals: callback(this.state.qualification),
      qualification: "",
      index: { qual: "", edu: this.state.index.edu },
      edit: { qual: false, edu: this.state.edit.edu },
      icon: {
        section: this.state.icon.section,
        subsection: "fa-plus-circle",
      },
    });
  };

  editQual = (qualification, index) => {
    this.setState({
      qualification,
      index: { qual: index, edu: this.state.index.edu },
      edit: { qual: true, edu: this.state.edit.edu },
      icon: {
        section: this.state.icon.section,
        subsection: "fa-pause-circle",
      },
    });
  };

  removeQual = (qualToRemove, qualIndex) => {
    const { quals, index, edit, icon } = this.state;

    if (qualIndex === this.state.index.qual) {
      this.setState({
        qualification: "",
        index: { qual: "", edu: index.edu },
        edit: { qual: false, edu: edit.edu },
        icon: {
          section: icon.section,
          subsection: "fa-plus-circle",
        },
      });
    }

    this.setState({
      quals: quals.filter((qual) => qualToRemove !== qual),
    });
  };

  addEducation = (set) => this.state.education.concat(set);

  updateEducation = (set) => {
    return this.state.education.map((item, index) => {
      if (index === this.state.index.edu) item = set;
      return item;
    });
  };

  processEducation = (e) => {
    const { institute, start, end, quals } = this.state;
    if (!institute.length || !start.length || !end.length || !quals.length)
      return;

    const newSet = { institute, date: { start, end }, quals };

    const actionCb = this.state.edit.edu
      ? this.updateEducation
      : this.addEducation;

    this.setState({
      education: actionCb(newSet),
      institute: "",
      start: "",
      end: "",
      qualification: "",
      quals: [],
      index: { qual: "", edu: "" },
      edit: { qual: false, edu: false },
      icon: {
        section: "fa-plus-circle",
        subsection: "fa-plus-circle",
      },
    });
  };

  editEducation = (item, index) => {
    this.setState({
      index: { qual: "", edu: index },
      edit: { qual: false, edu: true },
      institute: item.institute,
      start: item.date.start,
      end: item.date.end,
      quals: item.quals,
      icon: {
        section: "fa-pause-circle",
        subsection: "fa-plus-circle",
      },
    });
  };

  removeEducation = (itemToRemove, itemIndex) => {
    if (itemIndex === this.state.index.edu) {
      this.setState({
        institute: "",
        start: "",
        end: "",
        qualification: "",
        quals: [],
        index: { qual: "", edu: "" },
        edit: { qual: false, edu: false },
        icon: {
          section: "fa-plus-circle",
          subsection: "fa-plus-circle",
        },
      });
    }

    this.setState({
      education: this.state.education.filter((item) => itemToRemove !== item),
    });
  };

  clearFields = (e) => {
    this.setState({
      institute: "",
      start: "",
      end: "",
      quals: [],
      qualification: "",
      education: [],

      index: { qual: "", edu: "" },
      edit: { qual: false, edu: false },

      icon: {
        section: "fa-plus-circle",
        subsection: "fa-plus-circle",
      },
    });
  };

  resetQualHightlight = () => {
    const elements = Array.from(document.querySelectorAll(".qual-para"));
    elements.map(
      (element) => (element.style.backgroundColor = "rgb(0 0 0 / 0.5)")
    );
  };

  setQualHighlight = (element) => {
    element.style.backgroundColor = "black";
  };

  resetEducHighlight = () => {
    const elements = Array.from(document.querySelectorAll(".edu-para"));
    elements.map((element) => {
      element.style.backgroundColor = "rgb(0 0 0 / 0.5)";
    });
  };

  setEducHighlight = (element) => {
    element.style.backgroundColor = "black";
  };

  lockData = (e) => {
    this.props.updateLockState("education", !this.props.lockState);
  };

  render() {
    return (
      <React.Fragment>
        <div className="section-nav">
          <h2>Education</h2>
          <ul>
            <li>
              <i
                className="fas fa-unlock state-education"
                onClick={this.lockData}
              ></i>
            </li>
            <li>
              <i
                className={`fas ${this.state.icon.section} add-education`}
                onClick={() => {
                  this.processEducation();
                  this.resetEducHighlight();
                }}
              ></i>
            </li>
            <li>
              <i className="fas fa-check-circle check-education"></i>
            </li>
            <li>
              <i
                className="far fa-trash-alt clear-education"
                onClick={this.clearFields}
              ></i>
            </li>
          </ul>
        </div>

        <fieldset id="education">
          <legend></legend>
          <Input
            id="institution"
            type="text"
            value={this.state.institute}
            placeholder={"Institution"}
            label={"Institution"}
            handleInput={(e) => this.setState({ institute: e.target.value })}
          />

          <div className="study-dates">
            <Input
              id="study-date-start"
              className="study-date"
              type="date"
              value={this.state.start}
              label={"Start"}
              placeholder={"Start"}
              handleInput={(e) => this.setState({ start: e.target.value })}
            />
            <Input
              id="study-date-end"
              className="study-date"
              value={this.state.end}
              type="date"
              label={"End"}
              placeholder={"End"}
              handleInput={(e) => this.setState({ end: e.target.value })}
            />
          </div>

          <div className="qualifications">
            <Input
              id="qualification"
              type="text"
              value={this.state.qualification}
              placeholder={"Qualification"}
              label={"Qualifications"}
              handleInput={(e) =>
                this.setState({ qualification: e.target.value })
              }
            />

            <i
              className={`fas ${this.state.icon.subsection}`}
              onClick={() => {
                this.submitQualification();
                this.resetQualHightlight();
              }}
            ></i>

            <ul className="quals-container">
              {this.state.quals.map((qualification, index) => (
                <li key={index} className="add-list-title">
                  <p
                    className="qual-para"
                    onClick={(e) => {
                      this.resetQualHightlight();
                      this.setQualHighlight(e.target);
                      this.editQual(qualification, index);
                    }}
                  >
                    {qualification}
                  </p>
                  <i
                    className="fas fa-times-circle tag-icon"
                    onClick={(e) => {
                      this.resetQualHightlight();
                      this.removeQual(qualification, index);
                    }}
                  ></i>
                </li>
              ))}
            </ul>
          </div>
        </fieldset>

        <ul className="add-list">
          {this.state.education.map((item, index) => (
            <li key={index} className="add-list-title">
              <p
                id={item.id}
                className="edu-para"
                onClick={(e) => {
                  this.resetEducHighlight();
                  this.setEducHighlight(e.target);
                  this.editEducation(item, index);
                }}
              >
                {item.institute}
              </p>
              <i
                className="fas fa-times-circle tag-icon"
                onClick={(e) => {
                  this.resetEducHighlight();
                  this.removeEducation(item, index);
                }}
              ></i>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Education;
