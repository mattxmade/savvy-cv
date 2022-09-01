import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Font,
  Text,
  View,
  Link,
} from "@react-pdf/renderer";

import React, { Component } from "react";
import { format } from "date-fns";

import SVGs from "../icons/SVGs";
import Styles from "./Styles";
import Content from "./Content";

import RajdhaniLight from "../../../fonts/Rajdhani/Rajdhani-Light.ttf";
import RajdhanMedium from "../../../fonts/Rajdhani/Rajdhani-Medium.ttf";

Font.register({
  family: "Rajdhani",
  fonts: [
    { src: RajdhaniLight },
    { src: RajdhanMedium, fontStyle: "normal", fontWeight: 500 },
  ],
});

const PDFIconStyle = {
  top: 0,
  fontSize: 18,
  display: "grid",
  placeContent: "center",
  right: 0,
  marginRight: 90,
  position: "absolute",
  zIndex: 100,
  color: "white",
  height: 32,
};

const messageStyle = {
  top: 5.5,
  width: 130,
  right: 120,
  color: "white",
  fontWeight: "bold",
  textAlign: "right",
  position: "absolute",
  textDecoration: "none",
};

export default class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: "CV Savyy",
      title: "CV | " + format(Date.now(), "MMMM Y"),
      pdfName: `CV_${format(Date.now(), "YMMdd")}.pdf`,
    };
  }

  componentDidMount() {
    this.props.setPageIndex(2);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.page !== this.props.page) {
      const name = this.props.cvComponents[0].content.name;
      const author = name !== "" ? name : "CV Savvy";

      this.setState({ author });
    }
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

  setWrap = (sectioName) => {
    switch (sectioName) {
      case "about":
        return false;
      case "links":
        return false;
      case "skills":
        return false;
      case "statement":
        return false;
      default:
        return true;
    }
  };

  PDFDocument = () => (
    <Document
      producer={"CV Savvy"}
      title={this.state.title}
      author={this.state.author}
      subject={"curriculum vitae"}
      keywords={"cv skills"}
    >
      <Page dpi={72} size="A4" style={Styles.page}>
        {this.props.cvComponents.map((component) => {
          if (!this.checkContent(component)) return;

          const sectionName = component.section;

          const wrap = this.setWrap(sectionName);
          const heading =
            sectionName.slice(0, 1).toUpperCase() + sectionName.slice(1);

          return (
            <View wrap={wrap} key={component.id} style={Styles.section}>
              <Text style={{ fontWeight: 500 }}>{heading}</Text>
              <View style={Styles[sectionName]}>
                {this.formatLayout(component)}
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );

  formatLayout = (component) => {
    switch (component.section) {
      case "about":
        return Content.About(component.content);
      case "links":
        return Content.Links(component.content);
      case "skills":
        return Content.Skills(component.content);
      case "statement":
        return Content.Statement(component.content);
      case "education":
        return Content.Education(component.content);
      case "experience":
        return Content.Experience(component.content);
    }
  };

  render() {
    const document = this.PDFDocument();

    if (this.props.touch) {
      return (
        <div
          style={{
            top: 0,
            right: 0,
            width: "100vw",
            position: "absolute",
            display: "grid",
            placeContent: "center",
          }}
        >
          <p className="message">Thanks for using CV Savvy!</p>
          <PDFDownloadLink
            className="pdf-anchor"
            document={document}
            fileName={this.state.pdfName}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <React.Fragment>
                  Loading CV...
                  <i style={{ color: "black" }} className="fas fa-spinner"></i>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Download CV
                  <i
                    style={{ color: "green" }}
                    className="fas fa-file-download"
                  ></i>
                </React.Fragment>
              )
            }
          </PDFDownloadLink>
        </div>
      );
    }

    return (
      <div
        className="custom-viewer"
        style={{
          top: 0,
          left: 0,
          width: "100vw",
          height: "100%",
          position: "absolute",
          margin: "0 auto",
          backgroundColor: "rgb(50, 54, 57)",
        }}
      >
        <PDFViewer showToolbar={false}>{document}</PDFViewer>

        <div
          style={{
            top: 0,
            left: 0,
            height: 32,
            width: "100vw",
            // width: "98.7vw",
            zIndex: 100,
            position: "absolute",
            backgroundColor: "pink",
            backgroundColor: "rgb(50, 54, 57)",
          }}
        >
          <PDFDownloadLink document={document} fileName={this.state.pdfName}>
            {({ blob, url, loading, error }) =>
              loading ? (
                <React.Fragment>
                  <span style={messageStyle}>Loading...</span>
                  <i style={PDFIconStyle} className="fas fa-spinner rotate"></i>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span style={messageStyle}>Download PDF</span>
                  <i style={PDFIconStyle} className="fas fa-download"></i>
                </React.Fragment>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    );
  }
}
