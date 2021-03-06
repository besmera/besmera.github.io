% Local Dev Environment
% Dr. Andrew Besmer

# Local Dev Environment

## Overview

* Your site address
	* http://deltona.birdnest.org/~acc.YOURUSER/
	* Linked to your `~/public_html` folder
		* Putting a file in this folder makes it accessible online[^permission]
* Web server is Apache
	* PHP 5.3
	* Mail extensions installed

[^permission]: Assumes web server has appropriate permission


# Command Line

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


# IDE

## Aptana

* There are many IDEs we could use
	* PHPStorm
	* Eclipse
	* Netbeans
	* etc...
* Aptana is what we will use
	* We may be using notepad++ because Aptana is currently unable to run on some labs
* You are encouraged to try your own

## Aptana Setup

* To be able to edit files we will configure Aptana to work with campus servers
* Here at Winthrop Profiles are not saved when computer restarts so this will be done each time you work with Aptana

1. Open the Remote View `Window` > `Show View` > `Remote`
2. Click on the ***Globe with the + sign***.
	* If you hover it will say ***Add New FTP Site...***
	* Don't worry about connection name it won't be saved
3. Change the protocol to `SFTP`

## Aptana Setup

4. For server choose one of the campus linux servers:
	* `aspen.winthrop.edu`
	* `abernathy.winthrop.edu`
	* `houston.winthrop.edu`
	* From home: `reno.winthrop.edu`
5. For username use `acc.yourusername`
6. For password use your password
7. Change remote path by typing `/home/ACC.yourusername/public_html`
	* Capitalization is important
	* You ***can not*** use browse, it will not work
8. Try to change the `phpinfo.php` file you created earlier

## Notepad++


* To be able to edit files we will configure Notepad++ to work with campus servers
* Here at Winthrop Profiles are not saved when computer restarts so this will be done each time you work with Notepad++

1. Show the NppFTP Window `Plugins` > `NppFTP` > Check `Show NppFTP Window`
2. Click the gear icon and open `Profile settings`
3. Click `Add new`
4. Give the profile some name, for example `winthrop server`

## Notepad++

5. In hostname choose one of the campus linux servers:
	* `aspen.winthrop.edu`
	* `abernathy.winthrop.edu`
	* `houston.winthrop.edu`
	* From home: `reno.winthrop.edu`
6. Change the connection type to `SFTP`
7. For username use `acc.yourusername`
8. For password use your password
9. Change the inital remote directpry by typing `/home/ACC.yourusername/public_html`
	* Capitalization is important

## Notepad++

10. Click `Close`
11. Click the plug icon and select the server you just configured
12. If prompted indicate you trust the server
13. Try to change the `phpinfo.php` file you created earlier
