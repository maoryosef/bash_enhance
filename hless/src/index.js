/**
 * Requires rougify to be installed in order to work
 */
const highlighter = require('./highlighter.js');
const lessLauncher = require('./lessLauncher.js');

function openHighlightedLess(filename, lineNumber) {
    highlighter.highlightFile(filename, lineNumber, false, content => {
        lessLauncher.launch(content, lineNumber);
    });
}

function openPreview(filename, lineNumber) {
    highlighter.highlightFile(filename, lineNumber, true, content => {
        console.log(content);
    });
}

module.exports = {
    openHighlightedLess,
    openPreview
};