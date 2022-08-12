import React, { Component } from "react";

import Nav from "./Nav";
import Aside from "./Aside";
import Form from "./pages/form/Form";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: [],
      cv: {
        about: {},
        skills: [],
        statement: "",
        education: [],
        experience: [],
      },
    };
  }

  render() {
    return (
      <div className="wrapper">
        <Nav />
        <Aside />

        <main>
          <Form />
        </main>
      </div>
    );
  }
}

export default App;
