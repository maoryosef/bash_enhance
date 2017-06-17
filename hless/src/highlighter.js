const shelljs = require('shelljs');
const _ = require('lodash');
const fs = require('fs');

const ASCII_COLOR_REGEX = /(\x1b\[[0-9;]*m)/g; //eslint-disable-line no-control-regex
const HIGHLIGHT_LINE_START = '\x1b[7m';
const HIGHLIGHT_LINE_END = '\x1b[m';
const DEF_HEIGHT = 44;

function highlightLine(content, lineNumber, center) {
    let retVal = '';
    let centerOffset = 1;
    const contentArr = _.split(content, '\n');
    let height = contentArr.length;

    if (center) {
        var ttyHeight = fs.existsSync('/dev/tty') ? shelljs.exec('stty size < /dev/tty', {silent: true}).stdout : `${DEF_HEIGHT} x`;

        height = _.parseInt(_(ttyHeight).split(' ').head());
        height -= 2;
        centerOffset = Math.ceil(Math.max(1, lineNumber - height / 3));
    }

    _(contentArr)
    .drop(centerOffset - 1)
    .take(height)
    .forEach((ln, i) => {
        if (i + centerOffset === lineNumber) {
            retVal += `${HIGHLIGHT_LINE_START}${ln.replace(ASCII_COLOR_REGEX, '$1' + HIGHLIGHT_LINE_START)}${HIGHLIGHT_LINE_END}\n`;
        } else {
            retVal += `${ln}\n`;
        }
    });

    return retVal;
}

function highlightFile(filename, lineNumber, center, cb) {
    const highlight = spawn('rougify', [filename]);
    let highlighted = '';
    highlight.stdout.on('data', (data) => {
        highlighted += data;
    });

    highlight.on('close', () => {
        highlighted = highlightLine(highlighted, lineNumber, center);

        cb(highlighted);
    });
}

module.exports = {
    highlightFile
};