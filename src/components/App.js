import React, { Component } from "react";
import styled from "styled-components";

import About from "./About";
import Statement from "./Statement";
import Education from "./Education";
import Experience from "./Experience";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: [],
    };
  }

  componentDidMount() {
    this.setState({
      sections: [<About />, <Statement />, <Education />, <Experience />],
    });
  }
  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className="wrapper">
        <header>
          <h1>Savvy CV</h1>
          <p>A CV building app</p>
        </header>

        <main>
          <ul>
            {this.state.sections.map((section, index) => (
              <li key={index}>{section}</li>
            ))}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
