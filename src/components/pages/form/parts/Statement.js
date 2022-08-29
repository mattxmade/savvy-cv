import React, { Component } from "react";

class Statement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statement: "",
    };
  }

  componentDidMount() {
    this.setState({ statement: this.props.input });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      const checkIcon = document.querySelector(".check-statement");
      const overviewCheck = document.querySelector(".aside-check-ps");

      [checkIcon, overviewCheck].map((icon) => {
        icon.style.color = "lightgrey";

        if (this.state.statement.length > 0) {
          icon.style.color = "green";
        }
      });
    }

    if (prevProps.input !== this.props.input) {
      this.setState({ statement: this.props.input });
    }
  }

  lockData = (e) => {
    this.props.updateLockState("statement", !this.props.lockState);
  };

  clearFields = (e) => this.props.cb("statement", "");

  render() {
    return (
      <React.Fragment>
        <div className="section-nav">
          <h2>Statement</h2>
          <ul>
            <li>
              <i
                className="fas fa-unlock state-statement"
                onClick={this.lockData}
              ></i>
            </li>
            <li>
              <i className="fas fa-check-circle check-statement"></i>
            </li>
            <li>
              <i
                className="far fa-trash-alt clear-statement"
                onClick={this.clearFields}
              ></i>
            </li>
          </ul>
        </div>

        <fieldset id="statement">
          <textarea
            name="statement"
            value={this.state.statement}
            placeholder="Your personal statement"
            onChange={(e) => {
              if (!this.props.lockState)
                this.props.cb("statement", e.target.value);
            }}
          />
        </fieldset>
      </React.Fragment>
    );
  }
}

export default Statement;
