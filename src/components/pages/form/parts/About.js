import React, { Component } from "react";
import Input from "../inputs/Input";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      telephone: "",
      portfolio: "",
      valid: false,
    };
  }

  componentDidMount() {
    const { name, email, telephone, portfolio } = this.props.input;
    this.setState({ name, email, telephone, portfolio });

    this.processAbout();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.input !== this.props.input) {
      for (const [key, value] of Object.entries(this.props.input)) {
        if (prevProps.input[key] !== value) {
          this.setState({
            [key]: value,
          });
        }
      }
    }
  }

  processAbout = () => {
    setTimeout(() => {
      let count = 0;

      const validateEmail = document.querySelector("#email");
      if (validateEmail === null) return;

      const inputValues = [
        this.state.name,
        this.state.email,
        this.state.telephone,
        this.state.portfolio,
      ];

      inputValues.map((inputValue) => (inputValue.length ? count++ : count));

      this.setCheckIconStyle("green");

      if (count !== 4 || !validateEmail.checkValidity())
        this.setCheckIconStyle("lightgrey");

      if (count === 0) return;

      const { name, email, telephone, portfolio } = this.state;
      this.props.cb("about", { name, email, telephone, portfolio });
    }, 0);
  };

  setCheckIconStyle = (style) => {
    const checkIcon = document.querySelector(".check-about");
    const overviewCheck = document.querySelector(".aside-check-ab");

    [checkIcon, overviewCheck].map((icon) => (icon.style.color = style));
  };

  lockData = () => {
    this.props.updateLockState("about", !this.props.lockState);
  };

  clearFields = (e) => {
    this.props.cb("about", {
      name: "",
      email: "",
      telephone: "",
      portfolio: "",
    });
    this.setState({ name: "", email: "", telephone: "", portfolio: "" });

    this.processAbout();
  };

  render() {
    return (
      <React.Fragment>
        <div className="section-nav">
          <h2>About</h2>
          <ul>
            <li>
              <i
                className="fas fa-unlock state-about"
                onClick={this.lockData}
              />
            </li>

            <li>
              <i className="fas fa-check-circle check-about" />
            </li>
            <li>
              <i
                className="far fa-trash-alt clear-about"
                onClick={this.clearFields}
              />
            </li>
          </ul>
        </div>

        <fieldset id="about">
          <legend></legend>
          <Input
            id="name"
            type="text"
            placeholder={"Name"}
            label={"Name"}
            value={this.state.name}
            handleInput={(e) => {
              if (!this.props.lockState) {
                this.setState({ name: e.target.value.trim() });
                this.processAbout();
              }
            }}
          />

          <Input
            id="email"
            type="email"
            placeholder={"Email"}
            label={"Email"}
            value={this.state.email}
            handleInput={(e) => {
              if (!this.props.lockState) {
                this.setState({ email: e.target.value });
                this.processAbout();
              }
            }}
          />

          <Input
            id="portfolio"
            type="text"
            placeholder={"Portfolio"}
            label={"Portfolio"}
            value={this.state.portfolio}
            handleInput={(e) => {
              if (!this.props.lockState) {
                this.setState({ portfolio: e.target.value });
                this.processAbout();
              }
            }}
          />

          <Input
            id="telephone"
            type="tel"
            placeholder={"Telephone"}
            label={"Telephone"}
            value={this.state.telephone}
            handleInput={(e) => {
              if (!this.props.lockState) {
                this.setState(() => {
                  if (
                    Number.isInteger(+e.target.value) ||
                    e.target.value.length === 0
                  )
                    return { telephone: e.target.value };
                  e.target.value = "";
                });
                this.processAbout();
              }
            }}
          />
        </fieldset>
      </React.Fragment>
    );
  }
}

export default About;
