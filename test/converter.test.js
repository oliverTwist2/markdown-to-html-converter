const convertMarkdown = require("../src/converter");

describe("Markdown to HTML Converter", () => {
  // Helper function to normalize HTML for comparison
  const normalizeHTML = (html) => {
    return html
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .replace(/>\s+</g, "><") // Remove spaces between tags
      .replace(/\s+>/g, ">") // Remove spaces before closing angle bracket
      .replace(/<\s+/g, "<") // Remove spaces after opening angle bracket
      .trim(); // Remove leading/trailing whitespace
  };

  // Test headings
  test("converts headings correctly", () => {
    const markdown = "# Heading 1\n## Heading 2\n### Heading 3";
    const expected = "<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>";
    const actual = convertMarkdown(markdown);
    expect(normalizeHTML(actual)).toBe(normalizeHTML(expected));
  });

  // Test bold and italic text
  test("converts bold and italic text correctly", () => {
    const markdown = "**bold text** and *italic text*";
    const expected =
      "<p><strong>bold text</strong> and <em>italic text</em></p>";
    const actual = convertMarkdown(markdown);
    expect(normalizeHTML(actual)).toBe(normalizeHTML(expected));
  });

  // Test links
  test("converts links correctly", () => {
    const markdown = "[Link text](https://example.com)";
    const expected = '<p><a href="https://example.com">Link text</a></p>';
    const actual = convertMarkdown(markdown);
    expect(normalizeHTML(actual)).toBe(normalizeHTML(expected));
  });

  // Test unordered lists
  test("converts unordered lists correctly", () => {
    const markdown = "- Item 1\n- Item 2\n- Item 3";
    const expected = "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>";
    const actual = convertMarkdown(markdown);
    expect(normalizeHTML(actual)).toBe(normalizeHTML(expected));
  });

  // Test ordered lists
  test("converts ordered lists correctly", () => {
    const markdown = "1. First item\n2. Second item\n3. Third item";
    const expected =
      "<ol><li>First item</li><li>Second item</li><li>Third item</li></ol>";
    const actual = convertMarkdown(markdown);
    expect(normalizeHTML(actual)).toBe(normalizeHTML(expected));
  });

  // Test code blocks
  test("converts code blocks correctly", () => {
    const markdown = "```javascript\nconst x = 1;\n```";
    const expected = "<pre><code>const x = 1;\n</code></pre>";
    const actual = convertMarkdown(markdown);
    expect(normalizeHTML(actual)).toBe(normalizeHTML(expected));
  });

  // Test blockquotes
  test("converts blockquotes correctly", () => {
    const markdown = "> This is a blockquote";
    const expected = "<blockquote><p>This is a blockquote</p></blockquote>";
    const actual = convertMarkdown(markdown);
    expect(normalizeHTML(actual)).toBe(normalizeHTML(expected));
  });

  // Test invalid input
  test("throws error for non-string input", () => {
    expect(() => convertMarkdown(123)).toThrow(
      "Invalid input: Markdown must be a string."
    );
  });

  test("throws error for non-string input with descriptive message", () => {
    expect(() => convertMarkdown(123)).toThrow(
      "Invalid input: Markdown must be a string. Received type: number"
    );
  });

  test("throws error for invalid Markdown conversion", () => {
    const invalidMarkdown = null; // Simulate invalid input
    expect(() => convertMarkdown(invalidMarkdown)).toThrow(
      "Invalid input: Markdown must be a string."
    );
  });
});
