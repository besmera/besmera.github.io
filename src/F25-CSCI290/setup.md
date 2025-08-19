% Setup Environment
% Dr. Andrew Besmer
	
# Campus Labs

## Campus Lab Machines

* Campus lab machines already have the software you need
	* Terminal, VS Code, Node.js LTS, etc...
* You can access these remotely using SSH and NoMachine
	* You will need to have configured 2FA

```
ssh yourusername@hopper.winthrop.edu
```

## Campus Lab Machines

* You may find setting up your own development enviornment to be more rewarding

# Your Ubuntu Linux

## Node.js using apt
 
* Apt is a package manager for installing applications and their dependencies
* Use the terminal as a root user to execute the following
* Be sure to use the LTS currently `v22`

```
curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Download VS Code

* [Visual Studio Code](https://code.visualstudio.com/)

## Download git

* Git can be found in the package repositories

```
sudo apt-get install git
```

* You may find a [GUI](https://git-scm.com/downloads/guis) helpful though I don't use one

# Your Windows

## Download Node.js

* You can find the installation files at [nodejs.org](https://nodejs.org/en/download/)
* Be sure to use the LTS currently `v22`

## Download git

* Git can be found on the [git website](https://git-scm.com/download/win)
* You may find a [GUI](https://git-scm.com/downloads/guis) helpful though I don't use one

## Download VS Code

* [Visual Studio Code](https://code.visualstudio.com/)

# Your macOS

## Download Node.js

* You can find the installation files at [nodejs.org](https://nodejs.org/en/download/)
* Be sure to use the LTS currently `v22`

## Download VS Code

* [Visual Studio Code](https://code.visualstudio.com/)

## Download git

* Git can be installed with brew

```
brew install git
```

* Alternatively you could use a [stand alone installer](https://sourceforge.net/projects/git-osx-installer/)
* You may find a [GUI](https://git-scm.com/downloads/guis) helpful though I don't use one

