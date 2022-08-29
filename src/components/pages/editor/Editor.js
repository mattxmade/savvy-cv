import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const About = (content) => (
  <ul className="format-ab">
    {content.name ? (
      <li>
        <p>{content.name}</p>
      </li>
    ) : (
      <p />
    )}

    <li>
      {content.email ? (
        <p>
          <span>
            <i className="fas fa-at"></i>
          </span>
          {content.email}
        </p>
      ) : (
        ""
      )}

      {content.telephone ? (
        <p>
          <span style={{ left: 4 }}>
            <i className="fas fa-mobile-alt"></i>
          </span>
          {content.telephone}
        </p>
      ) : (
        ""
      )}

      {content.portfolio ? (
        <p style={{ marginTop: 25 }}>
          <span style={{ left: 3 }}>
            <i className="fas fa-portrait"></i>
          </span>
          {content.portfolio}
        </p>
      ) : (
        ""
      )}
    </li>
  </ul>
);

const validIcon = (type) => {
  switch (type) {
    case "Twitter":
      return <i aria-hidden="true" className="fab fa-twitter-square"></i>;
    case "Instagram":
      return <i aria-hidden="true" className="fab fa-instagram-square"></i>;
    case "GitHub":
      return <i aria-hidden="true" className="fab fa-github-square"></i>;
    default:
      return <i aria-hidden="true" className="fas fa-globe"></i>;
  }
};

const Links = (content) => (
  <ul className="format-lk">
    {content.map((link, index) => {
      const icon = validIcon(link.type);
      return (
        <li key={index}>
          <p>{icon ? icon : link.type + " "}</p>
          <span>{link.url}</span>
        </li>
      );
    })}
  </ul>
);

const Skills = (content) => (
  <ul className="format-sk">
    {content.map((skill, index) => (
      <li key={index}>
        <p>{skill}</p>
      </li>
    ))}
  </ul>
);

const Statement = (content) => <p className="format-st">{content}</p>;

const Education = (content) => (
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
              <h3>{knowledge.institute}</h3>
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

const Experience = (content) => (
  <ul className="format-xp-list">
    {content.map((xperience, index) => (
      <li className="format-xp-item" key={index}>
        <ul className="format-xp-job">
          <li className="job-title-li-cont">
            <h3>{xperience.job.title}</h3>
          </li>
          <li>
            <p>{xperience.job.description}</p>
          </li>
        </ul>

        <ul>
          <li>
            <h3>{xperience.employer}</h3>
          </li>
          <li className="format-xp-date">
            <p>{xperience.date.start}</p>
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

    this.state = {
      index: 1,
    };
  }

  componentDidMount() {
    this.props.setPageIndex(1);
  }

  checkContent = (component) => {
    switch (component.section) {
      case "about":
        let tally = 0;

        for (const value of Object.values(component.content)) {
          if (!value.length) tally++;
        }

        return tally !== 4 ? true : false;

      default:
        return component.content.length ? true : false;
    }
  };

  formatLayout = (component) => {
    switch (component.section) {
      case "about":
        return About(component.content);
      case "links":
        return Links(component.content);
      case "skills":
        return Skills(component.content);
      case "statement":
        return Statement(component.content);
      case "education":
        return Education(component.content);
      case "experience":
        return Experience(component.content);
    }
  };

  handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const componentsArray = this.props.cvComponents;
    const newOrder = Array.from(componentsArray);

    const [reorderdItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, reorderdItem);

    const mapToArray = componentsArray.map(
      (item, index) => (item = newOrder[index])
    );

    this.props.updateCvIndex(mapToArray);
  };

  render() {
    return (
      <div className="editor">
        <h2>CV Format Editor</h2>
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
          <Droppable droppableId="editor-sections">
            {(provided) => (
              <ul
                className="editor-sections"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.props.cvComponents.map((component, index) => {
                  if (!this.checkContent(component)) return;

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
