<a name="readme-top"></a>
<a href="#"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react-badge"/></a>

# <a href="#"></a>CV Savvy | <a href="https://mattxmade.github.io/savvy-cv" target="_blank"> <strong>Live</strong></a>

> ### CV builder

<br>

<div align="center">
  <a href="#"><img src="https://user-images.githubusercontent.com/97047080/231761599-29812e1f-41a9-4b8e-b3d3-787d692f3331.svg" width="500" /></a>

###

  <table>
    <tbody>
      <tr>
      </tr>
      <tr>
        <!--<td align=center><strong>Technologies</strong></td>-->
        <td align="center">
          <a href="#"><img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="html-badge"/></a> 
          <a href="#"><img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="css-badge"/></a>   
          <a href="#"><img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="sass-badge"/></a>
          <a href="#"><img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="javascript-badge"/></a>
          <a href="#"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react-badge"/></a>
          <a href="#"><img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="react-router-badge"/></a>
        </td>
    </tbody>
  </table> 
</div>

<br>

## About

The project is built in <a href="https://github.com/facebook/react"><strong>React</strong></a> using <a><strong>Class Components</strong></a> and features three pages:
a form page, a layout editor page and a PDF previewer page.

Component layouts are created using <strong>JSX</strong> and <strong>Semantic HTML</strong>. A combination of media-queries, <strong>CSS Flexbox</strong> and <strong>CSS Grid</strong> are used to create responsive layouts. Navigation is handled using <a href="https://github.com/remix-run/react-router"><strong>React-Router</strong></a>.

The form page is composed of six sections. Section data can be saved as tags for quick recall, achieved in code by updating specific states. Sections can be locked to disable editing/deletion and also be ommitted from inclusion in the final CV. LocalStorage is used to restore session data.

<a href="https://github.com/atlassian/react-beautiful-dnd"><strong>React Beautiful DnD (RBD)</strong></a> is used to add drag and drop functionality. This allows CV layouts to be edited in realtime.

<a href="https://github.com/diegomura/react-pdf"><strong>ReactPDF</strong></a> is used to create preview documents and facilitate PDF generation.

<br>

### Features

<table>
  <thead>
  </thead>
  <tbody>
    <tr>
      <td align=center><strong>CV Form</strong></td>
      <td>Detailed form page with data recall & tag system</td>
    </tr>
    <tr><td colspan=2></td></tr>
    <tr>
      <td align=center><strong>CV Layout Editor</strong></td>
      <td>Realtime CV section reordering using drag & drop</td>
    </tr>
    <tr><td colspan=2></td></tr>
    <tr>
      <td align=center><strong>PDF Generation</strong></td>
      <td>PDF previewer with option to download completed CV</td>
    </tr>
    <tr><td colspan=2><a href="#features"><img src="docs/table.svg"/></a></td</tr>
  </tbody>
</table>

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Demo
<img src="/docs/demo.gif" alt="Savvy CV demo"/>

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Overview

### React-Router
> Application routing is contructed using HashRouter and has three defined routes:
>
> #### Form Component Page Route
>
> ```js
>  <Route
>    path="/"
>    element={ <Form {...} /> }
>  />
> ```
> #### Editor Component Page Route
> ```js
>  <Route
>    path="editor"
>    element={ <Editor {...} /> }
> />
> ```
> #### Viewer Component Page Route
> ```js
>  <Route
>    path="viewer"
>    element={ <Viewer {...} /> }
>  />
> ```

##

### State Management
States are declared as key/value pairs inside Class Component constructor functions. Each CV form section has a key/value pair. Form sections have their state lifted. Application data has one source of truth, shared across all pages.

<br>

> #### App.js | Constructor
>```jsx
>class App extends Component {
>  constructor(props) {
>    super(props);
>
>    this.state = {
>      {...}
>
>      cv: cvData
>        ? cvData
>        : {
>            about: about,
>            links: links,
>            skills: skills,
>            statement: statement,
>            education: education,
>            experience: experience,
>          },
>    };
>  }
>  {...}
>}
>```

