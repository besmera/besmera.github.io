% Local Dev Environment
% Dr. Andrew Besmer

# Local Dev Environment

## Overview

* Methods for working with websites
	* Deltona and working remotely
	* Built in PHP server


# Deltona and Connecting Remotely

## Running off Deltona

* Your site address
	* http://deltona.birdnest.org/~acc.youruser/
	* Linked to your `~/public_html` folder
		* Putting a file in this folder makes it accessible online[^permission]
* Web server is Apache
	* PHP 7.0
	* Mail extensions installed

[^permission]: Assumes web server has appropriate permission


## Review

* How do you?
	* Make directory?
	* Change directory?
	* Reference your home directory?
	* Edit a file?
	* Remove a file?

## New Commands

* Who are you?
* Changing permissions

## Permissions Problem

* What is your username?

```bash
whoami
```

* If you asked Apache it would say

```bash
www-data@deltona.birdnest.org:~$ whoami
www-data
```

* What problem might this create?

## Interpretting Permissions

```bash
ACC.besmera2@abernathy:~/permissionExample$ ls -l
total 0
-rwxrw-r-x 1 ACC.besmera2 ACC.domain^users 0 Sep 10 00:00 file1.txt
-rwxr-xr-- 1 ACC.besmera2 ACC.domain^users 0 Sep 10 00:00 file2.txt
-rwxrwxrwx 1 ACC.besmera2 ACC.domain^users 0 Sep 10 00:01 file3.txt
```

\ 

* Conversion to and from
	* rwxrw-r-x => 765
	* rwxr-xr-- =>754
	* rwxrwxrwx => 777

## Choosing Permissions

* What access do you need?
* What access does your group need?
* What access does anyone else need?

\ 

> * Friends don't let friends use 777!
	* Without good cause anyway.

## Changing Permissions

Set a file to read, write, execute for owner, and nothing for everyone else

```bash
chmod 700 theFileName
```

Set a folder and all its files to read, write, execute for owner, and nothing for everyone else

```bash
chmod -R 700 theFolderName
```

## Setup your public_html

1. Create ~/public_html if it does not exist
2. Change the permissions for it
	1. You get everything
	2. Group gets read + execute
	3. Other gets read + execute
3. Create a file `~/public_html/phpinfo.php`
4. Content should be `<?php phpinfo();`
5. Fix permissions for this file - see above
6. Access this file on deltona.birdnest.org

## Working Remotely 

1. Use SSH and edit files on the terminal
	1. Windows use *Putty*
		* *Host:* `hopper.winthrop.edu`
		* *Protocol:* `SSH`
	2. Linux and mac use terminal and `ssh youruser@hopper.winthrop.edu`
2. Use an IDE that supports SFTP for example Aptana


## Aptana Setup

* To be able to edit files we will configure Aptana to work with campus servers

1. Open the Remote View `Window` > `Show View` > `Remote`
2. Click on the ***Globe with the + sign***.
	* If you hover it will say ***Add New FTP Site...***
	* Don't worry about connection name it won't be saved
3. Change the protocol to `SFTP`

## Aptana Setup

4. For server use `hopper.winthrop.edu`
5. For username use your username
6. For password use your password
7. Change remote path by typing `/home/acc.yourusername/public_html`
	* Capitalization is important
	* You ***can not*** use browse, it will not work
8. Edit files as neccessary and view them on deltona.birdnest.org
9. Remember that all git commands still need to be run through terminal

# Built in PHP Server

## Built in PHP Server

* Newer versions of PHP have a built in web server
	* To run this server open the terminal
	* Navigate to the root directory that should be served 
		* e.g. `~/public_html/csci241/`
	* Run the webserver
		* `php -S localhost:8080`
		* Listens for connections to localhost on port 8080
	* NOTE: While you can start this server from off campus you will not be able to access it, you must go through deltona.birdnest.org
	* NOTE 2: NOTE: is not strictly true but getting it working is non trivial and depends on a number of factors

## NetBeans Setup

* There are many IDEs we could use
	* PHPStorm
	* Eclipse
	* NetBeans
	* Aptana
	* etc...
* We will use NetBeans
* You are encouraged to try your own

## NetBeans Setup

* Open the NetBeans Application
* Setup a new PHP Application Project from existing sources
	* `File` > `New Project...`
	* Select `PHP` under *Categories* and `PHP Appliction with Existing Sources`
	* Click `Next`
	* Browse to select your git repository which should be located under `public_html` 
	* Click `Next`

## NetBeans Setup

* Under *Run Configuration* change the *Run As* to `PHP Built-in Web Server`
* Leave the *Hostname*, *Port*, and *Router Script* as is
* Click `Finish`

\ 

* Move to your *master* branch in git
* Edit the `.gitignore` file and change `/nbproject/private/` to `/nbproject/*`
* Add and commit that change in git

## NetBeans Setup

* Now you can code in NetBeans and hit the run button to run your project
* Remember that git commands will still be through the terminal


