import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <nav>
        <div className="logo">
          <h1>CV Savvy</h1>
          <p>A CV building app</p>
        </div>

        <ul>
          <li>
            <i className="far fa-save"></i>
          </li>
          <li>
            <i className="far fa-edit"></i>
          </li>
          <li>
            <i className="far fa-trash-alt"></i>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
