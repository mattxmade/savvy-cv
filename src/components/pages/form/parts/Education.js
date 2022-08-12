import React, { Component } from "react";
import Input from "../inputs/Input";

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      start: "",
      end: "",
      quals: [],
      qualification: "",
      education: [],

      edit: { qual: false, edu: false },
      index: { qual: "", edu: "" },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const checkIcon = document.querySelector(".check-edu");

    checkIcon.style.color = "lightgrey";
    if (this.state.education.length > 0) checkIcon.style.color = "green";
  }

  validateInputs = () => {};

  addQualification = (qual) => this.state.quals.concat(qual);
  updateQualification = (qual) => {
    return this.state.quals.map((item, index) => {
      if (index === this.state.index.qual) item = qual;
      return item;
    });
  };

  submitQualification = (e) => {
    const qualification = this.state.qualification;
    const quals = this.state.quals;

    if (quals.includes(qualification) || qualification === "") return;

    const callback = this.state.edit.qual
      ? this.updateQualification
      : this.addQualification;

    this.setState({
      quals: callback(this.state.qualification),
      qualification: "",
      index: { qual: "", edu: this.state.index.edu },
      edit: { qual: false, edu: this.state.edit.edu },
    });
  };

  editQual = (qualification, index) => {
    this.setState({
      qualification,
      index: { qual: index, edu: this.state.index.edu },
      edit: { qual: true, edu: this.state.edit.edu },
    });
  };

  removeQual = (qualToRemove) => {
    this.setState({
      quals: this.state.quals.filter((qual) => qualToRemove !== qual),
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
    const { name, start, end, quals } = this.state;
    if (!name.length || !start.length || !end.length || !quals.length) return;

    const newSet = { name, date: { start, end }, quals };

    const actionCb = this.state.edit.edu
      ? this.updateEducation
      : this.addEducation;

    this.setState({
      education: actionCb(newSet),
      name: "",
      start: "",
      end: "",
      qualification: "",
      quals: [],
      index: { qual: "", edu: "" },
      edit: { qual: false, edu: false },
    });
  };

  editEducation = (item, index) => {
    this.setState({
      index: { qual: this.state.index.qual, edu: index },
      edit: { qual: false, edu: true },
      name: item.name,
      start: item.date.start,
      end: item.date.end,
      quals: item.quals,
    });
  };

  removeEducation = (itemToRemove, itemIndex) => {
    if (itemIndex === this.state.index.edu) {
      this.setState({
        name: "",
        start: "",
        end: "",
        qualification: "",
        quals: [],
        index: { qual: "", edu: "" },
        edit: { qual: false, edu: false },
      });
    }

    this.setState({
      education: this.state.education.filter((item) => itemToRemove !== item),
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="section-nav">
          <h2>Education</h2>
          <ul>
            <li>
              <i
                className="fas fa-plus-circle add-edu"
                onClick={this.processEducation}
              ></i>
            </li>
            <li>
              <i className="fas fa-check-circle check-edu"></i>
            </li>
            <li>
              <i className="far fa-trash-alt clear-edu"></i>
            </li>
          </ul>
        </div>

        <fieldset id="education">
          <legend></legend>
          <Input
            id="institution"
            type="text"
            value={this.state.name}
            placeholder={"Institution"}
            label={"Institution"}
            handleInput={(e) => this.setState({ name: e.target.value })}
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
              className="fas fa-plus-circle"
              onClick={(e) => this.submitQualification(e)}
            ></i>

            <ul className="quals-container">
              {this.state.quals.map((qualification, index) => (
                <li key={index} className="add-list-title">
                  <p onClick={() => this.editQual(qualification, index)}>
                    {qualification}
                  </p>
                  <i
                    className="fas fa-times-circle tag-icon"
                    onClick={() => this.removeQual(qualification)}
                  ></i>
                </li>
              ))}
            </ul>
          </div>
        </fieldset>

        <ul className="add-list">
          {this.state.education.map((item, index) => (
            <li key={index} className="add-list-title">
              <p onClick={() => this.editEducation(item, index)}>{item.name}</p>
              <i
                className="fas fa-times-circle tag-icon"
                onClick={() => this.removeEducation(item, index)}
              ></i>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Education;
