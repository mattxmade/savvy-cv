import { StyleSheet } from "@react-pdf/renderer";

const brandColr = "rgb(221, 241, 241)";

const padding = 8;
const margin = "5px 0";

const borderRadius = 5;
const borderBottom = "5px solid rgb(221, 241, 241)";

const debugBorder = "1px dashed red";
const innderBorder = `2px solid ${brandColr}`;

// Create styles
const Styles = StyleSheet.create({
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

export default Styles;
