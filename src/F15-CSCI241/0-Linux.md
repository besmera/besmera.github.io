% Linux Primer
% Dr. Andrew Besmer

# Linux Primer

## Terminal

* The terminal makes it easy to understand what the current directory is, who you are, and what computer you are using
* `~` represents the current users home directory

```bash
user@host:~$ 
 
```


## Terminal

* Who is the current user?
* What machine are the commands being executed on?
* What directory is the terminal currently working in?

```terminal
ACC.besmera2@abernathy:~/public_html$
  
```

## Listing Files

* To list files use the `ls` command
	* Depending on a number of factors the results may be color coded
	* Can accept many arguments for example `-a` for all files or `-l` for longer format

```terminal
ACC.besmera2@abernathy:~$ ls
Documents  examples.desktop  Pictures  Templates
Desktop    Downloads         Music     Public
Videos
ACC.besmera2@abernathy:~$ 
```

## Changing Directories

* To change the directory you are in use the `cd` command and pass either an absolute or a relative directory
	* At anytime type `cd` without passing anything to return to `~`
	* Use `cd ..` to go to the directly directly above the current

```terminal
ACC.besmera2@abernathy:~$ ls
Documents  examples.desktop  Pictures  Templates
Desktop    Downloads         Music     Public
Videos
ACC.besmera2@abernathy:~$ cd Desktop/
ACC.besmera2@abernathy:~/Desktop$ ls
CSCI241.pdf
CSCI242.pdf
ACC.besmera2@abernathy:~/Desktop$ 
```


Hint

:	Make liberal use of the `Tab` key to autocomplete segments


## Where Am I?

* To get the current full path use the `pwd` command

```terminal
ACC.besmera2@abernathy:~/Desktop$ pwd
/home/ACC.besmera2/Desktop
ACC.besmera2@abernathy:~/Desktop$ 
```

## Editing a File

* A very basic and easy to use text editor is `nano`
	* The `^` charachter means use the `Ctrl` key


```terminal
ACC.besmera2@abernathy:~/Desktop$ nano somefile.txt
```

```terminal
  GNU nano 2.2.6             File: somefile.txt










                                  [ New File ]
^G Get Help  ^O WriteOut  ^R Read File ^Y Prev Page ^K Cut Text  ^C Cur Pos
^X Exit      ^J Justify   ^W Where Is  ^V Next Page ^U UnCut Text^T To Spell
```


## Copying/Moving

* To copy a file use `cp`
* To move a file use `mv`
	* Both require passing a source and destination

```terminal
ACC.besmera2@abernathy:~/Desktop$ ls
somefile.txt
ACC.besmera2@abernathy:~/Desktop$ cp somefile.txt somecopy.txt
ACC.besmera2@abernathy:~/Desktop$ ls
somecopy.txt  somefile.txt
ACC.besmera2@abernathy:~/Desktop$ mv somefile.txt somenewfile.txt
ACC.besmera2@abernathy:~/Desktop$ ls
somecopy.txt  somenewfile.txt
ACC.besmera2@abernathy:~/Desktop$
```

## Deleting Files

* To delete a file use the `rm` command passing the file(s) to be removed
	* Be very careful, there is no recycle bin
	* Only forensic tools *may* be able to recover files

```terminal
ACC.besmera2@abernathy:~/Desktop$ ls
somecopy.txt  somenewfile.txt
ACC.besmera2@abernathy:~/Desktop$ rm somecopy.txt 
ACC.besmera2@abernathy:~/Desktop$ ls
somenewfile.txt
ACC.besmera2@abernathy:~/Desktop$ 
```

## Making Directories

* To make a directory use `mkdir` passing the directory name

```terminal
ACC.besmera2@abernathy:~/Desktop$ mkdir testDirectory
ACC.besmera2@abernathy:~/Desktop$ ls
testDirectory
ACC.besmera2@abernathy:~/Desktop$ 
```


## Deleting Directories

* To delete a directory use the `rm` command and use the argument `-r`
	* The argument means recursively remove
	* Many people will pass an argument of `-f` for force, ***beware***

```terminal
ACC.besmera2@abernathy:~/Desktop$ ls
testDirectory
ACC.besmera2@abernathy:~/Desktop$ rm -r testDirectory/
ACC.besmera2@abernathy:~/Desktop$ ls
ACC.besmera2@abernathy:~/Desktop$ 
```

## Shortcut Keys

* Use keyboard shortcuts to enhance your experience
	* `Ctrl + A` - Similar to Home key
	* `Ctrl + E` - Similar to End key
	* `Ctrl + L` - Clear the screen `clear` command as well
	* `Ctrl + C` - Kill current proccess
	* `Ctrl + D` - End of File (`eof`)
	* `Tab` - Autocomplete files and folders

## Outputting Files

* `cat` concatenates files and prints them to standard out

```terminal
ACC.besmera2@abernathy:~$ cat hello.txt 
This is the contents of the hello file!
ACC.besmera2@abernathy:~$ 
```

## Getting Help

* Get help on virtually any command using `man` passing the command you want help with
	* Example - `man rm`

```terminal
RM(1)                            User Commands                           RM(1)

NAME
       rm - remove files or directories

SYNOPSIS
       rm [OPTION]... FILE...

DESCRIPTION
       This  manual  page  documents  the  GNU version of rm.  rm removes each
       specified file.  By default, it does not remove directories.

       If the -I or --interactive=once option is given,  and  there  are  more

 Manual page rm(1) line 1 (press h for help or q to quit)
```


