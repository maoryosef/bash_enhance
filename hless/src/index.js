/**
 * Requires rougify to be installed in order to work
 */
const highlighter = require('./highlighter.js');
const lessLauncher = require('./lessLauncher.js');

function openHighlightedLess(filename, lineNumber) {
    highlighter.highlightFile(filename, lineNumber, content => {
        lessLauncher.launch(content, lineNumber);
    });
}

module.exports = {
    openHighlightedLess
};