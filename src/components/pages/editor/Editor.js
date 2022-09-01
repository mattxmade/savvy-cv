import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Segment from "./Segment";

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 1,
      pdfComponents: this.props.cvComponents,
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
        return Segment.About(component.content);
      case "links":
        return Segment.Links(component.content);
      case "skills":
        return Segment.Skills(component.content);
      case "statement":
        return Segment.Statement(component.content);
      case "education":
        return Segment.Education(component.content);
      case "experience":
        return Segment.Experience(component.content);
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
    this.setState({ pdfComponents: mapToArray });
  };

  render() {
    return (
      <div className="editor">
        <h2>
          <i className="fas fa-align-left"></i> CV Layout Editor
        </h2>
        <span className="instructions">
          drag and drop sections to change layout
        </span>
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
          <Droppable droppableId="editor-sections">
            {(provided) => (
              <ul
                className="editor-sections"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.props.cvComponents.map((component, index) => {
                  if (!this.checkContent(component)) return null;

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
