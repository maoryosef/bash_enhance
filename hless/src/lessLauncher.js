const spawn = require('child_process').spawn;

function launch(content, lineNumber) {
    let lineBufferStr = '';

    if (lineNumber >= 12) {
        lineBufferStr = '-j12';
    } else {
        lineBufferStr = `-j${lineNumber}`;
    }

    const less = spawn(`less -R -N ${lineBufferStr} +${lineNumber}g > /dev/tty`, [], {shell: true});
    less.stdin.setEncoding('utf-8');

    less.stdout.pipe(process.stdout);

    less.stdin.write(content);
    less.stdin.end();

    less.stdin.on('error', err => {
        if (err.code === 'EPIPE') {
            process.exit();
        }

        console.error(err);
    });
}

module.exports = {
    launch
};