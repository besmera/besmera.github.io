% Forms
% Dr. Andrew Besmer

# Forms 

## Forms [^SlidesSource]

[^SlidesSource]: Slides are roughly based on CC licensed slides by Pamela Fox at Kahn Academy

* [We use forms all the time](http://www.winthrop.edu/sitefeedback/default.aspx?ekfrm=17422)
* [GoDaddy and others write server side code for you](https://support.godaddy.com/help/article/8376/using-our-php-form-mailers-on-web-classic-hosting)

	* User sends data to server
	* Server processes data
		* Mail
		* DB
	* Server sends data to user

## Forms

<form action="http://imagine-it.org/processform.php" method="GET">
  <label>First: <input type="text" name="first"></label><br>
  <label>Last: <input type="text" name="last"></label><br>
  <button type="submit">Submit</button>
</form>



## Sending Data

* Lets fill out this form using the following pieces of data
	* Andrew
	* 4825
	* besmera
	* Thurmond 304

\ 

<label><input type="text" name="first"></label><br>
<label><input type="text" name="username"></label><br>
<label><input type="text" name="room"></label><br>
<label><input type="text" name="extension"></label><br>


## Sending Data

* Lets fill out this form using the following pieces of data
	* Andrew
	* 4825
	* besmera
	* Thurmond 304

\ 

<label>Name: <input type="text" name="first"></label><br>
<label>Username: <input type="text" name="username"></label><br>
<label>Room: <input type="text" name="room"></label><br>
<label>Ext: <input type="text" name="extension"></label><br>

## Name Value Pairs

* camelCaseIsUsedForMultipleWords
* itshardertoreadtextlikethis

## Query String

* Starts with `?`
* Uses name value pairs seperated by `=`
* More than one seperated by `&`

```html
?first=Andrew&last=Besmer
```

## Try it

* [http://imagine-it.org/processform.php](http://imagine-it.org/processform.php)


## Form Structure

* Forms use the `form` tag and require two attributes
	* `action` - Where the data will be sent
	* `method` - How the data will be sent

```html
<form action="http://imagine-it.org/processform.php" method="GET">

</form>
```


## Form Methods

* GET 
	* Visible in url
	* Saved in browser history
	* Has size limits

* POST
	* Sent as part of message body
	* Not stored in browser history
	* No practical size limits


## GET Form

<form action="http://imagine-it.org/processform.php" method="GET">
  <label>First: <input type="text" name="first"></label><br>
  <label>Last: <input type="text" name="last"></label><br>
  <button type="submit">Submit</button>
</form>

```html
<form action="http://imagine-it.org/processform.php" method="GET">
  <label>First: <input type="text" name="first"></label><br>
  <label>Last: <input type="text" name="last"></label><br>
  <button type="submit">Submit</button>
</form>
```

## POST Form

<form action="http://imagine-it.org/processform.php" method="POST">
  <label>First: <input type="text" name="first"></label><br>
  <label>Last: <input type="text" name="last"></label><br>
  <button type="submit">Submit</button>
</form>

```html
<form action="http://imagine-it.org/processform.php" method="POST">
  <label>First: <input type="text" name="first"></label><br>
  <label>Last: <input type="text" name="last"></label><br>
  <button type="submit">Submit</button>
</form>
```

# Elements

## Text Input

<input type="text" name="firstName">

```html
<input type="text" name="firstName">
```


## Button

<button type="submit">Submit</button>
<button type="reset">Reset</button>

```html
<button type="submit">Submit</button>
<button type="reset">Reset</button>
```

## Labels

<label> First Name:
<input type="text" name="firstName">
</label>

\ 
or
\ 

<label for="firstName"> First Name: </label>
<input type="text" name="firstName" id="firstName">

```html
<label> First Name:
<input type="text" name="firstName">
</label>

<label for="firstName"> First Name: </label>
<input type="text" name="firstName" id="firstName">
```

## Try it

Morse code!

## Checkboxes

* Warning: Only transmitted if checked!

\ 

Status:<br>
<input type="checkbox" name="student" id="student">
<label for="student">Student</label><br>
<input type="checkbox" name="faculty" id="faculty">
<label for="cheese">Faculty</label>

```html
Status:<br>
<input type="checkbox" name="student" id="student">
<label for="student">Student</label><br>
<input type="checkbox" name="faculty" id="faculty">
<label for="cheese">Faculty</label>
```

## Radios

<label for="freshman">Freshman</label>
<input type="radio" name="classStanding" id="freshman" value="freshman">
<label for="sophmore">Sophmore</label>
<input type="radio" name="classStanding" id="sophmore" value="sophmore">


```html
<label for="freshman">Freshman</label>
<input type="radio" name="classStanding" id="freshman" value="freshman">
<label for="sophmore">Sophmore</label>
<input type="radio" name="classStanding" id="sophmore" value="sophmore">
```


## Field Set

<fieldset>
	<legend>Class Standing:</legend>
	<label for="freshman">Freshman</label>
	<input type="radio" name="classStanding" id="freshman" value="freshman">
	<label for="sophmore">Sophmore</label>
	<input type="radio" name="classStanding" id="sophmore" value="sophmore">
</fieldset>

```html
<fieldset>
	<legend>Class Standing:</legend>
	<label for="freshman">Freshman</label>
	<input type="radio" name="classStanding" id="freshman" value="freshman">
	<label for="sophmore">Sophmore</label>
	<input type="radio" name="classStanding" id="sophmore" value="sophmore">
</fieldset>
```

## Selects

<label for="state">State:</label>
<select name="state" id="state">
  <option value="NC">NC</option>
  <option value="SC">SC</option>
</select>

```html
<label for="state">State:</label>
<select name="state" id="state">
  <option value="NC">North Carolina</option>
  <option value="SC">South Carolina</option>
</select>
```

## Textarea

<label>Student Notes: <br>
<textarea name="notes"></textarea>
</label>

```html
<label>Student Notes: <br>
<textarea name="notes"></textarea>
</label>
```
