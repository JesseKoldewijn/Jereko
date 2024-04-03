import { parse } from "node-html-parser";

/**
 * The `parseHtml` function takes an HTML string as input, parses it using DOMParser, and returns an
 * object containing the inner HTML and text content of the parsed document's body.
 * @param {string} html - The `parseHtml` function takes a string of HTML content as input and uses the
 * DOMParser to parse it into a document object. It then extracts the inner HTML and text content of
 * the body element from the parsed document.
 * @returns The `parseHtml` function returns an object with two properties:
 * 1. `html`: The inner HTML content of the parsed HTML string.
 * 2. `text`: The text content of the parsed HTML string. If there is no text content, it defaults to
 * an empty string.
 */
export const parseHtml = (html: string) => {
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    return {
      html: doc.body.innerHTML,
      text: doc.body.textContent ? doc.body.textContent.trim() : "",
    };
  } else {
    const doc = parse(html);

    return {
      html: doc.innerHTML,
      text: doc.textContent.trim() ?? "",
    };
  }
};
