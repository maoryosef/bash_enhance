# Enhanced bash for OSX
## Required tools for all to work
* [Rougify](https://github.com/jneen/rouge) - ruby based syntax highlighter (```gem install rouge```)
* [Silver searcher](https://github.com/ggreer/the_silver_searcher) - Advnaced in files searcher (```brew install ag```)
* [Fuzz finder](https://github.com/junegunn/fzf) - Command line fuzzy finder (```brew install fz```)
* [Auto jump](https://github.com/wting/autojump) - Smarted directory changer (```brew install autojump```)
* [LS Scripts](https://www.npmjs.com/package/npm-ls-scripts) - List available npm scripts (```npm i -g npm-ls-scripts```)
* hless - wrapper to show files with highlited syntax in less (cd into hless run ```npm i -g .```)
* Grunt task lister - list grunt tasks (cd into grunt-task-lister run ```npm i -g .```)

##### Need to link .bash_profile to user's bash_profile
```bash
ln .bash_profile ~/.bash_profile
```

### Available commands:
* ```bashbuild```: recompile bash
* ```bh```: show commands history
* ```cheatsheet```: list available commands
* ```chromehistory```: search in chrome history
* ```fz```: perform fuzzy find on files (-g for global -h to include hidden files, -ws / -webstorm to open in webstorm)
* ```gfa```: git fetch --all
* ```gpr```: git pull --rebase
* ```gs```: git status
* ```jb```: jump to branch (GIT)
* ```jf```: jump to recent folders
* ```ll```: Alias to ls -l
* ```lla```: Alias to ls -l -al
* ```npmr```: list available npm scripts in root
* ```gruntr```: list available grunt tasks in root
