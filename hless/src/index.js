/**
 * Requires rougify to be installed in order to work
 */
'use strict';

const spawn = require('child_process').spawn;
const _ = require('lodash');
const args = process.argv.splice(2, 1);

if (_.isEmpty(args)) {
    console.log("Usage: hless filename(:linenumber)");
    process.exit(1);
}

const filenameParts = args[0].split(':');
const filename = filenameParts[0];
let lineNumberString = '';
let lineNumber = 0;

const ASCII_COLOR_REGEX = /\x1b\[[0-9;]*m/g
const HIGHLIGHT_LINE_START = "\x1b[7m"
const HIGHLIGHT_LINE_END = "\x1b[m"

if (filenameParts.length > 1) {
    lineNumber = parseInt(filenameParts[1]);
    lineNumberString = `-j12 +${filenameParts[1]}g`;
}

const highlight = spawn('rougify', [filename]);
let highlighted = '';
highlight.stdout.on('data', (data) => {
    _(data).split('\n').forEach((ln, i) => {
        if (i + 1 === lineNumber) {
            highlighted += `${HIGHLIGHT_LINE_START}${ln.replace(ASCII_COLOR_REGEX, '')}${HIGHLIGHT_LINE_END}\n`;
        } else {
            highlighted += `${ln}\n`;
        }
    });
});

highlight.on('close', () => {
    const less = spawn(`less -R -N ${lineNumberString} > /dev/tty`, [], {shell: true});
    less.stdin.setEncoding('utf-8');

    less.stdout.pipe(process.stdout);

    less.stdin.write(highlighted);
    less.stdin.end();
});
