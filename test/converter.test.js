const convertMarkdown = require("../src/converter");

describe("Markdown to HTML Converter", () => {
  // Helper function to normalize HTML for comparison
  const normalizeHTML = (html) => {
    return html
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .replace(/>\s+</g, "><") // Remove spaces between tags
      .replace(/\s+>/g, ">") // Remove spaces before closing angle bracket
      .replace(/<\s+/g, "<") // Remove spaces after opening angle bracket
      .replace(/<img([^>]*?)\/?>/g, "<img$1>") // Normalize <img ... /> to <img ...>
      .replace(/<img([^>]*) >+/g, "<img$1>") // Remove space before > in <img ... >
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

  // Test empty input
  test("handles empty input", () => {
    const markdown = "";
    const expected = "";
    const actual = convertMarkdown(markdown);
    expect(normalizeHTML(actual)).toBe(normalizeHTML(expected));
  });

  //Test HTML escaping
  test("escapes raw HTML correctly", () => {
    const markdown = "<script>alert('XSS');</script>";
    const expected = "&lt;script&gt;alert('XSS');&lt;/script&gt;";
    const actual = convertMarkdown(markdown);
    expect(actual).toBe(expected);
  });

  // Test nested lists
  test("converts nested lists correctly", () => {
    const markdown = "- Item 1\n  - Subitem 1\n  - Subitem 2\n- Item 2";
    const expected =
      "<ul><li>Item 1<ul><li>Subitem 1</li><li>Subitem 2</li></ul></li><li>Item 2</li></ul>";
    const actual = convertMarkdown(markdown);
    expect(normalizeHTML(actual)).toBe(normalizeHTML(expected));
  });

  // Test images
  test("converts images correctly", () => {
    const markdown = "![Alt text](https://example.com/image.png)";
    const expected =
      '<p><img src="https://example.com/image.png" alt="Alt text"></p>';
    const actual = convertMarkdown(markdown);
    expect(normalizeHTML(actual)).toBe(normalizeHTML(expected));
  });

  // Test unsupported attributes
  test("removes unsupported attributes", () => {
    const markdown =
      '<a href="https://example.com" onclick="alert(\'XSS\')">Link</a>';
    const expected = '<p><a href="https://example.com">Link</a></p>';
    const actual = convertMarkdown(markdown);
    expect(normalizeHTML(actual)).toBe(normalizeHTML(expected));
  });

  // Test invalid input
  test("throws error for non-string input", () => {
    expect(() => convertMarkdown(123)).toThrow(
      "Invalid input: Markdown must be a string. Received type: number"
    );
  });

  test("throws error for invalid Markdown conversion", () => {
    const invalidMarkdown = null; // Simulate invalid input
    expect(() => convertMarkdown(invalidMarkdown)).toThrow(
      "Invalid input: Markdown must be a string. Received type: object"
    );
  });
});
