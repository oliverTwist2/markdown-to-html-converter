# Markdown to HTML Converter

A simple and secure Node.js utility that converts Markdown to HTML with built-in XSS protection.

## Features

- Converts Markdown to clean, sanitized HTML
- Built-in XSS protection using `sanitize-html`
- Supports common Markdown elements:
  - Headings (h1-h6)
  - Bold and italic text
  - Links
  - Ordered and unordered lists
  - Code blocks
  - Blockquotes
  - Tables
  - Images
- Comprehensive test suite
- Input validation

## Installation

```bash
npm install markdown-html-converter
```

## Usage

### As a Module

```javascript
const convertMarkdown = require('markdown-html-converter');

// Convert Markdown to HTML
const markdown = '# Hello World\n\nThis is a **bold** text.';
const html = convertMarkdown(markdown);
console.log(html);
```

### Command Line Interface

```bash
mdtohtml input.md > output.html
```

## Security

This converter includes built-in XSS protection through `sanitize-html`. It only allows specific HTML tags and attributes:

### Allowed HTML Tags
- Headings (h1-h6)
- Blockquotes
- Paragraphs
- Links
- Lists (ordered and unordered)
- List items
- Bold and italic text
- Code blocks
- Tables and related elements
- Images

### Allowed Attributes
- Links: href, name, target
- Images: src, alt

## Development

### Running Tests

```bash
npm test
```

The test suite covers:
- Headings conversion
- Bold and italic text
- Links
- Lists (ordered and unordered)
- Code blocks
- Blockquotes
- Input validation

### Project Structure

```
markdown-html-converter/
├── src/
│   └── converter.js    # Main conversion logic
├── test/
│   └── converter.test.js  # Test suite
├── bin/
│   └── cli.js         # Command-line interface
├── package.json
└── README.md
```

## License

ISC

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

[Your Name] 