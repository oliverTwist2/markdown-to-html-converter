const marked = require("marked");
const sanitizeHTML = require("sanitize-html");

function convertMarkdown(markdown) {
  if (typeof markdown !== "string") {
    throw new Error(
      "Invalid input: Markdown must be a string. Received type: " +
        typeof markdown
    );
  }

  try {
    // Convert Markdown to HTML
    const html = marked.parse(markdown);

    // Sanitize the HTML to prevent XSS attacks
    const sanitizedHtml = sanitizeHTML(html, {
      allowedTags: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "p",
        "a",
        "ul",
        "ol",
        "nl",
        "li",
        "b",
        "i",
        "strong",
        "em",
        "strike",
        "code",
        "hr",
        "br",
        "div",
        "table",
        "thead",
        "caption",
        "tbody",
        "tr",
        "th",
        "td",
        "pre",
        "img",
      ],
      allowedAttributes: {
        a: ["href", "name", "target"],
        img: ["src", "alt"],
      },
    });

    return sanitizedHtml;
  } catch (error) {
    throw new Error("Error during Markdown conversion: " + error.message);
  }
}

module.exports = convertMarkdown;
