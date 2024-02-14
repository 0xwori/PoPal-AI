import * as commonmark from "commonmark";
import htmlReactParser from "html-react-parser";


const StoryGenerator = ({ initialMarkdown }) => {
  // Parse Markdown content and render as HTML
//   const reader = new commonmark.Parser();
//   const writer = new commonmark.HtmlRenderer();
//   const parsedContent = writer.render(reader.parse(initialMarkdown));

// const cleanResponse = (response) => {
//     const cleanedResponse = response.replace(/```html|```/g, ""); // Remove ```html and ``` code blocks
//     const doc = new DOMParser().parseFromString(cleanedResponse, "text/html");
//     const bodyContent = doc.body.innerHTML; // Extract content from body
//     return bodyContent;
//   };

  return (
    <div className="markdown-content">{htmlReactParser(initialMarkdown)}</div>
  );
};

export default StoryGenerator;
