import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Font,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

import React, { Component } from "react";
import { format } from "date-fns";
import SVGs from "../icons/SVGs";

import RajdhaniLight from "../../../fonts/Rajdhani/Rajdhani-Light.ttf";
import RajdhanMedium from "../../../fonts/Rajdhani/Rajdhani-Medium.ttf";

Font.register({
  family: "Rajdhani",
  fonts: [
    { src: RajdhaniLight },
    { src: RajdhanMedium, fontStyle: "normal", fontWeight: 500 },
  ],
});

const brandColr = "rgb(221, 241, 241)";

const padding = 8;
const margin = "5px 0";

const borderRadius = 5;
const borderBottom = "5px solid rgb(221, 241, 241)";

const debugBorder = "1px dashed red";
const innderBorder = `2px solid ${brandColr}`;

// Create styles
const styles = StyleSheet.create({
  page: {
    margin: "23 0 10",
    fontSize: 13,
    width: 100,
    fontFamily: "Rajdhani",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  section: {
    margin: "0 10",
    padding: padding,
    borderRadius: borderRadius,
    borderBottom: borderBottom,
  },

  about: {
    flexGrow: 1,
    padding: padding,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  links: {
    padding: padding,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",

    link: {
      width: "50%",
      margin: margin,
      flexWrap: "wrap",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  },

  skills: {
    padding: padding,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  statement: { textAlign: "center", padding: padding },

  education: {
    flexWrap: "wrap",
    flexDirection: "column",
    padding: padding,
    position: "relative",

    overview: {
      width: "100%",
      flexDirection: "row",
      fontWeight: 500,
      justifyContent: "space-between",
      border: innderBorder,

      info: {
        width: "100%",
        flexDirection: "row",
        padding: padding,

        text: {
          alignSelf: "flex-end",
          width: "50%",
          fontSize: 12,
          margin: "2.5px",
          textAlign: "center",
          padding: padding / 2,
          borderRadius: borderRadius,
          backgroundColor: "rgb(255 150 200 / 0.1)",
        },
      },
    },
    qualifications: {
      margin: "0 0 5",
      flexDirection: "column",
      border: innderBorder,
      position: "relative",
      top: -1,

      text: {
        width: "100%",
        padding: borderRadius,
        margin: `${borderRadius / 2} 0`,
        backgroundColor: "rgb(255 150 200 / 0.1)",
      },
    },
  },
  experience: {
    flexWrap: "wrap",
    flexDirection: "column",
    padding: padding,
    position: "relative",
  },
});

const About = (content) => (
  <React.Fragment>
    <Text style={{ fontSize: 60 - 60 / 4 }}>{content.name}</Text>
    <View style={{ alignSelf: "center" }}>
      <Text>{content.email}</Text>
      <Text>{content.telephone}</Text>
      <Text style={{ marginTop: 15 }}>{content.portfolio}</Text>
    </View>
  </React.Fragment>
);

const Links = (content) => {
  return (
    <React.Fragment>
      {content.map((link, index) => (
        <View key={index} style={styles.links.link}>
          {SVGs.getIcon(link.type)}
          <Link style={{ color: "black", textDecoration: "none" }}>
            {link.url}
          </Link>
        </View>
      ))}
    </React.Fragment>
  );
};

const Skills = (content) => {
  return (
    <React.Fragment>
      {content.map((skill, index) => (
        <Text style={{ margin: "0 5px" }} key={index}>
          {skill}
        </Text>
      ))}
    </React.Fragment>
  );
};

const Statement = (content) => <Text>{content}</Text>;

const Education = (content) => {
  return content.map((knowledge, index) => (
    <View wrap={false} key={index}>
      <View style={styles.education.overview}>
        <Text style={styles.education.overview.info}>
          {knowledge.institute}
        </Text>

        <View style={styles.education.overview.info}>
          <Text style={styles.education.overview.info.text}>
            {knowledge.date.start}
          </Text>

          <Text style={styles.education.overview.info.text}>
            {knowledge.date.end}
          </Text>
        </View>
      </View>

      <View style={styles.education.qualifications}>
        {knowledge.quals.map((qual, index) => (
          <Text style={styles.education.qualifications.text} key={index}>
            {qual}
          </Text>
        ))}
      </View>
    </View>
  ));
};

const Experience = (content) =>
  content.map((history, index) => (
    <View wrap={false} key={index}>
      <View style={styles.education.overview}>
        <Text style={styles.education.overview.info}>{history.employer}</Text>

        <View style={styles.education.overview.info}>
          <Text style={styles.education.overview.info.text}>
            {history.date.start}
          </Text>

          <Text style={styles.education.overview.info.text}>
            {history.date.end}
          </Text>
        </View>
      </View>

      <View style={styles.education.qualifications}>
        <Text style={styles.education.qualifications.text}>
          {history.job.title}
        </Text>
        <Text style={styles.education.qualifications.text}>
          {history.job.description}
        </Text>
      </View>
    </View>
  ));

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
  // height: 56,
  // width: 56,
  // borderRadius: "50%",
  height: 32,
  //backgroundColor: "rgb(50, 54, 57)",
};

export default class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 2,
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

  newPDFDocument = () => (
    <Document
      producer={"CV Savvy"}
      title={this.state.title}
      author={this.state.author}
      subject={"curriculum vitae"}
      keywords={"cv skills"}
    >
      <Page dpi={72} size="A4" style={styles.page}>
        {this.props.cvComponents.map((component) => {
          if (!this.checkContent(component)) return;

          const sectionName = component.section;

          const wrap = this.setWrap(sectionName);
          const heading =
            sectionName.slice(0, 1).toUpperCase() + sectionName.slice(1);

          return (
            <View wrap={wrap} key={component.id} style={styles.section}>
              <Text style={{ fontWeight: 500 }}>{heading}</Text>
              <View style={styles[sectionName]}>
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

  render() {
    const newDocument = this.newPDFDocument();

    if (this.props.touch) {
      return (
        <div
          style={{
            top: 0,
            left: 0,
            width: "100vw",
            height: "100%",
            position: "absolute",
            display: "grid",
            placeContent: "center",
          }}
        >
          <PDFDownloadLink document={newDocument} fileName={this.state.pdfName}>
            {({ blob, url, loading, error }) =>
              loading ? (
                <i style={{ color: "red" }} className="fas fa-spinner"></i>
              ) : (
                <i
                  style={{ color: "green", fontSize: 80 }}
                  className="fas fa-file-download"
                ></i>
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
          // paddingTop: 56,
          position: "absolute",
          margin: "0 auto",
          backgroundColor: "rgb(50, 54, 57)",
        }}
      >
        <PDFViewer showToolbar={false}>{newDocument}</PDFViewer>

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
          <PDFDownloadLink document={newDocument} fileName={this.state.pdfName}>
            {({ blob, url, loading, error }) =>
              loading ? (
                <i style={PDFIconStyle} className="fas fa-spinner rotate"></i>
              ) : (
                <i style={PDFIconStyle} className="fas fa-file-download"></i>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    );
  }
}
