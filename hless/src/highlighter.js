'use strict';

const spawn = require('child_process').spawn;
const _ = require('lodash');

const ASCII_COLOR_REGEX = /\x1b\[[0-9;]*m/g
const HIGHLIGHT_LINE_START = "\x1b[7m"
const HIGHLIGHT_LINE_END = "\x1b[m"

function highlightLine(content, lineNumber) {
    let retVal = '';
    _(content).split('\n').forEach((ln, i) => {
        if (i + 1 === lineNumber) {
            retVal += `${HIGHLIGHT_LINE_START}${ln.replace(ASCII_COLOR_REGEX, '')}${HIGHLIGHT_LINE_END}\n`;
        } else {
            retVal += `${ln}\n`;
        }
    });

    return retVal;
}

function highlightFile(filename, lineNumber, cb) {
    const highlight = spawn('rougify', [filename]);
    let highlighted = '';
    highlight.stdout.on('data', (data) => {
        highlighted += data;
    });

    highlight.on('close', () => {
        if (lineNumber > 0) {
            highlighted = highlightLine(highlighted, lineNumber);
        }

        cb(highlighted)
    });
}

module.exports = {
    highlightFile
};