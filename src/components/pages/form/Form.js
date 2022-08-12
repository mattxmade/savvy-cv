import React, { Component } from "react";

import About from "./parts/About";
import Statement from "./parts/Statement";
import Education from "./parts/Education";
import Experience from "./parts/Experience";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: [],

      form: {
        statement: "",
        skills: [],
        education: [],
        experience: [],
        about: { first: "", last: "", email: "", telephone: "" },
      },
    };
  }

  componentDidMount() {
    this.setState({
      sections: [
        <About input={this.state.form.about} />,
        <Statement input={this.state.form.statement} />,
        <Education input={this.state.education} />,
        <Experience input={this.state.experience} />,
      ],
    });
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <form>
        <ul className="form-ul">
          {this.state.sections.map((section, index) => (
            <li key={index}>{section}</li>
          ))}
        </ul>
      </form>
    );
  }
}

export default Form;
