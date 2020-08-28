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
acc.besmera2@hopper:~/permissionExample$ ls -l
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
2. Use an IDE that supports SFTP or upload files you edit with your IDE manually with [FileZilla](https://filezilla-project.org/download.php?type=client)

* Note: You need to setup [2FA](https://github.com/WinthropUniversity/ComputingHandbook/blob/master/servers/hopper.md#two-factor-authentication-2fa)



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

## IDE Setup

* There are many IDEs we could use
	* PHPStorm
	* Eclipse
	* NetBeans
	* Aptana
	* etc...
* I have become partial to [VS Code](https://code.visualstudio.com/)
* You are encouraged to try your own

# MySQL
 
## MySQL

* Relational DBMS
* Server based
* Supports multiple users
* Fast, efficent, robuts

## MySQL Setup

* If using deltona you can use the campus [MySQL server](https://deltona.birdnest.org/mysql/)
* If not you can setup your own
	* [Windows WAMP](https://bitnami.com/stack/wamp/installer)
	* [Mac MAMP](https://www.mamp.info/)
	* [Linux LAMP](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-20-04)


