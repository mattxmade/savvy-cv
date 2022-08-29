import React, { Component, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { nanoid } from "nanoid";
import isTouchDevice from "./utility/isTouchDevice";

import Nav from "./Nav";
import Aside from "./Aside";
import Form from "./pages/form/Form";
import Editor from "./pages/editor/Editor";
import Viewer from "./pages/pdf/Viewer";

const about = {
  id: nanoid(),
  section: "about",
  content: {
    name: "James Kirk",
    email: "captain@enterprise",
    telephone: "07733115789",
    portfolio: "www.startrek.com",
  },
};

const links = {
  id: nanoid(),
  section: "links",
  content: [
    { type: "Twitter", url: "www.twitter.com/StarTrek" },
    { type: "Instagram", url: "www.instagram.com/StarTrek" },
    { type: "YouTube", url: "www.youtube.com/user/startrek" },
    { type: "Facebook", url: "www.facebook.com/StarTrek" },
  ],
};

const skills = {
  id: nanoid(),
  section: "skills",
  content: ["diplomacy", "leadership", "combat", "tactical"],
};

const statement = {
  id: nanoid(),
  section: "statement",
  content:
    "My goal is to be the best captain to my crew and with many years of experience, I am ready for the next mission into outer space - to boldly go where no one has gone before.",
};

const education = {
  id: nanoid(),
  section: "education",
  content: [
    {
      institute: "Starfleet Academy",
      date: { start: "2024-08-15", end: "2030-08-19" },
      quals: [
        "2.1 BA Space Studies",
        "MA Intergalatic Peacekeeping",
        "PHD New Worlds",
      ],
    },
    {
      institute: "Starfleet Academy",
      date: { start: "2024-08-15", end: "2030-08-19" },
      quals: [
        "2.1 BA Space Studies",
        "MA Intergalatic Peacekeeping",
        "PHD New Worlds",
      ],
    },
    {
      institute: "Starfleet Academy",
      date: { start: "2024-08-15", end: "2030-08-19" },
      quals: [
        "2.1 BA Space Studies",
        "MA Intergalatic Peacekeeping",
        "PHD New Worlds",
      ],
    },
    {
      institute: "Starfleet Academy",
      date: { start: "2024-08-15", end: "2030-08-19" },
      quals: [
        "2.1 BA Space Studies",
        "MA Intergalatic Peacekeeping",
        "PHD New Worlds",
      ],
    },
    {
      institute: "Starfleet Academy",
      date: { start: "2024-08-15", end: "2030-08-19" },
      quals: [
        "2.1 BA Space Studies",
        "MA Intergalatic Peacekeeping",
        "PHD New Worlds",
      ],
    },
  ],
};

const experience = {
  id: nanoid(),
  section: "experience",
  content: [
    {
      employer: "Starfleet",
      date: { start: "2030-08-15", end: "2045-08-19" },
      job: {
        title: "Captain",
        description:
          "Captain to the SS Enterprise, explored strange new worlds and brokered peace across the cosmos.",
      },
    },
  ],
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      pages: [],
      sections: [],
      cvComponents: [],
      pdfReady: null,
      touch: isTouchDevice() ? true : false,

      cv: {
        about: about,
        links: links,
        skills: skills,
        statement: statement,
        education: education,
        experience: experience,
      },
    };
  }

  componentDidMount() {
    const { about, links, skills, statement, education, experience } =
      this.state.cv;

    this.setState({
      cvComponents: this.state.cvComponents.concat(
        about,
        links,
        skills,
        statement,
        education,
        experience
      ),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      this.setMaxWidth();
    }
  }

  setMaxWidth = () => {
    const setMainMaxWidth = document.querySelector("main");
    setMainMaxWidth.style.maxWidth = "2000px";

    if (this.state.index === 2) setMainMaxWidth.style.maxWidth = "100vw";
  };

  navToPage = (index) => this.setState({ index });

  // Form Data
  updateCV = (sectionName, newContent) => {
    const updateData = this.state.cv;
    updateData[sectionName].content = newContent;

    this.setState({
      cv: updateData,
      cvComponents: this.state.cvComponents.map((component) => {
        if (component.section === sectionName) {
          component.content = newContent;
        }
        return component;
      }),
    });
  };

  clearForm = () => {
    const blankForm = this.state.cv;

    for (const fieldset of Object.values(blankForm)) {
      if (Array.isArray(fieldset.content)) fieldset.content = [];
      else if (typeof fieldset.content === "string") fieldset.content = "";
      else
        fieldset.content = {
          name: "",
          email: "",
          telephone: "",
          portfolio: "",
        };
    }

    const { about, links, skills, statement, education, experience } =
      blankForm;

    this.setState({
      cv: { about, links, skills, statement, education, experience },
    });
  };

  // Editor
  updateCvIndex = (array) => this.setState({ cvComponents: array });

  render() {
    return (
      <div className="elements-container">
        <React.StrictMode>
          <Nav
            touch={this.state.touch}
            navToPage={this.navToPage}
            clear={this.clearForm}
          />
        </React.StrictMode>

        <div className="wrapper">
          <Aside page={this.state.index} />

          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <React.StrictMode>
                    <Form
                      cvData={this.state.cv}
                      updateCV={this.updateCV}
                      setPageIndex={(index) => this.setState({ index })}
                    />
                  </React.StrictMode>
                }
              />
              <Route
                path="editor"
                element={
                  <Editor
                    cvComponents={this.state.cvComponents}
                    updateCvIndex={this.updateCvIndex}
                    setPageIndex={(index) => this.setState({ index })}
                  />
                }
              />
              <Route
                path="viewer"
                element={
                  <React.StrictMode>
                    <Viewer
                      touch={this.state.touch}
                      cvComponents={this.state.cvComponents}
                      setPageIndex={(index) => this.setState({ index })}
                    />
                  </React.StrictMode>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
