import React, { Component, Fragment } from "react";
import Input from "../inputs/Input";

const options = [
  "Discord",
  "Facebook",
  "GitHub",
  "Instagram",
  "LinkedIn",
  "Pinterest",
  "Snapchat",
  "TikTok",
  "Twitter",
  "Website",
  "WhatsApp",
  "YouTube",
];

class Links extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      type: "Website",
      link: {},
      links: [],

      edit: false,
      index: "",

      icon: "fa-plus-circle",
    };
  }

  componentDidMount() {
    this.setState({ links: this.props.input });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.setCheckIconStyle("lightgrey");
      if (this.state.links.length > 0) this.setCheckIconStyle("green");

      if (this.state.links !== prevState.links) {
        this.props.cb("links", this.state.links);
      }
    }

    if (prevProps.input !== this.props.input) {
      if (this.props.input.length === 0) {
        this.setState({
          url: "",
          type: "Website",
          link: {},
          links: this.props.input,
          edit: false,
          index: "",
          icon: "fa-plus-circle",
        });
      }
    }
  }

  setCheckIconStyle = (style) => {
    const checkIcon = document.querySelector(".check-links");
    const overviewCheck = document.querySelector(".aside-check-lk");

    [checkIcon, overviewCheck].map((icon) => (icon.style.color = style));
  };

  addLink = (link) => this.state.links.concat(link);
  updateLink = (link) => {
    return this.state.links.map((item, index) => {
      if (index === this.state.index) item = link;
      return item;
    });
  };

  submitLink = () => {
    const url = this.state.url;
    if (url === "") return;

    const type = this.state.type;
    const linkset = { type, url };

    const callback = this.state.edit ? this.updateLink : this.addLink;

    this.setState({
      links: callback(linkset),
      url: "",
      type: "Website",
      link: {},
      index: "",
      edit: false,
      icon: "fa-plus-circle",
    });
  };

  editLink = (link, index) => {
    this.setState({
      link,
      url: link.url,
      type: link.type,
      index,
      edit: true,
      icon: "fa-pause-circle",
    });
  };

  removeLink = (linkToRemove, linkIndex) => {
    const { links, index, edit } = this.state;

    if (linkIndex === this.state.index.link) {
      this.setState({
        link: {},
        url: "",
        type: "Website",
        icon: "fa-plus-circle",
        index: "",
        edit: false,
      });
    }

    this.setState({
      links: links.filter((link) => linkToRemove !== link),
    });
  };

  clearFields = (e) => {
    this.setState({
      url: "",
      type: "Website",
      link: {},
      links: [],
      edit: false,
      index: "",
      icon: "fa-plus-circle",
    });
  };

  setDropdownIcon = () => {
    if (this.state.type === "Website") return <i className={`fas fa-globe`} />;
    return <i className={`fab fa-${this.state.type.toLowerCase()}`} />;
  };

  resetSelect = (type, index) => {
    const stateArray = "links";

    if (this.state[stateArray].length > 1) {
      const elements = document.querySelectorAll(`.${type}-para`);

      elements.forEach((element) => {
        element.style.backgroundColor = "rgb(0 0 0 / 0.5)";
      });

      if (Number(index) && index !== this.state.index) {
        if (this.state.index !== "")
          elements[this.state.index].style.backgroundColor = "black";
      }
    }

    if (this.state[stateArray].length === 1) {
      const element = document.querySelector(`.${type}-para`);
      element.style.backgroundColor = "rgb(0 0 0 / 0.5)";
    }
  };

  setSelect = (element) => {
    element.style.backgroundColor = "black";
  };

  lockData = (e) => {
    this.props.updateLockState("links", !this.props.lockState);
  };

  render() {
    return (
      <Fragment>
        <div className="section-nav">
          <h2>Links</h2>
          <ul>
            <li>
              <i
                aria-hidden="true"
                className="fas fa-unlock state-links"
                onClick={this.lockData}
              ></i>
            </li>
            <li>
              <i
                aria-hidden="true"
                className="fas fa-check-circle check-links"
              ></i>
            </li>
            <li>
              <i
                aria-hidden="true"
                className="far fa-trash-alt clear-links"
                onClick={this.clearFields}
              ></i>
            </li>
          </ul>
        </div>

        <fieldset id="linkset">
          <legend></legend>

          <div className="links">
            <div className="link-inputs">
              <Input
                id="link"
                type="text"
                value={this.state.url}
                placeholder={"Link name or description"}
                label={"URL"}
                handleInput={(e) => this.setState({ url: e.target.value })}
              />

              <label className="dropdown">
                <span>{this.setDropdownIcon()}</span>
                <select
                  name="links"
                  id="link-type"
                  value={this.state.type}
                  onChange={(e) => this.setState({ type: e.target.value })}
                >
                  {options.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <i
              aria-hidden="true"
              className={`fas ${this.state.icon}`}
              onClick={(e) => {
                this.submitLink();
                this.resetSelect("link", "null");
              }}
            ></i>

            <ul className="links-container">
              {this.state.links.map((link, index) => {
                return (
                  <li key={index} className="add-list-title">
                    <p
                      className="link-para"
                      onClick={(e) => {
                        this.editLink(link, index);
                        this.resetSelect("link", "null");
                        this.setSelect(e.target);
                      }}
                    >
                      {link.type}
                    </p>
                    <i
                      aria-hidden="true"
                      className="fas fa-times-circle tag-icon"
                      onClick={(e) => {
                        this.resetSelect("link", index);
                        this.removeLink(link, index);
                      }}
                    ></i>
                  </li>
                );
              })}
            </ul>
          </div>
        </fieldset>
      </Fragment>
    );
  }
}

export default Links;
