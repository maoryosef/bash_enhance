const grunt = require('grunt');
const _ = require('lodash');
const fs = require('fs');

const gruntFileName = `${process.cwd()}/Gruntfile.js`;

if (!fs.existsSync(gruntFileName)) {
    console.error('Unable to locate Gruntfile.js in current directory');
    process.exit(1);    
}

const registeredTasks = [];
grunt.registerTask = t => {
    registeredTasks.push(t);
};

const gruntFile = require(gruntFileName);

gruntFile(grunt);

_(registeredTasks)
    .uniq()
    .sort()
    .forEach(task => {
        console.log(task);
    });

process.exit();