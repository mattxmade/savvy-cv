import {
  Document,
  Page,
  Font,
  Text,
  Svg,
  Path,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

import React, { Component } from "react";
import { format } from "date-fns";

import Pacifico from "../../../fonts/Pacifico/Pacifico-Regular.ttf";
import RajdhaniLight from "../../../fonts/Rajdhani/Rajdhani-Light.ttf";
import RajdhanMedium from "../../../fonts/Rajdhani/Rajdhani-Medium.ttf";

// TODO: split up component

Font.register({
  family: "Pacifico",
  src: Pacifico,
});

Font.register({
  family: "Rajdhani",
  src: RajdhaniLight,
});

Font.register({
  family: "Rajdhani",
  fonts: [
    { src: RajdhaniLight },
    { src: RajdhanMedium, fontStyle: "normal", fontWeight: 500 },
  ],
});

const brandColr = "rgb(221, 241, 241)";
const margin = "5px 0";
const padding = 8;
const borderRadius = 5;
const borderBottom = "5px solid rgb(221, 241, 241)";

const debugBorder = "1px dashed red";
const innderBorder = `2px solid ${brandColr}`;

// Create styles
const styles = StyleSheet.create({
  page: {
    margin: "10 0",
    fontSize: 13,
    width: 100,
    fontFamily: "Rajdhani",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  section: {
    margin: "0 10",
    padding: padding,
    // border: debugBorder,
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
    <Text style={{ fontSize: 60 - 60 / 4 }}>
      {content.first + " " + content.last}
    </Text>
    <View style={{ alignSelf: "center" }}>
      <Text>{content.email}</Text>
      <Text>{content.telephone}</Text>
    </View>
  </React.Fragment>
);

const svgStyle = {
  width: 15,
  height: 15,
  marginRight: 5,
  backgroundColor: "white",
};

const SVG = (props) => (
  <Svg style={svgStyle} viewBox={props.viewBox}>
    <Path d={props.d} stroke={"white"} strokeWidth={0} fill={"black"} />
  </Svg>
);

const GlobeSvg = () => {
  return (
    <SVG
      viewBox="0 0 496 512"
      d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
    />
  );
};

const FacebookSvg = () => <SVG d="" />;

const GitHubSvg = () => (
  <SVG
    viewBox="0 0 448 512"
    d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z"
  />
);

const InstagramSvg = () => (
  <SVG
    viewBox="0 0 448 512"
    d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"
  />
);

const TwitterSvg = () => (
  <SVG
    viewBox="0 0 448 512"
    d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"
  />
);

const getIcon = (type) => {
  switch (type) {
    case "facebook":
      return <FacebookSvg />;
    case "github":
      return <GitHubSvg />;
    case "instagram":
      return <InstagramSvg />;
    case "linkedin":
      return <LinkedInSvg />;
    case "pinterest":
      return <PinterestSvg />;
    case "snapchat":
      return <SnapchatSvg />;
    case "twitter":
      return <TwitterSvg />;
    case "whatsapp":
      return <WhatsAppSvg />;
    case "youtube":
      return <YouTubeSvg />;
    default:
      return <GlobeSvg />;
  }
};

const Links = (content) => {
  return (
    <React.Fragment>
      {content[0].links.map((link, index) => (
        <View key={index} style={styles.links.link}>
          {getIcon(link.type)}
          <Link style={{ color: "black", textDecoration: "none" }}>
            {link.handle}
          </Link>
        </View>
      ))}
    </React.Fragment>
  );
};

const Skills = (content) => {
  return (
    <React.Fragment>
      {content[0].skills.map((skill, index) => (
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

class PDF extends React.Component {
  constructor(props) {
    super(props);
  }

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
    if (this.props.cvComponents === "") return null;

    const title =
      "CV Savvy | Generated CV PDF: " + format(Date.now(), "MMMM Y");

    return (
      <Document title={title} producer={"CV Savvy"}>
        <Page dpi={72} size="A4" style={styles.page}>
          {this.props.cvComponents.map((component) => {
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
  }
}

export default PDF;