### State updates
A form section change triggers a state update.

> #### App.js | updateCV
>```jsx
>updateCV = (sectionName, newContent) => {
>  const updateData = this.state.cv;
>  updateData[sectionName].content = newContent;
>
>  this.setState({
>    cv: updateData,
>    cvComponents: this.state.cvComponents.map((component) => {
>      if (component.section === sectionName) {
>        component.content = newContent;
>      }
>      return component;
>    }),
>  });
>};
>```

### Passing Props
States can be passed to child Components through props. The above update handler for example is passed as a prop to the Form Component. 

> #### Form Component
>```js
><Form
>  cvData={this.state.cv}
>  updateCV={this.updateCV}
>  setPageIndex={(index) => this.setState({ index })}
>/>
>```
> #### Child Component Invocation
> ```js
> /*
>   About.js
>     ¬ Component extract
> */
> this.props.upateCV("about", { name, email, telephone, portfolio });
> ```

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Form Page
[comment]: <> (A form section can trigger cvData to be updated. For the majority of form sections, a trigger occurs when the user completes a form section and clicks the "+" icon button, submitting the data.)

> #### The form page is broken into component sections.
> A section can be muted, ommiting its data from inclusion and also locked to prevent further editing or accidental deletion.
> A tagging system allows multiple datasets to be added, allowing data to be swapped in and out quickly without the need to re-enter information again.
> 
> ## Planning
> #### Form page layout design
> <a href="#"><img width=600 src="/docs/savyy-cv_2022-08-08.svg"/></a>

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Layout Editor Page
The layout editor page is split into segments and represent a section of CV. Changes in segment stack order affect the visual layout of CV.

<br>

> #### Editor.js | React Class Component
> ```js
> formatLayout = (component) => {
>   switch (component.section) {
>     case "about":
>       return Segment.About(component.content);
>     case "links":
>       return Segment.Links(component.content);
>     case "skills":
>       return Segment.Skills(component.content);
>     case "statement":
>       return Segment.Statement(component.content);
>     case "education":
>       return Segment.Education(component.content);
>     case "experience":
>       return Segment.Experience(component.content);
>   }
> };
> ```

### Drag and Drop
Layout segements can be reordered through the drag and drop user interface. This is achieved using <a href="#">Beautiful-DnD<a/>. By creating a context area using DragDropContext, elements can be made be made interactive using the provided Draggable and Droppable Components.

#### Implemenation: Drag and Drop
> #### Editor Class Component | Extract
> ```js
> <DragDropContext onDragEnd={this.handleOnDragEnd}>
>   <Droppable droppableId="editor-sections">
>     {(provided) => (
>       <ul className="editor-sections" {...}>
>         {this.props.cvComponents.map((component, index) => {
>           > if (!this.checkContent(component)) return null;
>
>           return (
>             <Draggable draggableId={component.id} {...}>
>               {(provided) => (
>                 <li id={"format-" + component.section} >
>                   <h3>{component.section}</h3>
>                   {this.formatLayout(component)}
>                 </li>
>               )}
>             </Draggable>
>           );
>         })}
>         {provided.placeholder}
>       </ul>
>     )}
>   </Droppable>
> </DragDropContext>
> ```
> #### Note 📡
> At time of development, Beautiful-DnD v13.1.0 was not compatiable with React in StrictMode. To workaround this issue, the editor route path is not rendered in StrictMode. 

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## PDF Preview Page
PDFs previews are built using <a href="https://github.com/diegomura/react-pdf">React-PDF</a>.

PDF documents are built on demand and reflect changes made across the application.

