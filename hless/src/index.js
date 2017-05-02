/**
 * Requires rougify to be installed in order to work
 */
const _ = require('lodash');
const highlighter = require('./highlighter.js');
const lessLauncher = require('./lessLauncher.js');
const args = process.argv.splice(2, 1);

if (_.isEmpty(args)) {
    console.log('Usage: hless filename[:linenumber]');
    process.exit(1);
}

const filenameParts = args[0].split(':');
const filename = filenameParts[0];
let lineNumber = 0;

if (filenameParts.length > 1) {
    lineNumber = parseInt(filenameParts[1], 10);
}

highlighter.highlightFile(filename, lineNumber, content => {
    lessLauncher.launch(content, lineNumber);
});
