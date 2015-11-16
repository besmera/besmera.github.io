% File Uploads
% Dr. Andrew Besmer

# File Uploads

## File Uploads

* Commonly need to upload files
* Files can be uploaded by using `input` tag with a `type` attribute set to `file`

```php
<input type="file" name="yourUpload">
```

## Form

* Additionally, form `enctype` needs to be set
* Recall
	* `application/x-www-form-urlencoded`
	* `multipart/form-data`
* Which do we want? Why?
* Method?

## Receving the file

* Files are put into the super global `$_FILES`

```php
array(1) { 
["yourUpload"]=> array(5) {
	[name] => 400.png
	[type] => image/png
	[tmp_name] => /tmp/php5Wx0aJ
	[error] => 0
	[size] => 15726
	}
}
```

## Receving the file

* Check to make sure the file is set
* May not be set for a number of reasons
	* Exceeded Limits
	* Using Mobile Device
	* Etc...

## Check for Errors

* `UPLOAD_ERR_OK` or `0` - No errors present
* `UPLOAD_ERR_INI_SIZE` or `1` - File size is greater than `upload_max_filesize` in php.ini
* `UPLOAD_ERR_FORM_SIZE` or `2` -  File size is greater than  `MAX_FILE_SIZE` in the HTML form; don't trust this!
* `UPLOAD_ERR_PARTIAL` or `3` - File was only partially uploaded

## Check for Errors

* `UPLOAD_ERR_NO_FILE` or `4` - No file was uploaded
* `UPLOAD_ERR_NO_TMP_DIR` or `6` - Missing a temp directory to hold files while processing
* `UPLOAD_ERR_CANT_WRITE` or `7` - Permission error writing to temp
* `UPLOAD_ERR_EXTENSION` or `8` - A PHP extension stopped the file upload

## Dealing with File Type

* File type is important for 
	* Acceptance
		* Which [media/MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) will you accept?
	* Nameing
		* `.png`, `.jpg`, `.pdf`
													
## Dealing with File Type

* Don't trust `$_FILES["yourUpload"]["type"]`
	* Can be faked, problem?

```php
array(1) { 
["yourUpload"]=> array(5) {
	[name] => bad.php
	[type] => image/png
	[tmp_name] => /tmp/php5Wx0aJ
	[error] => 0
	[size] => 15726
	}
}
```



## Dealing with File Type

* Use `finfo`

```php
$finfo = new finfo(FILEINFO_MIME_TYPE);
$fileType = $finfo->file($_FILES['yourUpload']['tmp_name']);
```

* Now map the type to it's extension
	* Don't trust the user

## Picking a file name

* You may wish to disallow users to name their files for a number of reasons
	* Everyone tries to upload `submission.pdf`
	* Filename shouldn't be predictable
	* Potentially detect duplicates
	* ...


* There are many ways to choose a new filename
	* Counter (`1.png`, `2.png`, `3.png`)
	* Random (`b3088d04a5c6aba7.png`)
	* Hashing (`c553822654e4a60440e36f1a51a20edc.png`)

## Picking a file name

* Can easily hash file using `md5_file($filename)`
* Can come up with random file names

```
bin2hex(openssl_random_pseudo_bytes(8));  //16 chars
```




## Storage

* Where to store
	* Outside web root (preferred if possible)
	* Inside web root
* Can easily check if the filename exists `file_exists($filename)`
* Actually store file
	* `move_uploaded_file($temp, $path)`
* Temp file auto deleted at end of HTTP request if not moved


## Progress

* Problems surrounding showing progress

## Other Considerations

* PHP Max Execution Time
* PHP Max Post Size

\ 

* You may get no errors just an empty `$_FILES`

\ 

* Files can be deleted using `unlink($filename)`