### Document Composition
> #### Details 📡
> Document, View and Text Components are provided by React-PDF. Metadata can be added via Document props. The View Component acts a container akin to a HTML div element and text is rendered using the Text Component.
> ```js
> <Document
>   producer={"CV Savvy"}
>   title={this.state.title}
>   author={this.state.author}
> 
>   <Page dpi={72} size="A4" style={Styles.page}>
>     {this.props.cvComponents.map((component) => {
> 
>       const sectionName = component.section;
>       const wrap = this.setWrap(sectionName);
>       const heading = sectionName.slice(0, 1).toUpperCase() + sectionName.slice(1);
> 
>       return (
>         <View wrap={wrap} key={component.id} style={Styles.section}>
>           <Text style={{ fontWeight: 500 }}>{heading}</Text>
>           <View style={Styles[sectionName]}>
>             {this.formatLayout(component)}
>           </View>
>         </View>
>       );
>     })}
>   </Page>
> </Document>
> ```

### Applying Styles
> ### Details 📡
> An intuitive styling system is provided via the <a href="https://react-pdf.org/styling">StyleSheet API</a> which includes Flexbox support.
> Guided by the CSS styling and layout choices application wide, PDF styling is utilisied to create a visually consist look that matches closely with the layout editor page.
>
> ```js
> const Styles = StyleSheet.create({
>   page: {
>     margin: "23 0 10",
>     fontSize: 13,
>     width: 100,
>     fontFamily: "Rajdhani",
>     flexDirection: "column",
>     justifyContent: "flex-start",
>   },
> 
>   section: {
>     margin: "0 10",
>     padding: padding,
>     borderRadius: borderRadius,
>     borderBottom: borderBottom,
>   },
> 
>   about: {
>     flexGrow: 1,
>     padding: padding,
>     flexDirection: "row",
>     justifyContent: "space-between",
>   },
> 
>   links: {
>     padding: padding,
>     flexWrap: "wrap",
>     flexDirection: "row",
>     justifyContent: "space-between",
> 
>     link: {
>       width: "50%",
>       margin: margin,
>       flexWrap: "wrap",
>       flexDirection: "row",
>       alignItems: "center",
>       justifyContent: "flex-start",
>     },
>   },
> 
>   skills: {
>     padding: padding,
>     flexWrap: "wrap",
>     flexDirection: "row",
>     justifyContent: "space-evenly",
>   },
> 
>   statement: { textAlign: "center", padding: padding },
> 
>   education: {
>     flexWrap: "wrap",
>     flexDirection: "column",
>     padding: padding,
>     position: "relative",
> 
>     overview: {
>       width: "100%",
>       flexDirection: "row",
>       fontWeight: 500,
>       justifyContent: "space-between",
>       border: innderBorder,
> 
>       info: {
>         width: "100%",
>         flexDirection: "row",
>         padding: padding,
> 
>         text: {
>           alignSelf: "flex-end",
>           width: "50%",
>           fontSize: 12,
>           margin: "2.5px",
>           textAlign: "center",
>           padding: padding / 2,
>           borderRadius: borderRadius,
>           backgroundColor: "rgb(255 150 200 / 0.1)",
>         },
>       },
>     },
>     qualifications: {
>       margin: "0 0 5",
>       flexDirection: "column",
>       border: innderBorder,
>       position: "relative",
>       top: -1,
> 
>       text: {
>         width: "100%",
>         padding: borderRadius,
>         margin: `${borderRadius / 2} 0`,
>         backgroundColor: "rgb(255 150 200 / 0.1)",
>       },
>     },
>   },
>   experience: {
>     flexWrap: "wrap",
>     flexDirection: "column",
>     padding: padding,
>     position: "relative",
>   },
> });
> ```

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [x] Create user form

  - [x] About section
  - [x] Links section
  - [x] Statement section
  - [x] Education section
  - [x] Experience section

- [x] Build layout editor

  - [x] Implement drag and drop

- [x] PDF integration
  - [x] PDF preview
  - [x] PDF generation

##

### Environment

<a href="#"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="nodjs-badge"/></a>

### Build Tools

<a href="#"><img src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black" alt="webpack-badge"/></a>
<a href="#"><img src="https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black" alt="babel-badge"/></a>

### Developer Tools

<a href="#"><img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm-badge"/></a>
<a href="#"><img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="vscode-badge"/></a>

##

### Deployment

<a href="#"><img src="https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white" alt="github-pages-badge"/></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
