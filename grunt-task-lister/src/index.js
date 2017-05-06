const grunt = require('grunt');
const _ = require('lodash');

const registeredTasks = [];
grunt.registerTask = t => {
    registeredTasks.push(t);
};

const gruntFile = require(`${process.cwd()}/Gruntfile.js`);

gruntFile(grunt);

_(registeredTasks)
    .uniq()
    .sort()
    .forEach(task => {
        console.log(task);
    });

process.exit();