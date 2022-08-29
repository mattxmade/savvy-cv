import React, { Component } from "react";
import { Link } from "react-router-dom";

const FormIcon = (props) => (
  <li>
    <i
      aria-hidden="true"
      className="far fa-edit"
      onClick={() => props.navToPage(0)}
    ></i>
  </li>
);

const LayoutIcon = (props) => (
  <li>
    <i
      aria-hidden="true"
      className="far fa-save"
      onClick={() => props.navToPage(1)}
    ></i>
  </li>
);

const PdfIcon = (props) => (
  <li>
    <i
      aria-hidden="true"
      className="far fa-file-pdf"
      onClick={() => props.navToPage(2)}
    ></i>
  </li>
);

const ClearIcon = (props) => (
  <li>
    <i
      aria-hidden="true"
      className="far fa-trash-alt"
      onClick={() => props.clear()}
    ></i>
  </li>
);

const linkStyle = {
  color: "black",
};

const StandardNav = (props) => (
  <ul>
    <Link style={linkStyle} to="/">
      <FormIcon navToPage={props.navToPage} />
    </Link>
    <Link style={linkStyle} to="/editor">
      <LayoutIcon navToPage={props.navToPage} />
    </Link>
    <Link style={linkStyle} to="/viewer">
      <PdfIcon navToPage={props.navToPage} />
    </Link>
    <ClearIcon clear={props.clear} />
  </ul>
);

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
        <div className="logo">
          <h1>CV Savvy</h1>
          <p>A CV building app</p>
        </div>
        <StandardNav
          navToPage={this.props.navToPage}
          clear={this.props.clear}
        />
      </nav>
    );
  }
}

export default Nav;
