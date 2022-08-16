import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { nanoid } from "nanoid";

const about = (content) => (
  <ul className="format-ab">
    <li>
      <p>{content.first + " " + content.last}</p>
    </li>
    <li>
      <p>{content.email}</p>
      <p>{content.telephone}</p>
    </li>
  </ul>
);

const validIcon = (type) => {
  switch (type) {
    case "twitter":
      return <i className="fab fa-twitter-square"></i>;
    case "instagram":
      return <i className="fab fa-instagram-square"></i>;
    case "github":
      return <i className="fab fa-github-square"></i>;
    default:
      return <i className="fas fa-globe"></i>;
  }
};

const links = (content) => (
  <ul className="format-lk">
    {content.map((link, index) => {
      const icon = validIcon(link.type);
      return (
        <li key={index}>
          <p>{icon ? icon : link.type + " "}</p>
          <span>{link.handle}</span>
        </li>
      );
    })}
  </ul>
);

const skills = (content) => (
  <ul className="format-sk">
    {content.map((skill, index) => (
      <li key={index}>
        <p>{skill}</p>
      </li>
    ))}
  </ul>
);

const statement = (content) => <p className="format-st">{content}</p>;

const education = (content) => (
  <ul className="format-ed-list">
    {content.map((knowledge, index) => {
      return (
        <li className="format-ed-item" key={index}>
          <ul className="format-ql-list">
            {knowledge.quals.map((qual, index) => (
              <li className="format-ql-item" key={index}>
                <p>{qual}</p>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              <h4>{knowledge.institute}</h4>
            </li>
            <li className="format-ed-date">
              <p>{knowledge.date.start}</p>
              <p>{knowledge.date.end}</p>
            </li>
          </ul>
        </li>
      );
    })}
  </ul>
);

const experience = (content) => (
  <ul className="format-xp-list">
    {content.map((xperience, index) => (
      <li className="format-xp-item" key={index}>
        <h4>{xperience.job.title}</h4>

        <ul className="format-xp-job">
          <li>
            <p>{xperience.employer}</p>
          </li>
          <li>
            <p>{xperience.job.description}</p>
          </li>
        </ul>

        <ul className="format-xp-date">
          <li>
            <p>{xperience.date.start}</p>
          </li>
          <li>
            <p>{xperience.date.end}</p>
          </li>
        </ul>
      </li>
    ))}
  </ul>
);

class Editor extends Component {
  constructor(props) {
    super(props);

    const cvComponents = Array.from(this.props.cvComponents);
    console.log(cvComponents);
    console.log(this.props.cvComponents);

    this.state = { cvComponents };
  }

  formatLayout = (component) => {
    switch (component.section) {
      case "about":
        return about(component.content);
      case "links":
        return links(component.content);
      case "skills":
        return skills(component.content);
      case "statement":
        return statement(component.content);
      case "education":
        return education(component.content);
      case "experience":
        return experience(component.content);
    }
  };

  handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const componentsArray = this.state.cvComponents;
    const newOrder = Array.from(componentsArray);

    const [reorderdItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, reorderdItem);

    const mapToArray = componentsArray.map(
      (item, index) => (item = newOrder[index])
    );

    this.setState({ cvComponents: mapToArray });
    this.props.updateCvIndex(mapToArray);
  };

  render() {
    if (this.props.page !== 2) return;

    return (
      <div>
        <h2>CV Format Editor</h2>
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
          <Droppable droppableId="editor-sections">
            {(provided) => (
              <ul
                className="editor-sections"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.state.cvComponents.map((component, index) => {
                  return (
                    <Draggable
                      key={component.id}
                      draggableId={component.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          id={"format-" + component.section}
                          className="format-section"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h3
                            className={
                              "format-" + component.section + "_heading"
                            }
                          >
                            {component.section}
                          </h3>
                          {this.formatLayout(component)}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default Editor;
