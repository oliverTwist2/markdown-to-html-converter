#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const winston = require("winston");
const convertMarkdown = require("../src/converter");

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

// Get arguments from the command line
const args = process.argv.slice(2);

function showHelp() {
  console.log(`
Usage: mdtohtml <input.md> [options]

Options:
  -o, --output <file>   Specify output file (default: stdout)
  -h, --help            Show this help message
  `);
}

// Handle Help Option
if (args.includes("-h") || args.includes("--help")) {
  showHelp();
  process.exit(0);
}

// Check for input file
const inputFile = args.find((arg) => arg.endsWith(".md"));
const outputIndex =
  args.indexOf("-o") !== -1 ? args.indexOf("-o") : args.indexOf("--output");

let outputFile = outputIndex !== -1 ? args[outputIndex + 1] : null;

if (!inputFile && process.stdin.isTTY) {
  logger.error("No input provided. Use a file or pipe content via stdin.");
  showHelp();
  process.exit(1);
}

// Read Markdown content (from file or stdin)
let readMarkdown;
try {
  readMarkdown = inputFile
    ? fs.readFileSync(path.resolve(inputFile), "utf8")
    : fs.readFileSync(0, "utf8"); // Read from stdin
  logger.info(`Successfully read input from ${inputFile || "stdin"}`);
} catch (error) {
  logger.error(
    `Failed to read input: ${error.message}. Ensure the file exists and is readable.`
  );
  process.exit(1);
}

// Convert to HTML
let htmlOutput;
try {
  htmlOutput = convertMarkdown(readMarkdown);
  logger.info("Markdown successfully converted to HTML.");
} catch (error) {
  logger.error(`Conversion failed: ${error.message}`);
  process.exit(1);
}

// Output result (write to file or stdout)
try {
  if (outputFile) {
    fs.writeFileSync(path.resolve(outputFile), htmlOutput, "utf8");
    logger.info(`Converted HTML saved to ${outputFile}`);
  } else {
    console.log(htmlOutput);
    logger.info("Converted HTML output to stdout.");
  }
} catch (error) {
  logger.error(
    `Failed to write output: ${error.message}. Ensure the output path is writable.`
  );
  process.exit(1);
}
