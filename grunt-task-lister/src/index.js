const grunt = require('grunt');
const _ = require('lodash');
const fs = require('fs');

const gruntFileName = `${process.cwd()}/Gruntfile.js`;

if (!fs.existsSync(gruntFileName)) {
    console.log('Unable to locate Gruntfile.js in current directory');
    process.exit(1);
}

const gruntFile = require(gruntFileName);

gruntFile(grunt);

// Initialize task system so that the tasks can be listed.
grunt.task.init([], {help: true});
let longestTaskName = 20;

// Build object of tasks by info (where they were loaded from).
_(grunt.task._tasks)
    .keys()
    .forEach(name => {
        if (name.length > longestTaskName) {
            longestTaskName = name.length;
        }
    })
    .sort()
    .map(key => grunt.task._tasks[key])
    .forEach(task => {
        let info = task.info;
        if (task.multi) {
            info += ' *';
        }

        const spaceLength = longestTaskName + 1 - task.name.length;

        console.log(`${task.name}${' '.repeat(spaceLength)} -    ${info}`);
    });

process.exit();