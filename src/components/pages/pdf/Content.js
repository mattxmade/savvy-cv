import React from "react";
import Styles from "./Styles";
import SVGs from "../icons/SVGs";
import { Link, Text, View } from "@react-pdf/renderer";

const Content = (() => {
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
          <View key={index} style={Styles.links.link}>
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
        <View style={Styles.education.overview}>
          <Text style={Styles.education.overview.info}>
            {knowledge.institute}
          </Text>

          <View style={Styles.education.overview.info}>
            <Text style={Styles.education.overview.info.text}>
              {knowledge.date.start}
            </Text>

            <Text style={Styles.education.overview.info.text}>
              {knowledge.date.end}
            </Text>
          </View>
        </View>

        <View style={Styles.education.qualifications}>
          {knowledge.quals.map((qual, index) => (
            <Text style={Styles.education.qualifications.text} key={index}>
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
        <View style={Styles.education.overview}>
          <Text style={Styles.education.overview.info}>{history.employer}</Text>

          <View style={Styles.education.overview.info}>
            <Text style={Styles.education.overview.info.text}>
              {history.date.start}
            </Text>

            <Text style={Styles.education.overview.info.text}>
              {history.date.end}
            </Text>
          </View>
        </View>

        <View style={Styles.education.qualifications}>
          <Text style={Styles.education.qualifications.text}>
            {history.job.title}
          </Text>
          <Text style={Styles.education.qualifications.text}>
            {history.job.description}
          </Text>
        </View>
      </View>
    ));

  return { About, Links, Skills, Statement, Education, Experience };
})();

export default Content;
