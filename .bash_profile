[ -s ~/.nvm/nvm.sh ] && source ~/.nvm/nvm.sh

##################Add git prompt and collors###########
source /Applications/Xcode.app/Contents/Developer/usr/share/git-core/git-completion.bash
source /Applications/Xcode.app/Contents/Developer/usr/share/git-core/git-prompt.sh

GIT_PS1_SHOWDIRTYSTATE=true

export PS1='\[\033[0;32m\]\u\[\033[0m\]@ \[\033[1;96m\]\w\[\033[0m\]$(__git_ps1 " (\[\033[4;31m\]%s\[\033[0m\])")$ '


export CLICOLOR='true'
export LSCOLORS="gxfxcxdxbxCgCdabagacad"
######################################################

#################### Make FZF work with AG############
export FZF_DEFAULT_COMMAND='ag -g ""'
#####################################################

function fz() {
	local fzf_flags editor ag_flags ag_path ag_pattern file_search fzcmd rawfilename filename rawlinenumber linenumber
	fzf_flags='--ansi'
	editor='code -g'
	ag_flags='--color'
	ag_path=''
	ag_pattern='.'
	file_search=false

	for var in "$@"
	do
		case $var in
			"-h" ) 
				ag_flags="--hidden $ag_flags" 
			;;
			"-g" )
				ag_path="~/"
			;;
			"-webstorm"|"-ws" )
				editor="webstorm"
			;;
			"-f" )
				file_search=true
			;;
			* )
				if [[ $var != "-"* ]] && [[ $var != "" ]]
				then 
					ag_pattern="\"$var\""
				fi
			;;  
		esac
	done

	if [[ $ag_pattern != "." ]] && [[ "$file_search" != true ]]
	then 
		ag_flags="$ag_flags --nogroup"
	else
		ag_flags="$ag_flags -g"
	fi

	# fzcmd="ag $ag_flags $ag_pattern $ag_path | fzf $fzf_flags --preview 'echo {} | perl -pe \"s|(.*?):.*|\1|\" | xargs rougify' --preview-window 'up:10'"
	fzcmd="ag $ag_flags $ag_pattern $ag_path | fzf $fzf_flags --reverse --preview 'hpreview {}' --preview-window 'up:50%' --bind 'ctrl-e:execute:(hless {})'"

	rawfilename=`eval $fzcmd`

	filename=${rawfilename%%:*}
	rawlinenumber=${rawfilename#*:}
	linenumber=${rawlinenumber%%:*}

	if [[ -f $filename ]] 
	then 
		if [[ $filename == $linenumber ]]
		then
			eval "$editor $filename" 
		else
			eval "$editor $filename:$linenumber"
		fi
	fi
}

function npmr() {
	local script

	script=`ls-scripts | sed '1,2 d; /---/,1 d; /^$/ d' | fzf --border --height 40% --reverse`
	if [[ "$script" != "" ]]
	then
		script=${script%% *}
		eval "npm run $script"
	fi
}

function gruntr() {
	local script

	script=`ls-grunt | sed '/^$/,$ d' | fzf --border --height 40% --reverse`
	if [[ "$script" != "" ]]
	then
		script=${script%% *}
		eval "npm run $script"
	fi
}

function chromehistory () {
  local cols sep
  cols=$(( COLUMNS / 3 ))
  sep='{::}'

  cp -f ~/Library/Application\ Support/Google/Chrome/Profile\ 2/History /tmp/h

  sqlite3 -separator $sep /tmp/h \
    "select substr(title, 1, $cols), url
     from urls order by last_visit_time desc" |
  awk -F $sep '{printf "%-'$cols's  \x1b[36m%s\x1b[m\n", $1, $2}' |
  fzf --ansi --multi --preview 'echo {}' --preview-window 'up:3:wrap' --bind 'ctrl-g:toggle-preview' | perl -pe 's|.*?(https*://.*?)|\1|' | xargs open
}

CURRENT_PROJ=""

function getBadgeName () {
	local projectName
	projectName="${PWD#*/GIT/}"
	if [ "$projectName" == "$PWD" ]
	then
		projectName="${PWD#*/git/}"
	fi

	projectName="${projectName%%/*}"

	if [ "$CURRENT_PROJ" != "$projectName" ]
	then
		CURRENT_PROJ="$projectName"
		iterm2_set_user_var project "$projectName"
	fi
}


export PROMPT_COMMAND=getBadgeName

function jb () {
	local branchName

	branchName=`git branch -l | fzf --border --height 40% --reverse`

	if [[ "$branchName" != "" ]]
	then
		eval "git checkout $branchName"
	fi
}

function jfzf () {
	local dir
	dir=`j -s | egrep '^\d+.\d+:\s+/' | tail -r | fzf --border --height 40% --reverse`
	if [[ -n dir ]]
	then
			cd $(echo $dir | sed -E 's#[^/]*(/.*$)#''\1''#')
	fi
}

function cheatsheet () {
	local cmd rawCmd cmdList

	rawCmd=""
	cmdList="bashbuild: recompile bash"
	cmdList="$cmdList\nbh: show commands history"
	cmdList="$cmdList\nchromehistory: search in chrome history"
	cmdList="$cmdList\nfz: perform fuzzy find on files (-g for global -h to include hidden files, -ws / -webstorm to open in webstorm)"
	cmdList="$cmdList\ngfa: git fetch --all"
	cmdList="$cmdList\ngpr: git pull --rebase"
	cmdList="$cmdList\ngruntr: list available grunt tasks"
	cmdList="$cmdList\ngs: git status"
	cmdList="$cmdList\njb: jump to branch"
	cmdList="$cmdList\njf: jump to recent folders"
	cmdList="$cmdList\nll: ls -l"
	cmdList="$cmdList\nlla: ls -l -al"
	cmdList="$cmdList\nnpmprivate: switch to npm private"
	cmdList="$cmdList\nnpmpublic: switch to npm private"
	cmdList="$cmdList\nnpmr: list available npm scripts"
	
	rawCmd=`printf "$cmdList" | fzf --border --height 60% --reverse`

	if [[ $rawCmd != "" ]]
	then
		cmd=${rawCmd%%:*}
		eval "$cmd"
	fi
}

function bh () {
	local cmd
	cmd=`cat ~/.bash_history | fzf --border --height 60% --reverse`

	if [ "$cmd" != "" ]; then
		eval "$cmd"
	fi
}

alias jf=jfzf

############ Add aliases for git ###################
alias gs='git status'
alias gpr='git pull --rebase'
alias gfa='git fetch --all'
####################################################

alias ll='ls -l'
alias lla='ls -al'
alias ls='ls -GF1'
alias grep='grep --color=auto'
alias npmprivate='npm config set registry http://npm.dev.wixpress.com'
alias npmpublic='npm config set registry https://registry.npmjs.org/'

alias bashbuild='source ~/.bash_profile'

npmprivate

#Fix ssh issues in sierra, where keys are lost
ssh-add -K
###############################################
#Add cargo to path
source /Users/maory/.cargo/env
##############################################
#Enable the j functionallity 
source /usr/local/opt/autojump/share/autojump/autojump.bash
##############################################
test -e "${HOME}/.iterm2_shell_integration.bash" && source "${HOME}/.iterm2_shell_integration.bash"
