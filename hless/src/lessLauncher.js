'use strict';

const spawn = require('child_process').spawn;

function launch(content, lineNumber) {
    let lineBufferStr = '';

    if (lineNumber > 12) {
        lineBufferStr = '-j12';
    }

    const less = spawn(`less -R -N ${lineBufferStr} +${lineNumber}g > /dev/tty`, [], { shell: true });
    less.stdin.setEncoding('utf-8');

    less.stdout.pipe(process.stdout);

    less.stdin.write(content);
    less.stdin.end();
}

module.exports = {
    launch
}