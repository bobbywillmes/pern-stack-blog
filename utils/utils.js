function getOppositeColor(hex) {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Invert RGB values
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  // Convert inverted RGB back to hex
  r = r.toString(16).padStart(2, '0');
  g = g.toString(16).padStart(2, '0');
  b = b.toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
}

function capitalizeEveryWord(str) {
  return str.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

function consoleLineNumbers() {
  'use strict';
// Add source filename & line numbers to command-line console.logs   (server.js:35| Server is running on port: 3000)
// Similar to the browser console
const path = require('path');
['debug', 'log', 'warn', 'error'].forEach((methodName) => {
    const originalLoggingMethod = console[methodName];
    console[methodName] = (firstArgument, ...otherArguments) => {
        const originalPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = (_, stack) => stack;
        const callee = new Error().stack[1];
        Error.prepareStackTrace = originalPrepareStackTrace;
        const relativeFileName = path.relative(process.cwd(), callee.getFileName());
        const prefix = `${relativeFileName}:${callee.getLineNumber()}|`;
        if (typeof firstArgument === 'string') {
            originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments);
        } else {
            originalLoggingMethod(prefix, firstArgument, ...otherArguments);
        }
    };
  });
}

module.exports = { getOppositeColor, capitalizeEveryWord, consoleLineNumbers }
