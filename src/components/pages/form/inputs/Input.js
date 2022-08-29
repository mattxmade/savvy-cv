import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, type, value, placeholder, label } = this.props;

    return (
      <React.Fragment>
        <label className="id" htmlFor={id}>
          <span>{label}</span>
          <input
            id={id}
            type={type}
            value={value}
            required={true}
            placeholder={placeholder}
            onChange={(e) => {
              e.preventDefault();
              this.props.handleInput(e);
            }}
          />
        </label>
      </React.Fragment>
    );
  }
}

export default Input;
